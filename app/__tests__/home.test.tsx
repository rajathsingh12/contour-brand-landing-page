import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { copy } from "@/data/copy";
import { dresses } from "@/data/dresses";

afterEach(cleanup);

// The homepage renders customer-facing copy verbatim from data/copy.ts. These
// assertions guard the ticket-09 hard constraints (section order, the sanctioned
// brand statement, all 15 dresses, no "plus-size", Fit Finder never called "AI").
describe("HomePage", () => {
  it("has one h1 with the brand headline and the 7 section h2s in order", () => {
    render(<HomePage />);

    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toBe(copy.hero.headline);

    const h2s = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(h2s).toEqual([
      copy.home.designedDifferently.headline,
      copy.home.shopByFit.headline,
      copy.home.collection.headline,
      copy.home.thoughtThrough.headline,
      copy.home.fitFinder.headline,
      copy.home.sizePrice.headline,
      copy.home.about.headline,
    ]);
  });

  it("shows the sanctioned brand statement verbatim", () => {
    render(<HomePage />);
    for (const line of copy.brand.statement) {
      expect(screen.getByText(line)).not.toBeNull();
    }
  });

  it("renders all 15 dresses in the collection", () => {
    render(<HomePage />);
    for (const dress of dresses) {
      expect(screen.getByRole("heading", { name: dress.name })).not.toBeNull();
    }
  });

  it("never uses 'plus-size' and never calls the Fit Finder 'AI'", () => {
    render(<HomePage />);
    const text = document.body.textContent?.toLowerCase() ?? "";
    expect(text).not.toContain("plus-size");
    expect(text).not.toContain("plus size");
    expect(text).not.toContain("ai-powered");
    expect(text).not.toContain("powered by ai");
    // The Fit Finder section is titled by its brand name, not an "AI" label.
    expect(screen.getByRole("heading", { name: copy.home.fitFinder.headline })).not.toBeNull();
  });
});
