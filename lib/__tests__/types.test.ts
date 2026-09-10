import { describe, it, expect } from "vitest";
import type { FitObjective } from "@/lib/types";

describe("types", () => {
  it("FitObjective values are valid strings", () => {
    const tags: FitObjective[] = ["smooth", "define", "balance", "lengthen", "enhance", "skim", "structure"];
    expect(tags).toHaveLength(7);
  });
});
