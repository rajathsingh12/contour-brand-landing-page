# 08 — Editorial pages: /about, /our-approach, /size-guide

**What to build:** The three copy-led pages — the brand story (About / "WHY CONTOUR?"), the design philosophy (Our Approach), and the size guide (L–4XL, same price across sizes) — as quiet editorial layouts from the keyed copy.

**Blocked by:** 04 (site chrome + primitives). Reads copy from 01.

**Status:** done

**Hard constraints:** No "plus-size" in copy — use proportions, fit, silhouette, construction, ease, coverage, definition, design. No body-shaming, no "hide your…" language. Size guide states L–4XL with identical price across every size. No promo styling.

- [x] `/about` renders "WHY CONTOUR?" body from keyed copy.
- [x] `/our-approach` renders the design-philosophy body.
- [x] `/size-guide` renders the L–4XL size guidance + same-price-across-sizes message.
- [x] All three use the shared editorial layout — generous whitespace, hairline dividers.

**Done means (quality gate):** evidence harness green for `/about`, `/our-approach`, `/size-guide`.

## Comments

Shipped `components/editorial/EditorialPage.tsx` — the shared quiet-editorial shell (narrow `Container size="sm"`, `Heading`/`Text` primitives, hairline `Divider` under the header, `py-20 sm:py-28` whitespace). Takes `paragraphs` for a plain prose body or `children` for bespoke content.

- **`/about`** reads `copy.home.about` ("WHY CONTOUR?"); first line as lede, rest as prose.
- **`/our-approach`** reads `copy.home.thoughtThrough` ("NOT SIZED UP. THOUGHT THROUGH." — the design philosophy). Reused the existing homepage section copy rather than adding new keys, per "reads copy from 01".
- **`/size-guide`** reworked onto the shell: lede is the same-price message from `copy.home.sizePrice` ("…the same price across every size"); measurement table keyed by the `Size` union (`Record<Size, …>` so it can't desync from `SIZES`), how-to-measure + garment notes, and a quiet inline Fit Finder link replacing the old promo-style CTA box (no promo styling). No "plus-size" / body-shaming copy.

New `app/__tests__/editorial-pages.test.tsx` (9 tests): each page renders its keyed copy under a single h1, `/size-guide` shows the same-price message + L–4XL, none contain "plus-size"/"can't wear", and each page body is axe-clean.

**Evidence (`npm run evidence`, exit 0):** `/about`, `/our-approach`, `/size-guide` all **PASS** — Lighthouse P100 A100 B100 S100, CLS 0, axe 0 violations, 0 console errors — and colour-audit **PASS** (14 colours vs 31 tokens, 0 offenders). Typecheck clean; full vitest suite green (78 tests). The evidence run required a one-line `vitest.config.ts` fix (`Object.assign(process.env, …)` instead of assigning the read-only `NODE_ENV`) so `next build`'s type-check passes.
