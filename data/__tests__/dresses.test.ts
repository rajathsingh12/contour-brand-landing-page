import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { dresses, FIT_CATEGORIES, SIZES, PRICES, type FitCategory } from "@/data/dresses";
import { copy } from "@/data/copy";

const CANONICAL_IDS = [
  "a1", "a2", "a3",
  "b1", "b2", "b3",
  "t1", "t2", "t3",
  "w1", "w2", "w3",
  "h1", "h2", "h3",
];

describe("Contour collection — dress data model", () => {
  it("has exactly 15 dresses", () => {
    expect(dresses).toHaveLength(15);
  });

  it("covers the five fit categories, three dresses each", () => {
    expect(FIT_CATEGORIES).toEqual(["ARMS", "BUST", "TUMMY", "WAIST", "HIPS_THIGHS"]);
    for (const category of FIT_CATEGORIES) {
      const inCategory = dresses.filter((d) => d.fitCategory === category);
      expect(inCategory, `category ${category}`).toHaveLength(3);
    }
  });

  it("uses the canonical lowercased ids a1–h3, unique", () => {
    const ids = dresses.map((d) => d.id);
    expect([...ids].sort()).toEqual([...CANONICAL_IDS].sort());
    expect(new Set(ids).size).toBe(15);
  });

  it("prices every dress at one of ₹1,099 / ₹1,299 / ₹1,499 (single price, all sizes)", () => {
    expect(PRICES).toEqual([1099, 1299, 1499]);
    // Price invariant: Dress.price is a single scalar (type Price), so a per-size price
    // cannot even be expressed — one price necessarily applies to every size.
    for (const d of dresses) {
      expect(PRICES, `${d.id} price`).toContain(d.price);
    }
  });

  it("offers exactly sizes L–4XL on every dress", () => {
    expect(SIZES).toEqual(["L", "XL", "2XL", "3XL", "4XL"]);
    for (const d of dresses) {
      expect(d.sizes, `${d.id} sizes`).toEqual(SIZES);
    }
  });

  it("maps every id to an existing image crop under public/", () => {
    for (const d of dresses) {
      expect(d.image, `${d.id} image path`).toMatch(/^\/images\/dresses\/.+\.(jpe?g|png)$/);
      const abs = path.join(process.cwd(), "public", d.image);
      expect(fs.existsSync(abs), `missing crop file for ${d.id}: ${d.image}`).toBe(true);
    }
  });

  it("populates the required editorial fields on every dress", () => {
    for (const d of dresses) {
      for (const field of ["name", "colour", "silhouette", "cardCopy", "fabric", "care", "modelSize"] as const) {
        expect(d[field], `${d.id} ${field}`).toBeTruthy();
      }
      expect(d.whyItWorks.length, `${d.id} whyItWorks`).toBeGreaterThanOrEqual(3);
    }
  });
});

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

describe("customer-facing copy invariants", () => {
  const dressStrings = collectStrings(dresses);
  const copyStrings = collectStrings(copy);
  const allStrings = [...dressStrings, ...copyStrings];

  it("never uses the phrase 'plus-size'", () => {
    const offenders = allStrings.filter((s) => /plus[-\s]?size/i.test(s));
    expect(offenders).toEqual([]);
  });

  it("never calls the Fit Finder 'AI'", () => {
    const fitFinderStrings = collectStrings(copy.home.fitFinder);
    const offenders = fitFinderStrings.filter((s) => /\bA\.?I\.?\b/.test(s));
    expect(offenders).toEqual([]);
  });
});
