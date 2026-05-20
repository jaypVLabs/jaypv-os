export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);

      const CANVA_URL = "https://jaypventuresllc.com";

      if (url.pathname === "/health" || url.pathname === "/health.json") {
        return Response.json({
          ok: true,
          service: "jaypventuresllc-com",
          frontend: "canva",
          frontend_url: CANVA_URL,
          backend: "cloudflare-worker",
          stripe_secret_present: Boolean(env.CHECKOUT_BASE_URL)
        });
      }

      if (url.pathname.startsWith("/checkout")) {
        const plan = url.searchParams.get("plan") || "member";

        if (!env.CHECKOUT_BASE_URL) {
          return Response.json({
            ok: false,
            error: "CHECKOUT_BASE_URL secret is missing"
          }, { status: 500 });
        }

        if (!env.CHECKOUT_BASE_URL.startsWith("https://")) {
          return Response.json({
            ok: false,
            error: "CHECKOUT_BASE_URL must be a full https:// URL"
          }, { status: 500 });
        }

        const checkoutUrl = new URL(env.CHECKOUT_BASE_URL);
        checkoutUrl.searchParams.set("client_reference_id", plan);
        checkoutUrl.searchParams.set("prefilled_promo_code", "");

        return Response.redirect(checkoutUrl.toString(), 302);
      }

      if (url.pathname.startsWith("/api/")) {
        return Response.json({
          ok: false,
          error: "API route not implemented",
          path: url.pathname
        }, { status: 404 });
      }

      return Response.redirect(CANVA_URL, 302);
    } catch (err) {
      return Response.json({
        ok: false,
        error: "Worker runtime exception",
        message: err && err.message ? err.message : String(err)
      }, { status: 500 });
    }
  }
}
