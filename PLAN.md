# JayPV — Ecosystem Development Plan

> **Organization:** JayPVentures LLC  
> **Platform:** Wix Velo (JavaScript / React 16)  
> **Primary contact:** jayhere@jaypventuresllc.com  
> **Deployment:** Git Integration → `main` branch auto-syncs to live Wix site

---

## Ecosystem Architecture

JayPV is an operating ecosystem, not a brand portfolio. The five venture names (RAYLUX, VITAGLOW, ZYNTH, BEST BAKERY, STUDIO) are placeholder concepts for portfolio properties. The architecture is structured in four layers:

```
JayPVentures LLC  ← Enterprise / Control layer
    │
    ├── JPV-OS          ← Operating guidelines: identity, access, automation, governance
    │
    ├── jaypventures    ← Creator / Distribution layer: content, community, commerce
    │
    └── JPVLabs         ← Experimental validation: prototypes, research, testing
            │
            └── /ventures   ← Portfolio properties: product lines, storefronts, collections
```

---

## Layer Index

| Entity | Layer | Purpose | Route | CTA |
|---|---|---|---|---|
| **JayPVentures LLC** | Enterprise | Infrastructure, governance, systems architecture, consulting | `/jaypventures-llc` | Work with JayPVentures |
| **JPV-OS** | Operating Layer | Identity, access, automation, entitlement routing, enforcement, audit trails | `/jaypv-os` | Explore the system |
| **jaypventures** | Creator Layer | Community, creator commerce, content, media, Discord, VIP experiences | `/jaypventures` | Join the community |
| **JPVLabs / jaypVLabs** | Validation Layer | Experiments, prototypes, research, validation reports | `/jaypvlabs` | View labs |
| **Ventures** | Portfolio Index | Product drops, storefronts, collections, brand-specific pages | `/ventures` | Explore ventures |

---

## Site Page Structure

### `/` — Home
Ecosystem front door. Introduces JayPV as the operating ecosystem — not a brand portfolio. Hero copy, layer navigation, and a CTA that directs different visitor types (enterprise, creator, community) to their entry point.

### `/jaypventures-llc` — Enterprise Layer
Security, systems architecture, infrastructure, consulting, and compliance-minded operations. Audience: enterprise clients, partners, and investors.

### `/jaypv-os` — Operating Layer
Core system layer. Explains secure access, automation, entitlement routing, governance, and infrastructure. Audience: technical stakeholders, operators, and collaborators.

### `/jaypventures` — Creator Layer
Content, community, experiences, media, Discord, and creator commerce. Audience: community members, creators, and fans.

### `/jaypvlabs` — Validation Layer
Testing, prototypes, research, experiments, and validation. Audience: early adopters, experimenters, and technical collaborators.

### `/ventures` — Portfolio Index
Curated index of all portfolio properties and product lines. RAYLUX, VITAGLOW, ZYNTH, BEST BAKERY, and STUDIO live here as venture listings, not as primary entities.

### `/ventures/get-ready-w-jay`
Lifestyle / beauty / glow-focused venture page. Hero, product CTA, editorial content, community entry.

### `/ventures/tech`
Tech / futurist / product / AI-facing venture page. Product demos, spec-driven content, waitlist or notify-me flow.

### `/ventures/creator-studio`
Creative production / media / design studio page. Service packages, booking CTA, portfolio gallery, testimonials.

---

## Current Infrastructure State (April 2026)

