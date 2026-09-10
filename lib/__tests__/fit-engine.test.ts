import { describe, it, expect } from "vitest";
import { rankProducts, scoreProduct } from "@/lib/fit-engine";
import type { UserPreferences } from "@/lib/fit-engine";
import { products } from "@/data/products";
import { generateProfileName } from "@/data/fitProfiles";
import type { FitPreference } from "@/lib/types";

describe("fit-engine", () => {
  it("Apple + midsection concern ranks A-line products high", () => {
    const prefs: UserPreferences = {
      bodyShape: "apple",
      concerns: ["midsection"],
      goals: ["smooth"],
      fitPreference: "relaxed",
    };
    const results = rankProducts(products, prefs);
    const topNames = results.map((r) => r.product.name);
    expect(topNames.some((n) => n.includes("A-Line"))).toBe(true);
  });

  it("Pear + balance ranks structured tops high", () => {
    const prefs: UserPreferences = {
      bodyShape: "pear",
      concerns: ["hips", "thighs"],
      goals: ["balance", "structure"],
      fitPreference: "structured",
    };
    const results = rankProducts(products, prefs);
    const topIds = results.map((r) => r.product.id);
    const hasStructuredTop = topIds.some((id) => {
      const p = products.find((prod) => prod.id === id)!;
      return (
        p.fitObjectives.includes("structure") ||
        p.fitObjectives.includes("balance")
      );
    });
    expect(hasStructuredTop).toBe(true);
  });

  it("'Not sure' body shape redistributes score evenly", () => {
    const prefs: UserPreferences = {
      bodyShape: "not-sure",
      concerns: ["midsection"],
      goals: ["smooth"],
      fitPreference: "structured",
    };
    const results = rankProducts(products, prefs);
    // Every result should have a fractional body-shape score, not 0 or 30
    for (const r of results) {
      expect(r.score).toBeGreaterThan(0);
    }

    // Compare with explicit shape — "not sure" scores should differ from a single-shape match
    const applePrefs: UserPreferences = { ...prefs, bodyShape: "apple" };
    const appleScore = scoreProduct(products[0], applePrefs);
    const notSureScore = scoreProduct(products[0], prefs);
    // "not sure" averages across all shapes so usually differs from a specific match
    expect(notSureScore).not.toBe(appleScore);
  });

  it("never returns zero results", () => {
    const prefs: UserPreferences = {
      bodyShape: "inverted-triangle",
      concerns: ["shoulders"],
      goals: ["enhance"],
      fitPreference: "oversized",
    };
    const results = rankProducts(products, prefs);
    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("results are in descending score order", () => {
    const prefs: UserPreferences = {
      bodyShape: "hourglass",
      concerns: ["midsection", "hips"],
      goals: ["define", "enhance"],
      fitPreference: "fitted",
    };
    const results = rankProducts(products, prefs);
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
    }
  });

  it("returns at most topN products", () => {
    const prefs: UserPreferences = {
      bodyShape: "apple",
      concerns: ["midsection"],
      goals: ["smooth"],
      fitPreference: "relaxed",
    };
    expect(rankProducts(products, prefs, 5).length).toBeLessThanOrEqual(5);
    expect(rankProducts(products, prefs, 1).length).toBe(1);
  });
});

describe("fitProfiles - deterministic naming", () => {
  it("generates consistent name from same inputs", () => {
    const name1 = generateProfileName("smooth", "relaxed");
    const name2 = generateProfileName("smooth", "relaxed");
    expect(name1).toBe(name2);
    expect(name1).toBe("The Smooth Drape");
  });

  it("generates different names for different inputs", () => {
    const a = generateProfileName("define", "fitted");
    const b = generateProfileName("balance", "structured");
    expect(a).not.toBe(b);
    expect(a).toBe("The Defined Sculpt");
    expect(b).toBe("The Balanced Contour");
  });

  it("covers all goal + fit combinations without error", () => {
    const goals = ["smooth", "define", "balance", "lengthen", "enhance", "skim", "structure"] as const;
    const fits = ["fitted", "structured", "relaxed", "oversized"] as const;
    for (const g of goals) {
      for (const f of fits) {
        const name = generateProfileName(g, f);
        expect(name).toMatch(/^The \w+ \w+$/);
      }
    }
  });
});
