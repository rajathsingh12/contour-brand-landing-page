import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import axe from "axe-core";
import NotFound from "@/app/not-found";
import ErrorBoundary from "@/app/error";
import { copy } from "@/data/copy";

afterEach(cleanup);

// color-contrast / region / single-h1 belong to the full page shell and are
// covered by the evidence harness; these fallbacks render outside <main>.
const AXE_OPTS = {
  rules: {
    "color-contrast": { enabled: false },
    region: { enabled: false },
    "page-has-heading-one": { enabled: false },
  },
} as const;

const FORBIDDEN = /can'?t wear|cannot wear|plus[-\s]?size/i;

describe("not-found (quiet fallback for unknown dress/category)", () => {
  it("renders the keyed fallback with routes back into the site", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1, name: copy.notFound.heading })).not.toBeNull();
    expect(screen.getByText(copy.notFound.body)).not.toBeNull();
    expect(screen.getByRole("link", { name: copy.notFound.ctaHome }).getAttribute("href")).toBe("/");
    expect(screen.getByRole("link", { name: copy.notFound.ctaShop }).getAttribute("href")).toBe("/shop");
  });

  it("never says 'plus-size' or restricts what she can wear", () => {
    const { container } = render(<NotFound />);
    expect(container.textContent ?? "").not.toMatch(FORBIDDEN);
  });

  it("is axe-clean", async () => {
    const { container } = render(<NotFound />);
    const results = await axe.run(container, AXE_OPTS);
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});

describe("error boundary (quiet fallback for a thrown component)", () => {
  beforeEach(() => vi.spyOn(console, "error").mockImplementation(() => {}));
  afterEach(() => vi.restoreAllMocks());

  it("renders the keyed fallback, retries on demand, and links home", () => {
    const retry = vi.fn();
    render(<ErrorBoundary error={new Error("boom")} retry={retry} />);
    expect(screen.getByRole("heading", { level: 1, name: copy.error.heading })).not.toBeNull();
    expect(screen.getByText(copy.error.body)).not.toBeNull();
    screen.getByRole("button", { name: copy.error.retry }).click();
    expect(retry).toHaveBeenCalledOnce();
    expect(screen.getByRole("link", { name: copy.error.ctaHome }).getAttribute("href")).toBe("/");
  });

  it("never says 'plus-size' or restricts what she can wear", () => {
    const { container } = render(<ErrorBoundary error={new Error("boom")} retry={() => {}} />);
    expect(container.textContent ?? "").not.toMatch(FORBIDDEN);
  });

  it("is axe-clean", async () => {
    const { container } = render(<ErrorBoundary error={new Error("boom")} retry={() => {}} />);
    const results = await axe.run(container, AXE_OPTS);
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
