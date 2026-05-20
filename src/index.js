const CANVA_URL = "https://jaypventuresllc.com";

const PLANS = {
  member:     { mode: "subscription", priceEnv: "STRIPE_PRICE_MEMBER" },
  vip:        { mode: "subscription", priceEnv: "STRIPE_PRICE_VIP" },
  creator:    { mode: "subscription", priceEnv: "STRIPE_PRICE_CREATOR" },
  operator:   { mode: "subscription", priceEnv: "STRIPE_PRICE_OPERATOR" },
  enterprise: { mode: "subscription", priceEnv: "STRIPE_PRICE_ENTERPRISE" }
};

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Access-Control-Allow-Origin": CANVA_URL,
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      if (request.method === "OPTIONS") {
        return json({ ok: true });
      }

      if (url.pathname === "/health" || url.pathname === "/health.json") {
        return json({
          ok: true,
          service: "jaypventuresllc-com",
          frontend: "canva",
          frontend_url: CANVA_URL,
          backend: "cloudflare-worker",
          stripe_api: Boolean(env.STRIPE_SECRET_KEY)
        });
      }

      if (url.pathname === "/checkout") {
        const planKey = url.searchParams.get("plan") || "member";
        const plan = PLANS[planKey];

        if (!plan) {
          return json({
            ok: false,
            error: "Unknown plan",
            allowed: Object.keys(PLANS)
          }, 400);
        }

        if (!env.STRIPE_SECRET_KEY) {
          return json({ ok: false, error: "Missing STRIPE_SECRET_KEY" }, 500);
        }

        const priceId = env[plan.priceEnv];

        if (!priceId) {
          return json({ ok: false, error: `Missing ${plan.priceEnv}` }, 500);
        }

        const form = new URLSearchParams();
        form.append("mode", plan.mode);
        form.append("line_items[0][price]", priceId);
        form.append("line_items[0][quantity]", "1");
        form.append("success_url", `${CANVA_URL}/success?session_id={CHECKOUT_SESSION_ID}&plan=${encodeURIComponent(planKey)}`);
        form.append("cancel_url", `${CANVA_URL}/pricing?checkout=cancelled&plan=${encodeURIComponent(planKey)}`);
        form.append("metadata[plan]", planKey);
        form.append("client_reference_id", planKey);
        form.append("allow_promotion_codes", "true");

        const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.STRIPE_SECRET_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: form
        });

        const session = await stripeResponse.json();

        if (!stripeResponse.ok) {
          return json({
            ok: false,
            error: "Stripe Checkout Session creation failed",
            stripe: session
          }, 500);
        }

        return Response.redirect(session.url, 303);
      }

      return Response.redirect(CANVA_URL, 302);
    } catch (err) {
      return json({
        ok: false,
        error: "Worker runtime exception",
        message: err?.message || String(err)
      }, 500);
    }
  }
};
