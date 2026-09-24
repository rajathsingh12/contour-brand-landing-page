# 06 — Product detail page (/products/[id])

**What to build:** The full product page for any dress, rendering every field the brief requires, with the "Why It Works" fit rationale as the centrepiece and a recommended-dresses strip reusing the collection grid.

**Blocked by:** 05 (reuses ProductCard / CollectionGrid for recommended dresses). Reads dress data from 01.

**Status:** ready-for-agent

**Hard constraints:** L / XL / 2XL / 3XL / 4XL selector. One image only — the dress's own crop, no gallery. Price identical across sizes. Fit guidance is a styling recommendation, never a restriction — never tell the customer she "can't wear this". No "plus-size" copy. Missing id → quiet not-found, never breaks the build.

- [ ] Renders name, price, size selector (L–4XL), fit focus, Why It Works (design-feature rationale for the category), fabric, care, model size, size-guide link, shipping + return + payment (prepaid / COD) info, reviews, recommended dresses.
- [ ] Single product image (the crop); no multi-view gallery.
- [ ] Recommended dresses reuse the shared card/grid.
- [ ] Unknown / missing dress id degrades to a quiet placeholder / not-found.

**Done means (quality gate):** evidence harness green for a representative `/products/[id]`.
