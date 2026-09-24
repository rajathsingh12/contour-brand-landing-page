import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, screen, within } from "@testing-library/react";
import axe from "axe-core";
import { ProductCard, CollectionGrid } from "@/components/product";
import { dresses } from "@/data/dresses";

afterEach(cleanup);

// Page-level rules (contrast needs real layout; single-h1 belongs to the page)
// are asserted by the evidence harness, not this component unit.
const AXE_OPTS = {
  rules: {
    "color-contrast": { enabled: false },
    "page-has-heading-one": { enabled: false },
    region: { enabled: false },
  },
} as const;

const a1 = dresses.find((d) => d.id === "a1")!;

describe("ProductCard", () => {
  it("shows name, fit category, price and size range", () => {
    render(<ProductCard dress={a1} />);
    expect(screen.getByRole("heading", { name: a1.name })).not.toBeNull();
    expect(screen.getByText("ARMS")).not.toBeNull();
    expect(screen.getByText(/1,299/)).not.toBeNull();
    expect(screen.getByText("L–4XL")).not.toBeNull();
  });

  it("links the whole card to the PDP", () => {
    render(<ProductCard dress={a1} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute("href")).toBe("/products/a1");
  });

  it("renders exactly one image — the dress's own crop, no gallery", () => {
    render(<ProductCard dress={a1} />);
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(1);
    expect(imgs[0].getAttribute("alt")).toContain(a1.name);
  });

  it("renders the name as h2 by default, overridable to h3 (heading order)", () => {
    const { rerender } = render(<ProductCard dress={a1} />);
    expect(screen.getByRole("heading", { name: a1.name }).tagName).toBe("H2");
    rerender(<ProductCard dress={a1} headingLevel={3} />);
    expect(screen.getByRole("heading", { name: a1.name }).tagName).toBe("H3");
  });

  it("is axe-clean", async () => {
    const { container } = render(<ProductCard dress={a1} />);
    const results = await axe.run(container, AXE_OPTS);
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});

describe("CollectionGrid", () => {
  it("renders one linked card per dress", () => {
    const three = dresses.slice(0, 3);
    const { container } = render(<CollectionGrid dresses={three} />);
    const items = within(container).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.getAllByRole("img")).toHaveLength(3);
  });
});
