# 07 — Fit Finder: deterministic engine, UI & /fit-finder

**What to build:** A pure rule-based recommender and its UI. The customer picks one or more fit concerns and gets relevant dresses back — the same input always yields the same output. Reused by homepage Section 6.

**Blocked by:** 05 (renders results via the shared card/grid). Scores over the 15 dresses from 01.

**Status:** ready-for-agent

**Hard constraints:** Deterministic rule-based scoring — score by category match, stable-sort by score then price, no randomness, no network, no model. Never described as "AI" in code, comments, or copy. Concerns are exactly the five categories. Fit guidance recommends, never restricts.

- [ ] `lib/fit-finder/` pure `recommend(concerns: FitCategory[]): Dress[]`, unit-tested with fixed input → fixed output (including all-five-selected and empty-selection cases).
- [ ] `components/fit-finder/` UI to select concern(s) → recommended dresses via the shared grid; empty-result and no-selection states handled quietly.
- [ ] `/fit-finder` route renders the UI inside the site chrome.
- [ ] No occurrence of "AI" anywhere in the module or its copy.

**Done means (quality gate):** engine unit tests pass; evidence harness green for `/fit-finder`.