### ✅ Complete
| Area | Status | Notes |
|---|---|---|
| Repository & CI/CD | ✅ Working | GitHub Actions builds Wix preview on every push/PR to `main` |
| Global CSS | ✅ Complete | Hero and gradient styles defined in `src/styles/` |
| Security policy | ✅ Documented | `SECURITY.md` + Cloudflare Zero Trust docs in place |
| Load testing | ✅ Configured | Locust + JMeter scripts ready (`load-testing/`, `jmeter-script.jmx`) |
| `masterPage.js` | ✅ Implemented | Global nav: login/account/logout visibility synced to auth state; cart badge count |
| `src/public/utils.js` | ✅ Implemented | `exists()`, `isValidEmail()`, `formatCurrency()`, `toTitleCase()` shared across all pages |
| `permissions.json` | ✅ Hardened | Explicit per-function rules; restrictive `"*"` default; targeted grants per function |
| Backend: member registration | ✅ Implemented | `members.jsw` → `createMember()` via `wix-members-backend` |
| Backend: contact / CRM | ✅ Implemented | `contact.jsw` → `sendContactEmail()` — captures CRM lead + sends triggered email ack |
| Backend: order history | ✅ Implemented | `orders.jsw` → `getMemberOrders()` scoped to calling member via `buyerInfo.memberId` |
| Custom Signup page | ✅ Implemented | Full validation, loading state, error/success feedback |
| HOME page | ✅ Implemented | Staggered hero fade-in, brand card reveal, all CTA buttons wired |
| CONTACT page | ✅ Implemented | Validation, backend CRM call, loading / success / error states |
| PORTFOLIO page | ✅ Implemented | Brand filter tabs, sequential card entrance animation |
| E-commerce: Product Page | ✅ Implemented | Quantity controls, add-to-cart with variant choices |
| E-commerce: Cart Page | ✅ Implemented | Repeater with update / remove, subtotal |
| E-commerce: Side Cart | ✅ Implemented | Flyout with animated close |
| E-commerce: Checkout | ✅ Implemented | Pre-fills member contact details |
| E-commerce: Thank You Page | ✅ Implemented | Reads `orderId` from query string |
| E-commerce: Category Page | ✅ Implemented | Dataset filter/sort, breadcrumbs from URL path |
| Member Page | ✅ Implemented | Profile display/edit (`contactDetails` API) + order history repeater; guest → `/login` |
| Blog page | ✅ Implemented | Dataset category filter + prev/next pagination |
| Post page | ✅ Implemented | Share buttons (Twitter/Facebook/LinkedIn/copy), word-count read time |

### ⏸ Pending — Page Structure Migration
| Area | Notes |
|---|---|
| `/jaypventures-llc` page | Enterprise layer page content and JS logic |
| `/jaypv-os` page | OS layer explainer, feature routing, governance overview |
| `/jaypventures` page | Creator layer hub, Discord embed, community CTAs |
| `/jaypvlabs` page | Labs index with experiment cards, validation reports |
| `/ventures` page | Portfolio property index replacing current brand-first layout |
| `/ventures/get-ready-w-jay` | Lifestyle venture page |
| `/ventures/tech` | Tech/AI venture page |
| `/ventures/creator-studio` | Creative studio venture page |
| Legal pages | Static content; JS only if anchor nav or print-to-PDF is added |

---

## Backlogs by System Layer

### 🏢 Enterprise Backlog (`/jaypventures-llc`)
- [ ] Partner intake form — multi-step form with CRM contact creation and deal-type tagging
- [ ] Case study / proof-of-work section — dataset-driven repeater with filter by industry
- [ ] Compliance and security overview section — structured content with doc downloads
- [ ] Admin dashboard backend module — `src/backend/admin.jsw` with aggregated revenue/order stats (owner-only)
- [ ] Webhook receiver — `src/backend/webhooks.jsw` to handle Stripe / external payment events
- [ ] Rate-limiting middleware — thin wrapper on `sendContactEmail` and `createMember` to debounce repeated calls

### ⚙️ OS Backlog (`/jaypv-os`)
- [ ] Entitlement routing logic — backend module that maps member role/tag to permitted routes and features
- [ ] Identity binding — connect Wix Members identity to external systems (Discord roles, Stripe subscriptions)
- [ ] Automation registry — documented map of all active Wix Automations with trigger, action, and scope
- [ ] Audit trail backend module — `src/backend/audit.jsw` logging key member actions to a Wix collection
- [ ] Access enforcement layer — `permissions.json` expansion: per-route and per-feature role checks
- [ ] Governance documentation page — policy versioning, access levels, enforcement status

