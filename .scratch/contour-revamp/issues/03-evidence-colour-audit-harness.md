# 03 — Evidence + colour-audit harness

**What to build:** The machine that proves every later ticket meets the bar, built before any page is styled. One command builds and boots the app in prod mode, walks every route at desktop and mobile, and emits screenshots + Lighthouse + axe + console logs + a colour-audit report. It runs against whatever routes exist today and is exercised fully as pages land.

**Blocked by:** 02 (the colour auditor checks computed colours against the palette tokens).

**Status:** done

**Hard constraints:** The colour auditor is the load-bearing brand gate — it must fail on any non-neutral colour with saturation > 40% or any colour outside tolerance of a palette token. This is the machine check for "no neon / no saturated colour".

- [x] `npm run evidence`: `next build && next start`, wait for network-idle per route.
- [x] Every route captured at 1440px and 390px → full-page + per-section PNGs under `docs/evidence/<route>/<breakpoint>.png`.
- [x] Per route: Lighthouse → `lighthouse.json`, axe-core → `a11y.json`, console errors/warnings → `console.log`.
- [x] Colour auditor crawls computed color / background / border / fill across every route, converts to HSL, fails on saturation > 40% or off-token colour → `docs/evidence/color-audit.json`.
- [x] Exits non-zero when any gate fails, so it is directly usable as the definition-of-done check by every UI ticket (Lighthouse ≥ 95 on Performance / Accessibility / Best-Practices / SEO, axe clean, colour-audit pass, zero console errors, CLS < 0.05).

## Comments

Implemented as `scripts/evidence.mts` (orchestrator) + `scripts/evidence-color.mts` (pure colour auditor, unit-tested in `scripts/evidence-color.test.ts`, 11 cases). Deps added: `playwright-core`, `lighthouse`, `chrome-launcher`, `axe-core` — uses **system Chrome** via chrome-launcher (no bundled-browser download). `tsconfig.json` gains `allowImportingTsExtensions` so Node runs the `.mts` scripts directly; `docs/evidence/` is gitignored (regenerated output).

First full run against today's two routes (`/design-system-demo`, `/size-guide`): **colour-audit PASS** (9 rendered colours vs 31 palette tokens, 0 offenders — the brand gate is green on the ticket-02 design system). Lighthouse P100/A100/B96/S100, CLS 0. Both routes currently FAIL the overall gate on a real `landmark-unique` axe violation + console errors from the intentional broken-image `ImageFrame` demos — correct gate behaviour, to be resolved by the owning UI work; the harness exits non-zero as required.

Known ceilings (documented, not blocking):
- **Dynamic routes** (`/products/[id]`, `/shop-by-fit/[category]`) are skipped by `discoverRoutes` — no param-enumeration path yet. Add a param source when those pages land.
- **Mobile gate is visual-only**: screenshots capture 1440 + 390, but axe / Lighthouse / CLS are asserted at 1440 only. Add a 390 Lighthouse/axe pass if mobile-specific a11y or layout-shift needs gating.
- Colour-match tolerance (`TOKEN_TOLERANCE = 8`) and the 0.40 saturation ceiling are named constants in `evidence-color.mts` — tune there.
