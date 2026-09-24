# 04 — Site layout: header/nav, footer & cart drawer

**What to build:** The persistent chrome that wraps every route — a minimal header nav, a quiet cart drawer, and an unobtrusive footer — registered in the App Router root layout with global CSS and fonts. After this, every page renders inside the real site shell.

**Blocked by:** 02 (primitives, tokens, fonts), 03 (evidence harness for the DoD gate). Reads nav / footer copy from 01.

**Status:** ready-for-agent

**Hard constraints:** Nav is exactly CONTOUR · SHOP · SHOP BY FIT · FIT FINDER · OUR APPROACH · SIZE GUIDE · ABOUT plus search / account / cart affordances — no extra categories. Cart is a front-end-only quiet drawer; make no backend / checkout claims. Footer states prepaid + COD unobtrusively. No promo / sale banners. No "plus-size" copy.

- [ ] `components/layout/` Header with the exact nav + search / account / cart affordances; cart opens a quiet drawer.
- [ ] Footer with payment methods (prepaid, COD) stated quietly.
- [ ] `app/layout.tsx` registers fonts + global CSS and renders header/footer on every route.
- [ ] Renders correctly at 1440/390; keyboard-navigable; axe clean.

**Done means (quality gate):** evidence harness green for the shell — Lighthouse ≥ 95 ×4, axe clean, colour-audit pass, zero console errors, CLS < 0.05.
