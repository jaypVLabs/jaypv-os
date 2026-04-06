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

### ⚠️ Partially Done
| Area | Status | Notes |
|---|---|---|
| Custom Signup — backend | ⚠️ Stub | Page calls `createMember()` but backend web method was missing (now fixed — see below) |

### ❌ Not Started
| Area | Status |
|---|---|
| `masterPage.js` — global nav/cart/user state | ❌ Empty placeholder |
| `CONTACT.q30cn.js` — contact form | ❌ Empty placeholder |
| Backend contact email handler | ❌ Not created |
| `HOME.c1dmp.js` | ❌ Empty placeholder |
| `PORTFOLIO.h2qkt.js` | ❌ Empty placeholder |
| Brand pages (RAYLUX, VITAGLOW, ZYNTH, BEST BAKERY, STUDIO) | ❌ Empty / 0-byte |
| E-commerce pages (Cart, Checkout, Product, Category, Thank You) | ❌ Empty placeholders |
| `Member Page.hf0a9.js` | ❌ Empty placeholder |
| `Side Cart.c3eqr.js` | ❌ Empty placeholder |
| `Blog.mjef5.js` / `Post.xjvor.js` | ❌ Empty placeholders |
| Legal pages (Privacy, Terms, Refund, Accessibility) | ❌ Empty placeholders |
| `public/` utility modules | ❌ None created |

---

## Prioritised Next Steps

### Priority 1 — Critical (unblocks everything else)

#### 1a. Backend: member creation (`src/backend/members.jsw`)
The Custom Signup page already calls `createMember()` from the backend but no web method existed.
**Status: ✅ Implemented in this PR.**

#### 1b. Backend: contact form (`src/backend/contact.jsw`)
The Contact page needs a backend handler to send an email via Wix `wix-crm-backend`/`wix-email` when a visitor submits the form.
**Status: ✅ Implemented in this PR.**

#### 1c. `masterPage.js` — global site shell
All pages share the master page. It should:
- Detect whether the current visitor is logged in and update the navigation bar accordingly (show "My Account" or "Login")
- Sync the cart item count to any cart-icon badge visible site-wide
- Handle the mobile menu open/close toggle if one is wired up in the Wix editor

**Status: ✅ Implemented in this PR.**

#### 1d. `CONTACT.q30cn.js` — contact form handler
Wire up the submit button, validate inputs, call the backend, and show a success/error message.
**Status: ✅ Implemented in this PR.**

---

### Priority 2 — High (revenue / conversion critical)

#### 2a. E-commerce page logic
- **`Product Page.o6uws.js`** — handle quantity selection, "Add to Cart" button, variant selection
- **`Cart Page.fg8rx.js`** — show cart contents, update quantities, remove items, proceed to checkout
- **`Side Cart.c3eqr.js`** — mini cart flyout, keep in sync with Wix Stores cart
- **`Checkout.dl5aa.js`** — pre-fill form fields for logged-in members, hook into Stripe
- **`Thank You Page.w3175.js`** — display order confirmation, clear cart state, fire conversion event
- **`Category Page.cf2ra.js`** — filter/sort product grid, breadcrumbs

#### 2b. Member page
- Show member profile info
- Display order history via `wix-stores-backend`
- Allow profile edit (name, email, address)

#### 2c. `HOME.c1dmp.js`
- Animate hero section on load
- Lazy-load portfolio brand cards
- Hook up CTA buttons

---

### Priority 3 — Medium (brand & content)

#### 3a. Brand portfolio pages (RAYLUX, VITAGLOW, ZYNTH, BEST BAKERY, STUDIO)
Each brand page should:
- Display a hero section using the existing `.hero_lux` CSS class
- Show a product or service gallery
- Deep-link back to the store category for that brand

#### 3b. `PORTFOLIO.h2qkt.js`
- Filter/tab between brands
- Animate cards on scroll into view

#### 3c. Blog / Post pages
- `Blog.mjef5.js` — paginated post list, category filter
- `Post.xjvor.js` — share buttons, estimated read time

---

### Priority 4 — Low (legal & supporting)

#### 4a. Legal pages
Privacy Policy, Terms & Conditions, Refund Policy, Accessibility Statement — these pages are content-only in the Wix editor. The JS files can remain empty unless anchor-navigation or print functionality is needed.

#### 4b. `public/` utility modules
As shared logic grows (e.g. analytics helpers, Stripe utilities, validation), extract it here so it can be imported across pages.

---

## Open PRs to Action

| PR | Title | Action needed |
|---|---|---|
| [#3](https://github.com/jaypventuresllc/jaypventuresllc.com/pull/3) | CI: pin @wix/cli version and use npm ci | **Close as duplicate** — those exact changes were already merged via PR #2 into `main`. The workflow file on `main` already has `@wix/cli@1.1.174` and `npm ci --ignore-scripts`. |

---

## Technical Reminders

- **Wix Velo page files** cannot be renamed or created manually from the IDE — always create new pages in the Wix browser editor first, then sync.
- **Backend `.jsw` files** are Wix web modules; export async functions that can be called from any page file using `import { fn } from 'backend/moduleName'`.
- **`public/` files** are shared utilities importable as `import { fn } from 'public/fileName'`.
- **`postinstall` runs `wix sync-types`** — always use `--ignore-scripts` in CI and pass `WIX_AUTH_TOKEN` for the preview step.
- **Permissions**: `src/backend/permissions.json` currently allows all roles to invoke all web methods. Tighten this before launch — restrict sensitive member/order functions to `siteOwner` or `siteMember` only.
