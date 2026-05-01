export default {
  async fetch(request, env, ctx) {
    return new Response("JPV Worker Live", {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store"
      }
    });
  }
};
