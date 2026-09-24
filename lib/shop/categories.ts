// Shop category presentation + routing: the single place that maps the
// FitCategory enum to its URL slug and its customer-facing display label.
// Imported by ProductCard, CategoryCard, and the /shop-by-fit routes.

import { FIT_CATEGORIES, type FitCategory } from "@/data/dresses";

// URL slug is the lowercased enum with underscores as hyphens: HIPS_THIGHS ⇄ hips-thighs.
export function categoryToSlug(category: FitCategory): string {
  return category.toLowerCase().replace(/_/g, "-");
}

const BY_SLUG: Record<string, FitCategory> = Object.fromEntries(
  FIT_CATEGORIES.map((c) => [categoryToSlug(c), c]),
);

// Unknown / malformed slugs return undefined so routes can degrade to notFound().
export function slugToCategory(slug: string): FitCategory | undefined {
  return BY_SLUG[slug];
}

export const CATEGORY_SLUGS: string[] = FIT_CATEGORIES.map(categoryToSlug);

// Display labels — the enum is uppercase already; only HIPS_THIGHS needs spelling out.
export const CATEGORY_LABELS: Record<FitCategory, string> = {
  ARMS: "ARMS",
  BUST: "BUST",
  TUMMY: "TUMMY",
  WAIST: "WAIST",
  HIPS_THIGHS: "HIPS & THIGHS",
};
