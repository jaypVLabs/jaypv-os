# JayP Ventures LLC — Site Development Plan

## Current State (as of April 2026)

### ✅ Complete
| Area | Status | Notes |
|---|---|---|
| Repository & CI/CD | ✅ Working | GitHub Actions builds Wix preview on every push/PR to `main` |
| Custom Signup page | ✅ Implemented | Full validation, loading state, error/success feedback |
| Global CSS | ✅ Complete | Hero and gradient styles defined |
| Security policy | ✅ Documented | `SECURITY.md` in place |
| Load testing | ✅ Configured | Locust + JMeter scripts ready |
| Backend: member creation | ✅ Implemented | `src/backend/members.jsw` — `createMember()` via `wix-members-backend` |
| Backend: contact form | ✅ Implemented | `src/backend/contact.jsw` — `sendContactEmail()` via `wix-crm-backend` |
| Backend: order history | ✅ Implemented | `src/backend/orders.jsw` — `getMemberOrders()` via `wix-stores-backend` |
| `masterPage.js` | ✅ Implemented | Global nav/cart/user state sync |
| `CONTACT.q30cn.js` | ✅ Implemented | Form validation, backend call, loading/success/error states |
| `HOME.c1dmp.js` | ✅ Implemented | Hero animation, brand card lazy-load, CTA buttons |
| `Product Page.o6uws.js` | ✅ Implemented | Quantity controls, Add to Cart, variant selection |
| `Cart Page.fg8rx.js` | ✅ Implemented | Cart view, update quantities, remove items, proceed to checkout |
| `Side Cart.c3eqr.js` | ✅ Implemented | Mini cart flyout synced with Wix Stores |
| `Checkout.dl5aa.js` | ✅ Implemented | Pre-fill form fields for logged-in members |
| `Thank You Page.w3175.js` | ✅ Implemented | Order confirmation display |
| `Category Page.cf2ra.js` | ✅ Implemented | Filter/sort product grid, breadcrumbs |
| `Member Page.hf0a9.js` | ✅ Implemented | Profile info, order history, profile edit |
| `PORTFOLIO.h2qkt.js` | ✅ Implemented | Brand tabs, scroll animation |
| Brand pages (RAYLUX, VITAGLOW, ZYNTH, BEST BAKERY, STUDIO) | ✅ Implemented | Hero animation, shop/contact deep-links |
| `Blog.mjef5.js` | ✅ Implemented | Paginated post list, category filter |
| `Post.xjvor.js` | ✅ Implemented | Share buttons, estimated read time |
| `public/utils.js` | ✅ Implemented | Shared utility functions (exists, isValidEmail, formatCurrency, toTitleCase) |
| Permissions hardening | ✅ Complete | Explicit per-function rules; `orders.getMemberOrders` restricted to members/owners |

### ⚠️ Optional / Low Priority
| Area | Status | Notes |
|---|---|---|
| Legal pages (Privacy, Terms, Refund, Accessibility) | ⚠️ Content-only | JS files left empty — no custom logic needed; content managed in Wix editor |
| `Fullscreen Page.cukwa.js` | ⚠️ Not required | Managed entirely in the Wix editor |

---

## Technical Reminders

- **Wix Velo page files** cannot be renamed or created manually from the IDE — always create new pages in the Wix browser editor first, then sync.
- **Backend `.jsw` files** are Wix web modules; export async functions that can be called from any page file using `import { fn } from 'backend/moduleName'`.
- **`public/` files** are shared utilities importable as `import { fn } from 'public/fileName'`.
- **`postinstall` runs `wix sync-types`** — always use `--ignore-scripts` in CI and pass `WIX_AUTH_TOKEN` for the preview step.
- **Permissions**: `src/backend/permissions.json` now has explicit per-function rules. Review before launch — ensure sensitive functions remain restricted to appropriate roles.

---

## Open PRs to Action

| PR | Title | Action needed |
|---|---|---|
| [#3](https://github.com/jaypventuresllc/jaypventuresllc.com/pull/3) | CI: pin @wix/cli version and use npm ci | **Close as duplicate** — those exact changes were already merged via PR #2 into `main`. The workflow file on `main` already has `@wix/cli@1.1.174` and `npm ci --ignore-scripts`. |
