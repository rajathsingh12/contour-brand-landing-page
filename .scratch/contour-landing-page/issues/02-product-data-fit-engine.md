# 02 — Product data, type system & fit engine

**What to build:** The complete product data layer and the Fit Finder scoring engine. All 19 SKUs defined with the full `Product` interface (id, name, category, price, sizes, colors, bodyShapes, fitObjectives, concernsAddressed, fitType, fabric, stretchLevel, length, occasions, styleTags, placeholder image paths, modelInfo). Supporting types/enums for Size, BodyShape, FitObjective, Concern, Category. Body-shape recommendation data. Fit profile name mappings. The scoring engine as a pure function: takes user preferences + product array → returns scored ranked products. Vitest unit tests for the engine.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] `Product` interface and all supporting union types defined and exported
- [ ] All 19 SKUs populated with complete data including body shape, fit objective, and concern tags based on garment construction logic
- [ ] Body-shape data (`data/bodyShapes.ts`) with descriptions and recommended styles per AGENTS.md
- [ ] Fit profile data (`data/fitProfiles.ts`) with deterministic name generation from user inputs
- [ ] `lib/fit-engine.ts` — pure scoring function using weights: body_shape 30, concern 30, goal 25, fit_preference 15
- [ ] "Not sure" body shape handled (score redistributed evenly)
- [ ] Returns top 3 products with scores
- [ ] Scoring weights defined as named constants, not magic numbers
- [ ] Vitest unit tests: Apple+midsection ranks A-line products high; Pear+balance ranks structured tops high; "Not sure" redistribution works; no zero-result edge case; results in descending score order; deterministic profile naming
- [ ] `npm test` passes, TypeScript compiles clean
