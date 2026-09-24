import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import axe from "axe-core";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

afterEach(cleanup);

// Document-level rules (lang, title, single-main, h1) belong to the full page and
// are covered by the evidence harness; here we gate the shell's own a11y —
// unique/labelled landmarks, accessible names, valid aria. color-contrast needs
// real layout jsdom can't provide.
const AXE_OPTS = {
  rules: {
    "color-contrast": { enabled: false },
    "html-has-lang": { enabled: false },
    "html-lang-valid": { enabled: false },
    "document-title": { enabled: false },
    "page-has-heading-one": { enabled: false },
  },
} as const;

describe("site shell", () => {
  it("renders axe-clean with unique, labelled landmarks", async () => {
    const { container } = render(
      <>
        <Header />
        <main>content</main>
        <Footer />
      </>,
    );
    const results = await axe.run(container, AXE_OPTS);
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });

  it("cart affordance opens the drawer and Escape closes it", async () => {
    render(<Header />);
    const cartBtn = screen.getByRole("button", { name: /cart/i });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(cartBtn.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(cartBtn);
    const dialog = await screen.findByRole("dialog", { name: /bag/i });
    expect(dialog).not.toBeNull();
    expect(cartBtn.getAttribute("aria-expanded")).toBe("true");

    // Tab is trapped within the drawer (aria-modal contract).
    const buttons = within(dialog).getAllByRole("button");
    const firstBtn = buttons[0];
    const lastBtn = buttons[buttons.length - 1];
    lastBtn.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(firstBtn);

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(cartBtn.getAttribute("aria-expanded")).toBe("false"));
  });
});
