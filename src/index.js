export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Backend health check
    if (url.pathname === "/health" || url.pathname === "/health.json") {
      return Response.json({
        ok: true,
        service: "jaypventuresllc-com",
        frontend: "canva",
        backend: "cloudflare-worker",
        stripe: "enabled"
      });
    }

    // Stripe checkout routes stay on Worker
    if (url.pathname.startsWith("/checkout")) {
      const plan = url.searchParams.get("plan") || "member";

      return Response.redirect(
        ${env.CHECKOUT_BASE_URL}?plan=,
        302
      );
    }

    // API routes stay on Worker
    if (url.pathname.startsWith("/api/")) {
      return Response.json({
        ok: false,
        error: "API route not implemented in this Worker file yet",
        path: url.pathname
      }, { status: 404 });
    }

    // Everything else goes to the real Canva website
    return Response.redirect("jaypventuresllc.com", 302);
  }
}
