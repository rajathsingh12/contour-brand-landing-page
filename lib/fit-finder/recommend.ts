import { dresses, type Dress, type FitCategory } from "@/data/dresses";

// Deterministic fit-finder. Each dress belongs to exactly one fit category, so
// its score is how many of the selected concerns it addresses — 0 or 1. Keep the
// matches and stable-sort by score, then price. Same input always yields the same
// output: no randomness, no network, no model.
export function recommend(concerns: FitCategory[]): Dress[] {
  const selected = new Set(concerns);
  return dresses
    .map((dress) => ({ dress, score: selected.has(dress.fitCategory) ? 1 : 0 }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.dress.price - b.dress.price)
    .map(({ dress }) => dress);
}
