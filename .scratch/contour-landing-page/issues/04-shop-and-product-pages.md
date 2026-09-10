# 04 — Shop page with filters + product detail pages

**What to build:** Two connected pages: (1) `/shop` showing all 19 products in a card grid with functional filters — standard (category, size, price, colour, occasion) and differentiator (fit objective, body consideration). Filters combine AND across categories, OR within. Filter state in URL search params so "Shop by Fit" nav links and homepage cards arrive pre-filtered. (2) `/products/[id]` dynamic route with the full Contour product page layout: name + price, silhouette tags, "Why we designed it" paragraph, "Best suited for" (body shapes + concerns), fit description, model info, size selector XL–6XL, Fit Finder CTA. Source and place per-product images.

**Blocked by:** 01 (scaffold + shared components), 02 (product data)

**Status:** ready-for-agent

### Shop page
- [ ] `/shop` route rendering all 19 products as ProductCards in a grid
- [ ] Filter sidebar/panel with: Category, Size, Price range, Colour, Occasion (standard) + Fit Objective (Smooth/Define/Balance/Lengthen/Enhance/Skim), Body Consideration (Midsection/Arms/Hips/Thighs/Shoulders/Legs)
- [ ] Filters combine AND across filter groups, OR within a group
- [ ] Filter state reflected in URL search params (`?fit=smooth&concern=midsection`)
- [ ] "Shop by Fit" nav links arrive with fit filter pre-applied
- [ ] Homepage "What Do You Want" cards arrive with relevant filter pre-applied
- [ ] Empty state: "No products match your filters" with clear-filters action
- [ ] Product count shown

### Product detail page
- [ ] `/products/[id]` dynamic route with `generateStaticParams` for all 19 products
- [ ] Product name + price (₹ INR)
- [ ] Silhouette tags displayed as SilhouetteBadge pills
- [ ] "Why we designed it" — one paragraph per product explaining construction intent
- [ ] "Best suited for" — body shapes + concerns addressed
- [ ] Fit description (e.g. "Relaxed through stomach / Structured at waist / A-line through hip")
- [ ] Model info: size worn, height, usual size
- [ ] Size selector: XL | 2XL | 3XL | 4XL | 5XL | 6XL (visual only, no cart)
- [ ] Fit Finder CTA: "Not sure about your size? Find My Fit" → `/fit-finder`
- [ ] Product images sourced and placed in `public/images/products/`
- [ ] Body shape framed as recommendation, never restriction
