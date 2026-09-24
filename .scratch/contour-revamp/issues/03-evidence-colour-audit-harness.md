# 03 — Evidence + colour-audit harness

**What to build:** The machine that proves every later ticket meets the bar, built before any page is styled. One command builds and boots the app in prod mode, walks every route at desktop and mobile, and emits screenshots + Lighthouse + axe + console logs + a colour-audit report. It runs against whatever routes exist today and is exercised fully as pages land.

**Blocked by:** 02 (the colour auditor checks computed colours against the palette tokens).

**Status:** ready-for-agent

**Hard constraints:** The colour auditor is the load-bearing brand gate — it must fail on any non-neutral colour with saturation > 40% or any colour outside tolerance of a palette token. This is the machine check for "no neon / no saturated colour".

- [ ] `npm run evidence`: `next build && next start`, wait for network-idle per route.
- [ ] Every route captured at 1440px and 390px → full-page + per-section PNGs under `docs/evidence/<route>/<breakpoint>.png`.
- [ ] Per route: Lighthouse → `lighthouse.json`, axe-core → `a11y.json`, console errors/warnings → `console.log`.
- [ ] Colour auditor crawls computed color / background / border / fill across every route, converts to HSL, fails on saturation > 40% or off-token colour → `docs/evidence/color-audit.json`.
- [ ] Exits non-zero when any gate fails, so it is directly usable as the definition-of-done check by every UI ticket (Lighthouse ≥ 95 on Performance / Accessibility / Best-Practices / SEO, axe clean, colour-audit pass, zero console errors, CLS < 0.05).
