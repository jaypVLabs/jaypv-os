# JayP Ventures LLC — Site Development Plan

## Current State (as of April 2026)

### ✅ Complete
| Area | Status | Notes |
|---|---|---|
| Repository & CI/CD | ✅ Working | GitHub Actions builds Wix preview on every push/PR to `main` |
| Custom Signup page | ✅ Implemented | Full validation, loading state, error/success feedback; imports `createMember` from backend |
| Global CSS | ✅ Complete | Hero and gradient styles defined |
| Security policy | ✅ Documented | `SECURITY.md` in place |
| Load testing | ✅ Configured | Locust + JMeter scripts ready |
| Backend: member registration | ✅ Implemented | `src/backend/members.jsw` — `createMember()` via `wix-members-backend` |
| Backend: contact email | ✅ Implemented | `src/backend/contact.jsw` — `sendContactEmail()` via `wix-crm-backend` |
| Backend: order history | ✅ Implemented | `src/backend/orders.jsw` — `getMemberOrders()` via `wix-stores-backend` |
| `masterPage.js` | ✅ Implemented | Global user-state sync (login/account/logout nav) + cart badge |
| `CONTACT.q30cn.js` | ✅ Implemented | Form validation, backend call, loading/success/error states |
| `HOME.c1dmp.js` | ✅ Implemented | Staggered hero fade-in, brand card reveal, CTA wiring |
| `PORTFOLIO.h2qkt.js` | ✅ Implemented | Brand filter tabs, sequential card entrance animation |
| Brand pages (RAYLUX, VITAGLOW, ZYNTH, BEST BAKERY, STUDIO) | ✅ Implemented | Hero fade-in + deep-link shop/contact button |
| E-commerce pages | ✅ Implemented | Product Page, Cart Page, Side Cart, Checkout, Thank You Page, Category Page |
| `Member Page.hf0a9.js` | ✅ Implemented | Profile display/edit + order history repeater; guest redirect to `/login` |
| `Blog.mjef5.js` | ✅ Implemented | Dataset category filter + prev/next pagination |
| `Post.xjvor.js` | ✅ Implemented | Share buttons (Twitter/Facebook/LinkedIn/copy), word-count read time |
| `src/public/utils.js` | ✅ Implemented | `exists()`, `isValidEmail()`, `formatCurrency()`, `toTitleCase()` |
| `permissions.json` | ✅ Hardened | Explicit per-function rules with correct `"backend/<file>.jsw"` key format |

### ❌ Not Started (Low Priority)
| Area | Status |
|---|---|
| Legal pages (Privacy, Terms, Refund, Accessibility) | ❌ Content-only; JS not needed unless anchor nav / print required |

---

## Technical Reminders

- **Wix Velo page files** cannot be renamed or created manually from the IDE — always create new pages in the Wix browser editor first, then sync.
- **Backend `.jsw` files** are Wix web modules; export async functions callable from any page file using `import { fn } from 'backend/moduleName'`.
- **`public/` files** are shared utilities importable as `import { fn } from 'public/fileName'`.
- **`postinstall` runs `wix sync-types`** — always use `--ignore-scripts` in CI and pass `WIX_AUTH_TOKEN` for the preview step.
- **Permissions**: `src/backend/permissions.json` uses `"backend/<file>.jsw"` key format. The `"*"` default restricts access to site owners only; explicit per-function rules grant wider access where needed.
