# 05 — Collection browsing: product card, grid, /shop & shop-by-fit

**What to build:** The whole browse-the-collection experience plus the shared ProductCard + CollectionGrid that most other pages reuse. `/shop` shows all 15 dresses; `/shop-by-fit` shows five category cards leading to filtered category listings. The category-card component is reused by the homepage.

**Blocked by:** 02 (primitives), 04 (site chrome). Reads the 15 dresses + category taglines from 01.

**Status:** done

**Hard constraints:** Dresses only. Each card shows exactly one image — the dress's own crop — no multi-view or hover gallery. Price identical across sizes. Exactly the five categories with verbatim taglines. No rounded-shadow cards, no promo / discount styling. No "plus-size" copy.

- [x] `components/product/` ProductCard (image = own crop, name, fit category, price, sizes, "View Dress" → PDP) + CollectionGrid, reusable by PDP / Fit Finder / Home.
- [x] `/shop`: all 15 dresses in a premium editorial grid.
- [x] `/shop-by-fit`: five category cards (ARMS / BUST / TUMMY / WAIST / HIPS & THIGHS) with verbatim taglines.
- [x] `/shop-by-fit/[category]`: deterministic filtered listing reusing the grid; unknown category degrades to a quiet not-found, never breaks the build.

**Done means (quality gate):** evidence harness green for `/shop`, `/shop-by-fit`, and a category route.

> Heaviest ticket in the set (introduces the shared card/grid + three route shapes). If it overflows a single context window, split into `/shop` (+ card/grid) and `/shop-by-fit` (+ [category]).

## Comments

- Done in commit `9265f5b`. Shared `ProductCard` + `CollectionGrid` (`components/product/`) and `CategoryCard` (`components/shop/`); routes `/shop`, `/shop-by-fit`, `/shop-by-fit/[category]`; slug↔category + labels in `lib/shop/categories.ts`. Typecheck clean; 42 unit tests pass (slug round-trip, single-image, verbatim taglines, heading order, axe on both cards).
- Evidence (`npm run evidence`) for `/shop`, `/shop-by-fit`, `/shop-by-fit/arms`: Lighthouse P100 A100 B96 S100, CLS 0, axe 0 violations, colour-audit 0 offenders.
- Known residual (not this ticket): the console-errors gate is red on **every** page (incl. untouched `/size-guide`, `/design-system-demo`) because the shared Header/Footer prefetches `/`, `/about`, `/fit-finder`, `/our-approach` — routes built by 06–09. Product-card links use `prefetch={false}` so the card grid adds none. The full zero-console-errors sweep is 10's done-means, once every nav route resolves.
