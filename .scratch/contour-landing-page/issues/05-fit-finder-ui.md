# 05 — Fit Finder UI

**What to build:** `/fit-finder` page with a 5-step interactive flow that calls the scoring engine from ticket 02 and displays personalised results. Step 1: usual size (XL–6XL). Step 2: where do you prefer more room (Bust/Stomach/Hips/Thighs/Arms/Overall — multi-select). Step 3: what do you want your outfit to do (Define/Smooth/Balance/Lengthen/Enhance/Relax — multi-select). Step 4: preferred fit (Fitted/Structured/Relaxed/Oversized — single select). Step 5: body shape (Apple/Pear/Hourglass/Rectangle/Inverted triangle/Not sure — single select). On completion: display named fit profile, preference summary, 3 recommended ProductCards linking to their product pages, and the disclaimer.

**Blocked by:** 01 (scaffold + shared components), 02 (product data + fit engine)

**Status:** ready-for-agent

- [ ] `/fit-finder` route with multi-step form UI
- [ ] Step 1: size selection (XL through 6XL) — single select cards
- [ ] Step 2: room preference — multi-select cards (Bust/Stomach/Hips/Thighs/Arms/Overall)
- [ ] Step 3: outfit goal — multi-select cards (Define/Smooth/Balance/Lengthen/Enhance/Relax)
- [ ] Step 4: fit preference — single select cards (Fitted/Structured/Relaxed/Oversized)
- [ ] Step 5: body shape — single select cards with shape descriptions (Apple/Pear/Hourglass/Rectangle/Inverted triangle/Not sure)
- [ ] Progress indicator showing current step (e.g. "Step 3 of 5")
- [ ] Back button on each step (except step 1)
- [ ] On completion: call `fitEngine.score()` with user inputs
- [ ] Display named fit profile (e.g. "The Balanced Sculpt")
- [ ] Display preference summary ("You prefer: Relaxed midsection + defined waist + balanced proportions")
- [ ] Display 3 recommended products as ProductCards linking to `/products/[id]`
- [ ] "Retake" button to restart
- [ ] Disclaimer: "Your fit profile is a styling recommendation based on your preferences and proportions."
- [ ] Styled to feel editorial and premium, not like a generic quiz
