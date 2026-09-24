# 06 — Product detail page (/products/[id])

**What to build:** The full product page for any dress, rendering every field the brief requires, with the "Why It Works" fit rationale as the centrepiece and a recommended-dresses strip reusing the collection grid.

**Blocked by:** 05 (reuses ProductCard / CollectionGrid for recommended dresses). Reads dress data from 01.

**Status:** done

**Hard constraints:** L / XL / 2XL / 3XL / 4XL selector. One image only — the dress's own crop, no gallery. Price identical across sizes. Fit guidance is a styling recommendation, never a restriction — never tell the customer she "can't wear this". No "plus-size" copy. Missing id → quiet not-found, never breaks the build.

- [x] Renders name, price, size selector (L–4XL), fit focus, Why It Works (design-feature rationale for the category), fabric, care, model size, size-guide link, shipping + return + payment (prepaid / COD) info, reviews, recommended dresses.
- [x] Single product image (the crop); no multi-view gallery.
- [x] Recommended dresses reuse the shared card/grid.
- [x] Unknown / missing dress id degrades to a quiet placeholder / not-found.

**Done means (quality gate):** evidence harness green for a representative `/products/[id]`.

## Comments

- `components/product/ProductDetail.tsx` (new) renders all 13 fields in the AGENTS.md order; `app/products/[id]/page.tsx` wires the route with `generateStaticParams` (all 15 ids prerender) + `generateMetadata`, and `notFound()` on unknown id. Recommended strip reuses `CollectionGrid` via a deterministic `recommendedDresses()` (same-category first, then catalogue order, current excluded — no randomness/network). Shipping/returns/payment/reviews copy added to `data/copy.ts`; reviews are shared static placeholders (no per-dress review data — richer reviews are post-MVP per roadmap).
- One image only (the dress's own crop), no gallery; size selector L–4XL; price identical across sizes; fit guidance framed as recommendation, never restriction; no "plus-size" copy. Typecheck clean; 50 unit tests pass (added deterministic-recommendation, all-fields-render, single-image, size-range, never-restrict/no-"plus-size", axe).
- Evidence (`npm run evidence`) added `/products/a1` to `EXTRA_ROUTES`: Lighthouse P100 A100 B96 S100, CLS 0, axe 0 violations, colour-audit 0 offenders. The only red gate is console-errors (5), byte-identical to the `/shop` baseline — the shared Header/Footer prefetch of not-yet-built nav routes (`/`, `/about`, `/fit-finder`, `/our-approach`). Same documented cross-ticket residual as 05; owned by ticket 10 once every nav route resolves. The PDP itself introduces no new console errors.
