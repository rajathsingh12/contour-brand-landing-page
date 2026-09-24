import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, screen, within } from "@testing-library/react";
import axe from "axe-core";
import { ProductCard, CollectionGrid, ProductDetail, recommendedDresses } from "@/components/product";
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

describe("recommendedDresses", () => {
  it("is deterministic: same-category first, then catalogue order, current excluded", () => {
    expect(recommendedDresses(a1).map((d) => d.id)).toEqual(["a2", "a3", "b1"]);
  });

  it("never recommends the dress being viewed", () => {
    for (const d of dresses) {
      expect(recommendedDresses(d).map((x) => x.id)).not.toContain(d.id);
    }
  });
});

describe("ProductDetail", () => {
  it("renders the required fields in the brief", () => {
    render(<ProductDetail dress={a1} />);
    expect(screen.getByRole("heading", { level: 1, name: a1.name })).not.toBeNull();
    expect(screen.getByText(/Designed for:\s*ARMS/)).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Why It Works" })).not.toBeNull();
    expect(screen.getByText(a1.whyItWorks[0])).not.toBeNull();
    expect(screen.getAllByText(/1,299/).length).toBeGreaterThan(0);
    expect(screen.getByText(a1.fabric)).not.toBeNull();
    expect(screen.getByText(a1.care)).not.toBeNull();
    expect(screen.getByText(/Model wears 2XL/)).not.toBeNull();
    for (const label of ["Shipping", "Returns", "Payment"]) {
      expect(screen.getByText(label)).not.toBeNull();
    }
    expect(screen.getByRole("heading", { name: "Reviews" })).not.toBeNull();
  });

  it("offers the five sizes L–4XL and a size-guide link", () => {
    render(<ProductDetail dress={a1} />);
    for (const size of ["L", "XL", "2XL", "3XL", "4XL"]) {
      expect(screen.getByRole("button", { name: size })).not.toBeNull();
    }
    const guide = screen.getByRole("link", { name: /size guide/i });
    expect(guide.getAttribute("href")).toBe("/size-guide");
  });

  it("shows exactly one image of the dress itself — no gallery", () => {
    render(<ProductDetail dress={a1} />);
    const own = screen.getAllByRole("img").filter((img) => img.getAttribute("alt") === `${a1.name} — ${a1.colour}`);
    expect(own).toHaveLength(1);
  });

  it("links recommended dresses to their PDPs, reusing the grid", () => {
    render(<ProductDetail dress={a1} />);
    const hrefs = screen.getAllByRole("link").map((l) => l.getAttribute("href"));
    for (const id of ["a2", "a3", "b1"]) {
      expect(hrefs).toContain(`/products/${id}`);
    }
  });

  it("never restricts what she can wear, never says 'plus-size'", () => {
    const { container } = render(<ProductDetail dress={a1} />);
    expect(container.textContent ?? "").not.toMatch(/can'?t wear|cannot wear|plus[-\s]?size/i);
  });

  it("is axe-clean", async () => {
    const { container } = render(<ProductDetail dress={a1} />);
    const results = await axe.run(container, AXE_OPTS);
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});


