# 10 — Route integration + whole-site consistency + full evidence sweep

**What to build:** The capstone that makes the site cohere — every nav link resolves to a real route, dynamic routes and failure isolation are verified end-to-end, and the full evidence sweep passes across all nine routes as the site-wide definition of done.

**Blocked by:** 06, 07, 08, 09 (all pages; 05 upstream).

**Status:** done

**Hard constraints:** Colour-audit passes on every route. No orphan nav links. A broken image, missing dress, or thrown component degrades to a quiet placeholder — never blanks a route or breaks the build. All customer copy free of "plus-size"; the Fit Finder is never "AI".

- [x] Every nav item (CONTOUR · SHOP · SHOP BY FIT · FIT FINDER · OUR APPROACH · SIZE GUIDE · ABOUT) resolves to a live route; no orphans.
- [x] `/shop-by-fit/[category]` and `/products/[id]` handle unknown params with a quiet not-found.
- [x] One type scale, one palette, one spacing rhythm verified across all routes: `/`, `/shop`, `/shop-by-fit`, `/shop-by-fit/[category]`, `/fit-finder`, `/our-approach`, `/size-guide`, `/about`, `/products/[id]`.
- [x] Full `npm run evidence` sweep green: Lighthouse ≥ 95 ×4 per route, axe clean, colour-audit pass, zero console errors, CLS < 0.05.
