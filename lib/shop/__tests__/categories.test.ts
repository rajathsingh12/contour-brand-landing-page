import { describe, it, expect } from "vitest";
import { FIT_CATEGORIES, type FitCategory } from "@/data/dresses";
import {
  categoryToSlug,
  slugToCategory,
  CATEGORY_SLUGS,
  CATEGORY_LABELS,
} from "@/lib/shop/categories";

describe("shop category slug ⇄ FitCategory", () => {
  it("maps every category to a URL-safe slug and back", () => {
    for (const category of FIT_CATEGORIES) {
      const slug = categoryToSlug(category);
      expect(slug, `${category} slug`).toMatch(/^[a-z-]+$/);
      expect(slugToCategory(slug), `${slug} round-trips`).toBe(category);
    }
  });

  it("slugs HIPS_THIGHS as hips-thighs (no underscore in URLs)", () => {
    expect(categoryToSlug("HIPS_THIGHS")).toBe("hips-thighs");
    expect(slugToCategory("hips-thighs")).toBe("HIPS_THIGHS");
  });

  it("returns undefined for unknown, empty, or raw-enum slugs", () => {
    for (const bad of ["", "tops", "hips_thighs", "HIPS_THIGHS", "ARMS"] as string[]) {
      expect(slugToCategory(bad), `${bad || "<empty>"} is not a slug`).toBeUndefined();
    }
  });

  it("exposes exactly the five slugs, unique", () => {
    expect(CATEGORY_SLUGS).toHaveLength(5);
    expect(new Set(CATEGORY_SLUGS).size).toBe(5);
    expect(CATEGORY_SLUGS).toEqual(FIT_CATEGORIES.map(categoryToSlug));
  });

  it("labels every category, spelling HIPS & THIGHS in full", () => {
    for (const category of FIT_CATEGORIES) {
      expect(CATEGORY_LABELS[category as FitCategory], `${category} label`).toBeTruthy();
    }
    expect(CATEGORY_LABELS.HIPS_THIGHS).toBe("HIPS & THIGHS");
    expect(CATEGORY_LABELS.ARMS).toBe("ARMS");
  });
});
