import { describe, it, expect } from "vitest";
import { recommend } from "@/lib/fit-finder";
import { dresses, type FitCategory } from "@/data/dresses";

const ALL_FIVE: FitCategory[] = ["ARMS", "BUST", "TUMMY", "WAIST", "HIPS_THIGHS"];

describe("recommend — deterministic fit-finder scoring", () => {
  it("returns nothing when no concern is selected", () => {
    expect(recommend([])).toEqual([]);
  });

  it("returns only dresses whose fit category was selected", () => {
    const arms = recommend(["ARMS"]);
    expect(arms.every((d) => d.fitCategory === "ARMS")).toBe(true);
    expect([...arms].map((d) => d.id).sort()).toEqual(["a1", "a2", "a3"]);
  });

  it("orders a single concern by price ascending, ties in catalogue order", () => {
    // a1 1299, a2 1499, a3 1299 → the two 1299s first in catalogue order, then 1499
    expect(recommend(["ARMS"]).map((d) => d.id)).toEqual(["a1", "a3", "a2"]);
  });

  it("merges multiple concerns, still price-then-catalogue ordered", () => {
    // ARMS + BUST → b2 1099; a1,a3,b1 1299; a2,b3 1499
    expect(recommend(["ARMS", "BUST"]).map((d) => d.id)).toEqual([
      "b2",
      "a1",
      "a3",
      "b1",
      "a2",
      "b3",
    ]);
  });

  it("returns all fifteen, price-sorted, when every concern is selected", () => {
    expect(recommend(ALL_FIVE).map((d) => d.id)).toEqual([
      "b2", "t3", "w1", // 1099
      "a1", "a3", "b1", "t2", "w3", "h1", "h3", // 1299
      "a2", "b3", "t1", "w2", "h2", // 1499
    ]);
    const prices = recommend(ALL_FIVE).map((d) => d.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it("is pure: same input yields an identical result each call", () => {
    expect(recommend(["WAIST"])).toEqual(recommend(["WAIST"]));
  });

  it("dedupes repeated concerns and is order-independent", () => {
    expect(recommend(["BUST", "BUST"])).toEqual(recommend(["BUST"]));
    expect(recommend(["ARMS", "BUST"])).toEqual(recommend(["BUST", "ARMS"]));
  });

  it("never mutates the source catalogue or the input array", () => {
    const before = dresses.map((d) => d.id);
    const input: FitCategory[] = ["HIPS_THIGHS", "ARMS"];
    recommend(input);
    expect(dresses.map((d) => d.id)).toEqual(before);
    expect(input).toEqual(["HIPS_THIGHS", "ARMS"]);
  });
});
