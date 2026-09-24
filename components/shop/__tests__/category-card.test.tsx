import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import axe from "axe-core";
import { CategoryCard } from "@/components/shop";
import { copy } from "@/data/copy";

afterEach(cleanup);

const AXE_OPTS = {
  rules: {
    "color-contrast": { enabled: false },
    "page-has-heading-one": { enabled: false },
    region: { enabled: false },
  },
} as const;

describe("CategoryCard", () => {
  it("shows the full label and the verbatim tagline", () => {
    render(<CategoryCard category="HIPS_THIGHS" />);
    expect(screen.getByRole("heading", { name: "HIPS & THIGHS" })).not.toBeNull();
    expect(screen.getByText(copy.shopByFit.HIPS_THIGHS)).not.toBeNull();
  });

  it("links to the slugged category listing", () => {
    render(<CategoryCard category="HIPS_THIGHS" />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/shop-by-fit/hips-thighs");
  });

  it("renders the label as h2 by default (heading order under the page h1)", () => {
    render(<CategoryCard category="ARMS" />);
    expect(screen.getByRole("heading", { name: "ARMS" }).tagName).toBe("H2");
  });

  it("is axe-clean", async () => {
    const { container } = render(<CategoryCard category="ARMS" />);
    const results = await axe.run(container, AXE_OPTS);
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
