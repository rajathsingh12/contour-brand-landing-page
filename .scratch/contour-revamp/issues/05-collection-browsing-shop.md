# 05 — Collection browsing: product card, grid, /shop & shop-by-fit

**What to build:** The whole browse-the-collection experience plus the shared ProductCard + CollectionGrid that most other pages reuse. `/shop` shows all 15 dresses; `/shop-by-fit` shows five category cards leading to filtered category listings. The category-card component is reused by the homepage.

**Blocked by:** 02 (primitives), 04 (site chrome). Reads the 15 dresses + category taglines from 01.

**Status:** ready-for-agent

**Hard constraints:** Dresses only. Each card shows exactly one image — the dress's own crop — no multi-view or hover gallery. Price identical across sizes. Exactly the five categories with verbatim taglines. No rounded-shadow cards, no promo / discount styling. No "plus-size" copy.

- [ ] `components/product/` ProductCard (image = own crop, name, fit category, price, sizes, "View Dress" → PDP) + CollectionGrid, reusable by PDP / Fit Finder / Home.
- [ ] `/shop`: all 15 dresses in a premium editorial grid.
- [ ] `/shop-by-fit`: five category cards (ARMS / BUST / TUMMY / WAIST / HIPS & THIGHS) with verbatim taglines.
- [ ] `/shop-by-fit/[category]`: deterministic filtered listing reusing the grid; unknown category degrades to a quiet not-found, never breaks the build.

**Done means (quality gate):** evidence harness green for `/shop`, `/shop-by-fit`, and a category route.

> Heaviest ticket in the set (introduces the shared card/grid + three route shapes). If it overflows a single context window, split into `/shop` (+ card/grid) and `/shop-by-fit` (+ [category]).
