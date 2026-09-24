import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import axe from "axe-core";
import AboutPage from "@/app/about/page";
import OurApproachPage from "@/app/our-approach/page";
import SizeGuidePage from "@/app/size-guide/page";
import { copy } from "@/data/copy";

afterEach(cleanup);

// Document-level rules (landmarks, single-h1) belong to the full page shell and
// are covered by the evidence harness; here the page bodies render outside <main>
// and color-contrast needs real layout jsdom can't provide.
const AXE_OPTS = {
  rules: {
    "color-contrast": { enabled: false },
    region: { enabled: false },
    "page-has-heading-one": { enabled: false },
  },
} as const;

const FORBIDDEN = /can'?t wear|cannot wear|plus[-\s]?size/i;

describe("/about", () => {
  it("renders the WHY CONTOUR? story from keyed copy under a single h1", () => {
    render(<AboutPage />);
    const { headline, body } = copy.home.about;
    expect(screen.getByRole("heading", { level: 1, name: headline })).not.toBeNull();
    expect(screen.getByText(body[0])).not.toBeNull();
    expect(screen.getByText(body[body.length - 1])).not.toBeNull();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("never says 'plus-size' or restricts what she can wear", () => {
    const { container } = render(<AboutPage />);
    expect(container.textContent ?? "").not.toMatch(FORBIDDEN);
  });

  it("is axe-clean", async () => {
    const { container } = render(<AboutPage />);
    const results = await axe.run(container, AXE_OPTS);
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});

describe("/our-approach", () => {
  it("renders the design philosophy from keyed copy under a single h1", () => {
    render(<OurApproachPage />);
    const { headline, body } = copy.home.thoughtThrough;
    expect(screen.getByRole("heading", { level: 1, name: headline })).not.toBeNull();
    expect(screen.getByText(body[0])).not.toBeNull();
    expect(screen.getByText(body[body.length - 1])).not.toBeNull();
  });

  it("never says 'plus-size' or restricts what she can wear", () => {
    const { container } = render(<OurApproachPage />);
    expect(container.textContent ?? "").not.toMatch(FORBIDDEN);
  });

  it("is axe-clean", async () => {
    const { container } = render(<OurApproachPage />);
    const results = await axe.run(container, AXE_OPTS);
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});

describe("/size-guide", () => {
  it("states L–4XL guidance and the same-price-across-sizes message", () => {
    render(<SizeGuidePage />);
    expect(screen.getByRole("heading", { level: 1 })).not.toBeNull();
    expect(screen.getByText(copy.home.sizePrice.body)).not.toBeNull();
    for (const size of ["L", "XL", "2XL", "3XL", "4XL"]) {
      expect(screen.getAllByText(size).length).toBeGreaterThan(0);
    }
  });

  it("never says 'plus-size' or restricts what she can wear", () => {
    const { container } = render(<SizeGuidePage />);
    expect(container.textContent ?? "").not.toMatch(FORBIDDEN);
  });

  it("is axe-clean", async () => {
    const { container } = render(<SizeGuidePage />);
    const results = await axe.run(container, AXE_OPTS);
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
