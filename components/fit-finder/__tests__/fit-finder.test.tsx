import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import axe from "axe-core";
import { FitFinder } from "@/components/fit-finder";

afterEach(cleanup);

// Page-level rules (contrast, single-h1, landmark region) are the page's job and
// are asserted by the evidence harness, not this component unit.
const AXE_OPTS = {
  rules: {
    "color-contrast": { enabled: false },
    "page-has-heading-one": { enabled: false },
    region: { enabled: false },
  },
} as const;

describe("FitFinder", () => {
  it("offers the five concerns and prompts before any selection", () => {
    render(<FitFinder />);
    for (const label of ["ARMS", "BUST", "TUMMY", "WAIST", "HIPS & THIGHS"]) {
      expect(screen.getByRole("button", { name: label })).not.toBeNull();
    }
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });

  it("recommends matching dresses via the shared grid once a concern is chosen", () => {
    render(<FitFinder />);
    fireEvent.click(screen.getByRole("button", { name: "ARMS" }));
    const hrefs = screen.getAllByRole("link").map((l) => l.getAttribute("href"));
    expect(hrefs).toEqual(["/products/a1", "/products/a3", "/products/a2"]);
  });

  it("toggles a concern back off, returning to the prompt", () => {
    render(<FitFinder />);
    const arms = screen.getByRole("button", { name: "ARMS" });
    fireEvent.click(arms);
    expect(screen.getAllByRole("link").length).toBeGreaterThan(0);
    fireEvent.click(arms);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });

  it("never calls itself AI, never restricts, never says plus-size", () => {
    const { container } = render(<FitFinder />);
    fireEvent.click(screen.getByRole("button", { name: "WAIST" }));
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/\bAI\b/);
    expect(text).not.toMatch(/can'?t wear|cannot wear|plus[-\s]?size/i);
  });

  it("is axe-clean before and after selecting", async () => {
    const { container } = render(<FitFinder />);
    let results = await axe.run(container, AXE_OPTS);
    expect(results.violations.map((v) => v.id)).toEqual([]);
    fireEvent.click(screen.getByRole("button", { name: "BUST" }));
    results = await axe.run(container, AXE_OPTS);
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
