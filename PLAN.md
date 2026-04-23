# JayPVentures LLC — Site Development Plan

> **Organization:** JayPVentures LLC  
> **Platform:** Wix Velo (JavaScript / React 16)  
> **Primary contact:** jayhere@jaypventuresllc.com  
> **Deployment:** Git Integration → `main` branch auto-syncs to live Wix site

---

## Portfolio Entities

JayPVentures LLC operates five distinct brand entities, each with its own Wix page, shop category, and roadmap.

| Entity | Vertical | Shop path | CTA route | Page file |
|---|---|---|---|---|
| **RAYLUX** | Fashion / Apparel | `/shop/raylux` | Shop | `RAYLUX.cachf.js` |
| **VITAGLOW** | Health & Wellness | `/shop/vitaglow` | Shop | `VITAGLOW.p072h.js` |
| **ZYNTH** | Tech / Audio | `/shop/zynth` | Shop | `ZYNTH.w3w96.js` |
| **BEST BAKERY** | Food & Beverage | `/shop/best-bakery` | Shop | `BEST BAKERY.v9pi1.js` |
| **STUDIO** | Creative Services | `/contact` | Book | `STUDIO.zyklq.js` |

---

## Platform Infrastructure — Current State (April 2026)

### ✅ Shared / Cross-Entity (Complete)
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
| E-commerce: Product Page | ✅ Implemented | Quantity controls, add-to-cart |
| E-commerce: Cart Page | ✅ Implemented | Repeater with update / remove, subtotal |
| E-commerce: Side Cart | ✅ Implemented | Flyout with animated close |
| E-commerce: Checkout | ✅ Implemented | Pre-fills member contact details |
| E-commerce: Thank You Page | ✅ Implemented | Reads `orderId` from query string |
| E-commerce: Category Page | ✅ Implemented | Dataset filter/sort, breadcrumbs from URL path |
| Member Page | ✅ Implemented | Profile display/edit (`contactDetails` API) + order history repeater; guest → `/login` |
| Blog page | ✅ Implemented | Dataset category filter + prev/next pagination |
| Post page | ✅ Implemented | Share buttons (Twitter/Facebook/LinkedIn/copy), word-count read time |

### ⏸ Low-Priority / Content-Only (No JS Required Yet)
| Area | Notes |
|---|---|
| Legal pages (Privacy, Terms, Refund, Accessibility) | Static content; JS only needed if anchor nav or print-to-PDF is added |

---

## Per-Entity Roadmap & Enhancements

### 🟡 RAYLUX — Fashion / Apparel
**Current:** Hero fade-in + `/shop/raylux` deep-link.  
**Enhancements:**
- [ ] Lookbook / editorial gallery section (image strip with `wix-window` lightbox)
- [ ] Size-guide modal or side panel (triggered from product page)
- [ ] Collection filter on Category Page scoped to `raylux` tag
- [ ] "New Arrivals" featured-products strip on brand page (Wix Stores `queryProducts` by collection)
- [ ] Newsletter signup CTA with Wix CRM contact creation

### 🟡 VITAGLOW — Health & Wellness
**Current:** Hero fade-in + `/shop/vitaglow` deep-link.  
**Enhancements:**
- [ ] Ingredient / transparency accordion (expandable rich-text panels)
- [ ] Subscription / auto-replenish upsell on Product Page (Wix Subscriptions API)
- [ ] Wellness blog category filter pre-set to `vitaglow` tag on Blog page
- [ ] Before/after or testimonial carousel (repeater with auto-scroll)
- [ ] Bundle / kit product support on Category Page

### 🟡 ZYNTH — Tech / Audio
**Current:** Hero fade-in + `/shop/zynth` deep-link.  
**Enhancements:**
- [ ] Product demo embed (YouTube/Vimeo via `wix-video` or iframe) on Product Page
- [ ] Tech-spec comparison table (dataset-driven repeater)
- [ ] "Hear it first" audio preview widget on brand page
- [ ] Pre-order / notify-me flow: form → CRM contact tag `zynth-waitlist`
- [ ] Social proof: average star rating pulled from Wix Reviews API

