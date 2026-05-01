export default {
  async fetch(request, env, ctx) {
    return new Response("Hello from JayPVentures API!", { status: 200 });
  }
}
