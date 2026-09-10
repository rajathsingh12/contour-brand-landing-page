import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FitFinderPage from "../page";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) =>
    <a href={href}>{children}</a>,
}));

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

describe("FitFinder page", () => {
  it("renders step 1 with size options", () => {
    render(<FitFinderPage />);
    expect(screen.getByText(/Step 1 of 5/i)).toBeDefined();
    expect(screen.getByText("XL")).toBeDefined();
    expect(screen.getByText("6XL")).toBeDefined();
  });

  it("Continue is disabled until a selection is made", () => {
    render(<FitFinderPage />);
    const btn = screen.getByRole("button", { name: /continue/i }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    fireEvent.click(screen.getByText("XL"));
    expect(btn.disabled).toBe(false);
  });

  it("advances through all 5 steps and shows results", () => {
    render(<FitFinderPage />);

    // Step 1: size
    fireEvent.click(screen.getByText("2XL"));
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    // Step 2: room preference (multi)
    expect(screen.getByText(/Step 2 of 5/i)).toBeDefined();
    fireEvent.click(screen.getByText("Stomach"));
    fireEvent.click(screen.getByText("Hips"));
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    // Step 3: outfit goal (multi)
    expect(screen.getByText(/Step 3 of 5/i)).toBeDefined();
    fireEvent.click(screen.getByText("Smooth"));
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    // Step 4: fit preference (single)
    expect(screen.getByText(/Step 4 of 5/i)).toBeDefined();
    fireEvent.click(screen.getByText("Relaxed"));
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    // Step 5: body shape (single)
    expect(screen.getByText(/Step 5 of 5/i)).toBeDefined();
    fireEvent.click(screen.getByText("Apple"));
    fireEvent.click(screen.getByRole("button", { name: /see my results/i }));

    // Results
    expect(screen.getByText("The Smooth Drape")).toBeDefined();
    expect(screen.getByText(/smoothed midsection/)).toBeDefined();
    expect(screen.getByText("Recommended For You")).toBeDefined();
    expect(screen.getByText(/styling recommendation/)).toBeDefined();
    expect(screen.getByRole("button", { name: /retake/i })).toBeDefined();
  });

  it("back button returns to previous step", () => {
    render(<FitFinderPage />);
    fireEvent.click(screen.getByText("XL"));
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    expect(screen.getByText(/Step 2 of 5/i)).toBeDefined();

    fireEvent.click(screen.getByText(/back/i));
    expect(screen.getByText(/Step 1 of 5/i)).toBeDefined();
  });

  it("retake resets to step 1", () => {
    render(<FitFinderPage />);
    // Fast-forward to results
    fireEvent.click(screen.getByText("XL"));
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    fireEvent.click(screen.getByText("Stomach"));
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    fireEvent.click(screen.getByText("Define"));
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    fireEvent.click(screen.getByText("Structured"));
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    fireEvent.click(screen.getByText("Hourglass"));
    fireEvent.click(screen.getByRole("button", { name: /see my results/i }));

    fireEvent.click(screen.getByRole("button", { name: /retake/i }));
    expect(screen.getByText(/Step 1 of 5/i)).toBeDefined();
  });

  it("no back button on step 1", () => {
    render(<FitFinderPage />);
    expect(screen.queryByText(/back/i)).toBeNull();
  });
});
