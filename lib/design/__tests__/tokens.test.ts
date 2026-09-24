import { describe, it, expect } from "vitest";
import { colors, motion } from "../tokens";

// HSL saturation, 0..1
function saturation(hex: string): number {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === min) return 0;
  const d = max - min;
  const l = (max + min) / 2;
  return l > 0.5 ? d / (2 - max - min) : d / (max + min);
}

describe("design colour tokens", () => {
  it("every token is a valid 6-digit hex", () => {
    for (const [name, hex] of Object.entries(colors)) {
      expect(hex, name).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  // Hard constraint (ticket 02): muted palette only, saturation ≤ 40%.
  it("every token has HSL saturation ≤ 40%", () => {
    for (const [name, hex] of Object.entries(colors)) {
      expect(saturation(hex), `${name} ${hex}`).toBeLessThanOrEqual(0.4);
    }
  });

  // Ticket checkbox 1: cover every colour family named in AGENTS.md "Colour direction".
  it("covers every approved colour family in the brief", () => {
    const required = [
      "black", "charcoal", "espresso", "chocolate", "taupe", "stone", "cream",
      "deepNavy", "burgundy", "wine", "dustyRose", "mutedPink", "powderPink",
      "mutedMauve", "dustyBlue", "slateBlue", "mutedLavender", "mutedSage", "softOlive",
    ];
    for (const family of required) {
      expect(colors, family).toHaveProperty(family);
    }
  });

  // Hard constraint (ticket 02): motion ≤ 400ms.
  it("keeps every motion duration within the 400ms cap", () => {
    for (const [name, ms] of Object.entries(motion.duration)) {
      expect(ms, name).toBeLessThanOrEqual(400);
    }
  });
});
