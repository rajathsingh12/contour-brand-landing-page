# 04 — Site layout: header/nav, footer & cart drawer

**What to build:** The persistent chrome that wraps every route — a minimal header nav, a quiet cart drawer, and an unobtrusive footer — registered in the App Router root layout with global CSS and fonts. After this, every page renders inside the real site shell.

**Blocked by:** 02 (primitives, tokens, fonts), 03 (evidence harness for the DoD gate). Reads nav / footer copy from 01.

**Status:** done

**Hard constraints:** Nav is exactly CONTOUR · SHOP · SHOP BY FIT · FIT FINDER · OUR APPROACH · SIZE GUIDE · ABOUT plus search / account / cart affordances — no extra categories. Cart is a front-end-only quiet drawer; make no backend / checkout claims. Footer states prepaid + COD unobtrusively. No promo / sale banners. No "plus-size" copy.

- [x] `components/layout/` Header with the exact nav + search / account / cart affordances; cart opens a quiet drawer.
- [x] Footer with payment methods (prepaid, COD) stated quietly.
- [x] `app/layout.tsx` registers fonts + global CSS and renders header/footer on every route.
- [x] Renders correctly at 1440/390; keyboard-navigable; axe clean.

**Done means (quality gate):** evidence harness green for the shell — Lighthouse ≥ 95 ×4, axe clean, colour-audit pass, zero console errors, CLS < 0.05.

## Comments

Shipped `components/layout/{Header,Footer,CartDrawer}.tsx`, wired into `app/layout.tsx` (fonts + global CSS already registered there); removed the stale `components/Header.tsx` / `components/Footer.tsx` (old dropdown nav + forbidden Journal/Contact footer links). All nav labels + payment copy read from `data/copy.ts`.

- **Header:** exact six-item nav (SHOP · SHOP BY FIT · FIT FINDER · OUR APPROACH · SIZE GUIDE · ABOUT) as flat links + search / account / cart icon affordances. Search & account are present-but-inert placeholders (destinations are post-MVP); cart opens the drawer. Mobile hamburger discloses the same six links.
- **CartDrawer:** front-end-only, no cart state / checkout claims — quiet empty state. Escape / overlay-click / close-button all close; focus moves to the close button on open and back to the trigger on close. framer-motion slide honouring `prefers-reduced-motion`. `ponytail:` initial-focus not a full trap, and no scroll-lock — add both when items/PDP land.
- **Landmarks:** each nav is labelled (Primary / Mobile / Footer), which resolves the `landmark-unique` axe violation ticket 03 flagged on every route.

**Evidence (`npm run evidence`):** colour-audit **PASS** (11 colours vs 31 tokens, 0 offenders). Both existing routes score Lighthouse **P100 A100 B96 S100, CLS 0, axe 0 violations** — the shell meets its gate. The overall run still exits non-zero on route-owned console errors (image 404/400s: design-system-demo's intentional broken-image demos + size-guide's missing measurement images) — none originate from the shell (it makes zero resource requests), so these stay with their owning pages exactly as ticket 03 documented. New jsdom+axe test at `components/layout/__tests__/shell.test.tsx` guards landmark-unique + drawer open/Escape; added a `matchMedia` polyfill (`vitest.setup.ts`) so reduced-motion components can render under test. Typecheck, lint, and full suite (27 tests) green.