### 🎨 Creator Backlog (`/jaypventures`)
- [ ] Discord community embed or invite CTA with role-based access gating
- [ ] Stripe membership / subscription upsell — tiered creator access (free / supporter / VIP)
- [ ] Email automation sequences — new member → welcome series, first purchase → follow-up
- [ ] VIP experience unlock — member tag `vip` grants access to gated content pages
- [ ] Content funnel — blog → lead magnet → CRM tag → email nurture sequence
- [ ] Social proof aggregation — Reviews API per-product average displayed on relevant pages

### 🔬 Labs Backlog (`/jaypvlabs`)
- [ ] Experiment cards repeater — dataset of active prototypes with status badge (active / complete / archived)
- [ ] Validation report pages — dataset-driven post-mortem or findings pages per experiment
- [ ] Prototype demo embeds — YouTube/Vimeo or iframe embed per lab card
- [ ] Early-access waitlist form — CRM contact creation with `labs-waitlist` tag
- [ ] Performance budget CI check — Lighthouse CI step in GitHub Actions to enforce Core Web Vitals thresholds

### 🛍️ Venture Backlog (`/ventures` and sub-pages)
- [ ] Venture index page — repeater of all portfolio properties with category filter
- [ ] **Get Ready W Jay** — product gallery, editorial content, newsletter signup, before/after testimonials
- [ ] **Tech venture** — product demo embed, spec comparison table, notify-me pre-order flow, AI feature highlights
- [ ] **Creator Studio** — service packages repeater (price + description from dataset), booking calendar (Wix Bookings / Calendly), portfolio gallery with lightbox, testimonials repeater
- [ ] Shared venture CTA pattern — `?source=<venture>` query param passed to CONTACT form for intake tracking
- [ ] Wishlist / Save for Later — Wix Members + custom collection to persist product IDs per member
- [ ] Loyalty / Points system — track spend via order history, display points balance on Member Page
- [ ] Abandoned cart email — Wix Automations trigger on cart-not-purchased after 24 h
- [ ] Post-purchase upsell — Thank You Page cross-sells from same venture category
- [ ] Referral link generator — Member Page "Share & Earn" with encoded `?ref=<memberId>` param
- [ ] SEO structured data — dynamic `wixSeo.setPageStructuredData()` per venture page

### 🔧 Shared Infrastructure Backlog
- [ ] `src/backend/email.jsw` — centralise triggered-email dispatch (currently inline in `contact.jsw`); reuse for order confirms, welcome emails
- [ ] `src/backend/catalog.jsw` — shared `getProductsByCollection(slug)` helper imported by all venture pages
- [ ] `src/public/brand.js` → rename/expand to `src/public/ecosystem.js` — layer/venture constants (slug, display name, route, CTA) importable by all page files
- [ ] Wix Insights / custom events — `wixWindow.trackEvent()` on CTA clicks, add-to-cart, form submits per layer

---

## Implementation Notes (Wix Velo)

- **Page files** cannot be renamed or created manually from the IDE — always create new pages in the Wix browser editor first, then sync to Git.
- **Backend `.jsw` files** are Wix web modules; export `async` functions callable from page files via `import { fn } from 'backend/moduleName'`.
- **`public/` files** are shared utilities importable as `import { fn } from 'public/fileName'`.
- **`postinstall` runs `wix sync-types`** — always use `--ignore-scripts` in CI; pass `WIX_AUTH_TOKEN` for the Wix preview build step.
- **Permissions** (`src/backend/permissions.json`): use `"backend/<file>.jsw"` key format. The `"*"` default is owner-only; add explicit per-function rules for broader access.
- **`wixLocation.to()`** is the correct navigation API in Velo — do not use `window.location` or `<a>` tag hrefs for internal routing.
- **Repeater `onItemReady`**: always use `$item('#id')` (not `$w('#id')`) to access elements inside a repeater item context. Register `onItemReady` before assigning `.data` to catch the first render.
