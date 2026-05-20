const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>JayPVentures LLC</title>
  <meta name="description" content="JayPVentures LLC builds secure infrastructure, automation systems, creator access, and governed digital operations." />
  <style>
    :root {
      --black: #05070b;
      --panel: rgba(8, 12, 24, 0.72);
      --line: rgba(245, 247, 250, 0.12);
      --text: #f5f7fa;
      --muted: rgba(220, 230, 245, 0.74);
      --cyan: #00d4ff;
      --purple: #7b30ff;
      --magenta: #ff2d8a;
      --font: Inter, "Segoe UI", Arial, sans-serif;
      --display: "Space Grotesk", Inter, "Segoe UI", Arial, sans-serif;
    }

    * { box-sizing: border-box; }

    html, body {
      margin: 0;
      min-height: 100%;
      color: var(--text);
      font-family: var(--font);
      background:
        radial-gradient(circle at 16% 8%, rgba(0, 212, 255, 0.16), transparent 28%),
        radial-gradient(circle at 88% 4%, rgba(255, 45, 138, 0.12), transparent 28%),
        radial-gradient(circle at 50% 94%, rgba(123, 48, 255, 0.12), transparent 38%),
        linear-gradient(135deg, #03050a 0%, #070b18 46%, #100612 100%);
      overflow-x: hidden;
    }

    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      background:
        linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
      background-size: 72px 72px;
      mask-image: radial-gradient(circle at 50% 20%, black, transparent 72%);
      opacity: .8;
    }

    a { color: inherit; text-decoration: none; }

    .site-header {
      position: sticky;
      top: 0;
      z-index: 10;
      width: min(1440px, calc(100vw - 48px));
      min-height: 88px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 2rem;
      border-bottom: 1px solid rgba(245,247,250,.08);
      background: rgba(4, 6, 11, .72);
      backdrop-filter: blur(22px);
    }

    .brand {
      font-weight: 950;
      letter-spacing: -.04em;
      font-size: 1.25rem;
    }

    .brand span { color: var(--cyan); }

    nav {
      display: flex;
      justify-content: flex-end;
      gap: 1.35rem;
      flex-wrap: wrap;
    }

    nav a {
      color: rgba(245,247,250,.72);
      font-size: .88rem;
      font-weight: 750;
    }

    nav a.cta {
      padding: .78rem 1.1rem;
      border-radius: 13px;
      color: #fff;
      border: 1px solid rgba(0,212,255,.34);
      background: linear-gradient(135deg, rgba(0,212,255,.92), rgba(123,48,255,.76), rgba(255,45,138,.78));
    }

    .page {
      display: grid;
      gap: clamp(4rem, 8vw, 7rem);
    }

    .hero {
      min-height: calc(100vh - 90px);
      display: grid;
      place-items: center;
      padding: clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 4rem);
      background:
        radial-gradient(circle at 50% 40%, rgba(0, 212, 255, 0.20), transparent 30%),
        radial-gradient(circle at 34% 56%, rgba(123, 48, 255, 0.18), transparent 36%),
        radial-gradient(circle at 68% 56%, rgba(255, 45, 138, 0.12), transparent 36%);
    }

    .hero-frame {
      width: min(1120px, 100%);
      text-align: center;
      padding: clamp(2.2rem, 5vw, 5.25rem);
      border: 1px solid rgba(245,247,250,.11);
      border-radius: 38px;
      background:
        linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.018)),
        rgba(5,7,11,.62);
      box-shadow: 0 32px 120px rgba(0,0,0,.36), inset 0 1px 0 rgba(255,255,255,.08);
      backdrop-filter: blur(22px);
    }

    .kicker {
      margin: 0 0 1.1rem;
      color: var(--cyan);
      font-size: .75rem;
      font-weight: 900;
      letter-spacing: .22em;
      text-transform: uppercase;
    }

    h1, h2 {
      margin: 0;
      font-family: var(--display);
      color: var(--text);
      font-weight: 850;
      letter-spacing: -.065em;
      line-height: .92;
    }

    h1 { font-size: clamp(4.2rem, 10vw, 10rem); }
    h2 { font-size: clamp(2.4rem, 5vw, 5.2rem); }

    .lead, .section-intro p, .founder p, .final p {
      max-width: 760px;
      margin: 1.5rem auto 0;
      color: var(--muted);
      font-size: clamp(1.05rem, 2vw, 1.28rem);
      line-height: 1.72;
    }

    .actions {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 2rem;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 52px;
      padding: 0 1.35rem;
      border-radius: 999px;
      font-weight: 900;
      border: 1px solid rgba(245,247,250,.14);
    }

    .button.primary {
      color: #05070b;
      background: linear-gradient(135deg, #00d4ff, #f5f7fa);
      box-shadow: 0 0 42px rgba(0,212,255,.26);
    }

    .button.secondary {
      color: #f5f7fa;
      border: 1px solid rgba(245,247,250,.22);
      background: rgba(255,255,255,.055);
    }

    .section {
      width: min(1240px, calc(100vw - 40px));
      margin: 0 auto;
    }

    .section-intro {
      max-width: 900px;
      margin: 0 auto 2rem;
      text-align: center;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
    }

    .card {
      display: block;
      min-height: 220px;
      padding: clamp(1.2rem, 2vw, 1.8rem);
      border: 1px solid rgba(245,247,250,.12);
      border-radius: 28px;
      background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.025)), rgba(5,7,11,.66);
      box-shadow: 0 24px 80px rgba(0,0,0,.25);
    }

    .card span {
      display: block;
      color: var(--cyan);
      font-size: .72rem;
      font-weight: 900;
      letter-spacing: .18em;
      text-transform: uppercase;
    }

    .card strong {
      display: block;
      margin-top: .9rem;
      color: var(--text);
      font-size: clamp(1.35rem, 2vw, 1.75rem);
      line-height: 1.05;
    }

    .card p {
      margin: .8rem 0 0;
      color: rgba(220,230,245,.72);
      line-height: 1.65;
    }

    .founder {
      display: grid;
      grid-template-columns: minmax(0,.85fr) minmax(0,1.15fr);
      gap: clamp(2rem, 5vw, 5rem);
      align-items: center;
      padding: clamp(2rem, 5vw, 4rem);
      border-radius: 36px;
      border: 1px solid rgba(245,247,250,.1);
      background: radial-gradient(circle at 22% 20%, rgba(0,212,255,.13), transparent 34%), rgba(5,7,11,.48);
    }

    .founder-media {
      min-height: 420px;
      display: grid;
      place-items: center;
      border-radius: 30px;
      border: 1px solid rgba(245,247,250,.12);
      background: radial-gradient(circle, rgba(0,212,255,.16), transparent 62%), linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02));
    }

    .founder-mark {
      color: rgba(245,247,250,.82);
      font-size: clamp(4rem, 12vw, 8rem);
      font-weight: 900;
      letter-spacing: -.08em;
      text-shadow: 0 0 40px rgba(0,212,255,.28);
    }

    .final {
      width: min(1100px, calc(100vw - 40px));
      margin: 0 auto clamp(4rem, 8vw, 7rem);
      padding: clamp(2rem, 5vw, 5rem);
      text-align: center;
      border-radius: 38px;
      border: 1px solid rgba(245,247,250,.12);
      background: radial-gradient(circle at 50% 0%, rgba(0,212,255,.16), transparent 46%), rgba(5,7,11,.58);
    }

    footer {
      width: min(1320px, calc(100vw - 48px));
      margin: clamp(3rem, 6vw, 6rem) auto 0;
      padding: clamp(2rem, 4vw, 3rem);
      border: 1px solid rgba(245,247,250,.1);
      border-radius: 32px 32px 0 0;
      background: rgba(4,6,11,.76);
      color: rgba(245,247,250,.72);
    }

    @media (max-width: 980px) {
      .site-header, .grid, .founder {
        grid-template-columns: 1fr;
      }

      nav { justify-content: flex-start; }
    }
  </style>
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/">JayP<span>Ventures</span> LLC</a>
    <nav>
      <a href="#ecosystem">Ecosystem</a>
      <a href="#access">Access</a>
      <a href="#founder">Founder</a>
      <a class="cta" href="mailto:venture@jaypventuresllc.com">Start</a>
    </nav>
  </header>

  <main class="page">
    <section class="hero">
      <div class="hero-frame">
        <p class="kicker">init · powered by JPV-OS · operated by JayPVentures LLC</p>
        <h1>Welcome to the Venture</h1>
        <p class="lead">A unified access gateway for creators, members, partners, and enterprise operators moving through the JayPVentures ecosystem.</p>
        <div class="actions">
          <a class="button primary" href="mailto:venture@jaypventuresllc.com">Request Enterprise Access</a>
          <a class="button secondary" href="#ecosystem">Explore the Ecosystem</a>
        </div>
      </div>
    </section>

    <section id="ecosystem" class="section">
      <div class="section-intro">
        <p class="kicker">Ecosystem Architecture</p>
        <h2>One gateway. Multiple operational lanes.</h2>
        <p>JayPVentures LLC routes infrastructure, creator systems, labs, and institutional doctrine through distinct operating lanes.</p>
      </div>

      <div class="grid">
        <article class="card"><span>Enterprise</span><strong>JayPVentures LLC</strong><p>Infrastructure, operations, security, and delivery authority.</p></article>
        <article class="card"><span>Creator</span><strong>jaypventures</strong><p>Venture studio, creator access, community, and adoption.</p></article>
        <article class="card"><span>Labs</span><strong>jaypVLabs</strong><p>Prototype validation, AI behavior, systems testing, and readiness.</p></article>
        <article class="card"><span>Institute</span><strong>JPV Institute</strong><p>Doctrine, infrastructure literacy, standards, research, and accreditation.</p></article>
        <article class="card"><span>Access</span><strong>init</strong><p>The public access and routing interface for the JPV-OS ecosystem.</p></article>
        <article class="card"><span>Core</span><strong>JPV-OS</strong><p>Governance, entitlement routing, access decisions, and system architecture.</p></article>
      </div>
    </section>

    <section id="access" class="section">
      <div class="section-intro">
        <p class="kicker">Access Gateway</p>
        <h2>Access that matches the role.</h2>
        <p>Member, VIP, creator, operator, enterprise, and sovereign paths connect payments, entitlements, and community access without flattening the experience.</p>
      </div>

      <div class="grid">
        <article class="card"><span>Members</span><strong>Member Access</strong><p>Community access, membership routing, and entry-level ecosystem participation.</p></article>
        <article class="card"><span>VIP</span><strong>VIP Venture</strong><p>Priority experiences, elevated community access, and venture-facing access lanes.</p></article>
        <article class="card"><span>Creator</span><strong>Creator Lane</strong><p>Creator tooling, monetization routing, and ecosystem growth support.</p></article>
        <article class="card"><span>Operator</span><strong>Operator</strong><p>Operational access for builders, moderators, implementation support, and delivery workflows.</p></article>
        <article class="card"><span>Enterprise</span><strong>Enterprise</strong><p>Partner packages, implementation visibility, infrastructure support, and governed delivery.</p></article>
        <article class="card"><span>Sovereign</span><strong>Custom Access</strong><p>Custom architecture, private routing, and higher-governance implementation paths.</p></article>
      </div>
    </section>

    <section id="founder" class="section founder">
      <div class="founder-media"><div class="founder-mark">JPV</div></div>
      <div>
        <p class="kicker">Founder Direction</p>
        <h2>Built to route access, infrastructure, and opportunity with operational integrity.</h2>
        <p>This gateway is the public entry point into creator access, enterprise delivery, community membership, partner routing, and governed infrastructure.</p>
      </div>
    </section>

    <section class="final">
      <p class="kicker">Launch Path</p>
      <h2>Enter the ecosystem.</h2>
      <p>Choose the access lane that matches your role and move through the correct operational path.</p>
      <div class="actions">
        <a class="button primary" href="mailto:venture@jaypventuresllc.com">Start Access Request</a>
      </div>
    </section>
  </main>

  <footer>
    <strong>JayPVentures LLC</strong>
    <p>Enterprise packages: <a href="mailto:venture@jaypventuresllc.com">venture@jaypventuresllc.com</a></p>
    <p>Security matters: <a href="mailto:security@jaypventuresllc.com">security@jaypventuresllc.com</a></p>
    <p>Support/partnerships: <a href="mailto:support@jaypventuresllc.com">support@jaypventuresllc.com</a></p>
  </footer>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    return new Response(html, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store"
      }
    });
  }
};