### 🟡 BEST BAKERY — Food & Beverage
**Current:** Hero fade-in + `/shop/best-bakery` deep-link.  
**Enhancements:**
- [ ] Custom order / special-request form (extends CONTACT flow with product-specific fields)
- [ ] Pickup vs. delivery toggle on Product Page / Cart (custom field stored in order notes)
- [ ] Seasonal / limited-availability badge on Category Page (dataset field `isLimited`)
- [ ] Allergen info accordion on Product Page
- [ ] Weekly menu or "Today's Special" dynamic section (Wix dataset with date filter)

### 🟡 STUDIO — Creative Services
**Current:** Hero fade-in + booking CTA → `/contact`.  
**Enhancements:**
- [ ] Service packages section (repeater of packages with price + description from dataset)
- [ ] Availability calendar integration (Wix Bookings or embedded Calendly)
- [ ] Portfolio / past-work gallery with lightbox (Wix Pro Gallery)
- [ ] Inquiry pre-fill: pass `?service=<pkg>` query param from package CTA to CONTACT form
- [ ] Testimonials repeater (dataset `studioTestimonials`)

---

## Platform-Wide Enhancement Backlog

### Conversion & Retention
- [ ] **Wishlist / Save for Later** — Wix Members + custom collection to persist product IDs per member
- [ ] **Loyalty / Points system** — track spend via order history, display points balance on Member Page
- [ ] **Abandoned cart email** — Wix Automations trigger on cart-not-purchased after 24 h
- [ ] **Post-purchase upsell** — Thank You Page cross-sells from same brand category
- [ ] **Referral link generator** — Member Page "Share & Earn" with encoded `?ref=<memberId>` param

### Marketing & Content
- [ ] **Email automation sequences** — Wix Triggers: new member → welcome series, first purchase → follow-up
- [ ] **Blog cross-entity tagging** — single Blog page filtered by entity tag; entity pages link to filtered view
- [ ] **Social proof aggregation** — Reviews API per-product average displayed on Category + Home pages
- [ ] **SEO meta per entity** — dynamic `wixSeo.setPageStructuredData()` on each brand page

### Operations & Analytics
- [ ] **Admin dashboard backend module** — `src/backend/admin.jsw` with aggregated revenue/order stats (owner-only)
- [ ] **Wix Insights / custom events** — `wixWindow.trackEvent()` on CTA clicks, add-to-cart, form submits per entity
- [ ] **Webhook receiver** — `src/backend/webhooks.jsw` to handle Stripe / external payment events
- [ ] **Performance budget CI check** — Lighthouse CI step in GitHub Actions to enforce Core Web Vitals thresholds

### Infrastructure
- [ ] **`src/backend/email.jsw`** — centralise triggered-email dispatch (currently inline in `contact.jsw`); reuse for order confirms, welcome emails
- [ ] **`src/backend/catalog.jsw`** — shared `getProductsByCollection(slug)` helper imported by all brand pages
- [ ] **`src/public/brand.js`** — entity constants (slug, display name, colors, shop path) importable by page files to eliminate duplication
- [ ] **Rate-limiting middleware** — thin wrapper on `sendContactEmail` and `createMember` to debounce repeated calls

---

## Technical Reminders

- **Wix Velo page files** cannot be renamed or created manually from the IDE — always create new pages in the Wix browser editor first, then sync to Git.
- **Backend `.jsw` files** are Wix web modules; export `async` functions callable from page files via `import { fn } from 'backend/moduleName'`.
- **`public/` files** are shared utilities importable as `import { fn } from 'public/fileName'`.
- **`postinstall` runs `wix sync-types`** — always use `--ignore-scripts` in CI; pass `WIX_AUTH_TOKEN` for the Wix preview build step.
- **Permissions** (`src/backend/permissions.json`): use `"backend/<file>.jsw"` key format. The `"*"` default is owner-only; add explicit per-function rules for broader access.
- **`wixLocation.to()`** is the correct navigation API in Velo — do not use `window.location` or `<a>` tag hrefs for internal routing.
- **Repeater `onItemReady`**: always use `$item('#id')` (not `$w('#id')`) to access elements inside a repeater item context.
