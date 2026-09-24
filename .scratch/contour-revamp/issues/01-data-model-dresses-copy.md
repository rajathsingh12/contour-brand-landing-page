# 01 — Typed data model, all 15 dresses & keyed copy

**What to build:** The single typed source of truth every other ticket reads from — a `Dress` type and a `FitCategory` union, all 15 dresses populated from the canonical collection table, and every page's copy captured as keyed blocks. No UI. Replaces the legacy `data/` (products, fitProfiles, bodyShapes) and the old fit/type model in `lib/`, including the "Silhouette Engineering" / Sculpt-Balance-Lengthen-Enhance vocabulary.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

**Hard constraints:** Dresses only — never model tops, skirts, co-ords, ethnicwear, or accessories, even as placeholders. Sizes exactly L, XL, 2XL, 3XL, 4XL. Exactly five fit categories: ARMS, BUST, TUMMY, WAIST, HIPS & THIGHS (union `ARMS | BUST | TUMMY | WAIST | HIPS_THIGHS`). Prices ₹1,099 / ₹1,299 / ₹1,499, identical across all sizes — enforced by a type or unit check, not convention. No "plus-size" in any customer-facing copy string. Nothing fit-finder-related is ever called "AI".

- [ ] `Dress` type: id (`a1`–`h3`, lowercased code), name, fitCategory, price (₹), sizes (L–4XL), whyItWorks[], fabric, care, modelSize, single image.
- [ ] All 15 dresses populated from the canonical table (A1–A3, B1–B3, T1–T3, W1–W3, H1–H3) with correct name, category, colour, silhouette and card copy; each mapped to its exact crop in `docs/new-data/new-cropped-images/`.
- [ ] Price invariant machine-enforced: a dress cannot carry per-size prices; a check fails if any size differs.
- [ ] Keyed copy blocks for hero, homepage sections 2–8, nav labels, footer/payment, the five Shop-by-Fit category taglines (verbatim), the brand statement (FIVE FIT CONCERNS. / FIFTEEN DRESSES. / DESIGNED FOR REAL BODIES.) and the lockup (CONTOUR · DRESSES DESIGNED AROUND YOU · SIZES L–4XL). Keep the brief's hero subheading "Sophisticated dresses designed around your proportions." as a distinct key from the lockup tagline "DRESSES DESIGNED AROUND YOU".
- [ ] Legacy dress data + Silhouette Engineering vocabulary removed.
- [ ] Runnable unit check verifies: 15 dresses, 3 per category, every id maps to an existing crop file, price invariant holds.
