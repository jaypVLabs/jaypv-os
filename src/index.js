export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    const CANVA_URL = "https://jaypventuresllc.com";

    if (url.pathname === "/health" || url.pathname === "/health.json") {
      return Response.json({
        ok: true,
        service: "jaypventuresllc-com",
        frontend: "canva",
        frontend_url: CANVA_URL,
        backend: "cloudflare-worker",
        stripe: Boolean(env.CHECKOUT_BASE_URL)
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

      const checkoutUrl = new URL(env.CHECKOUT_BASE_URL);
      checkoutUrl.searchParams.set("plan", plan);

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
  }
}
