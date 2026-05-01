export default {
  async fetch(request, env, ctx) {
    return new Response("JPV Worker Live", { status: 200 });
  }
}
