// Named colour tokens for the Contour palette — black + warm neutrals with muted
// accents only. Every value is HSL saturation ≤ 40% (guarded by tokens.test.ts).
//
// This is the palette source of truth. app/globals.css mirrors these into the
// Tailwind v4 `@theme` so components use classes, never raw hex — keep the two
// in sync. Type scale + spacing come from Tailwind defaults; framer-motion
// variants live in lib/animations.ts.

export const colors = {
  // Core
  black: "#000000",
  charcoal: "#2a2a2a",
  ivory: "#faf8f6",
  warmWhite: "#ffffff",

  // Warm neutrals
  taupe: "#9b8b7e",
  stone: "#b5a89a",
  cream: "#f5f0eb",

  // Warm darks
  espresso: "#3c2c20",
  chocolate: "#593f2c",

  // Muted accents
  burgundy: "#612e3b",
  wine: "#66333c",
  deepNavy: "#223049",
  dustyBlue: "#708ca9",
  slateBlue: "#5c6f8a",
  dustyRose: "#c4989b",
  mutedPink: "#cca4aa",
  powderPink: "#e6d1d4",
  mutedMauve: "#a78194",
  mutedLavender: "#ad9bbf",
  mutedSage: "#8fae8f",
  softOlive: "#898b75",

  // Neutral ramp for UI (near-zero saturation)
  gray50: "#f9f9f9",
  gray100: "#ececec",
  gray200: "#d9d9d9",
  gray300: "#b3b3b3",
  gray400: "#8c8c8c",
  gray500: "#666666",
  gray600: "#4d4d4d",
  gray700: "#333333",
  gray800: "#1a1a1a",
  gray900: "#0d0d0d",
} as const;

// Motion spec — durations in ms, all ≤ 400ms, ease-out (ticket 02 hard
// constraint, guarded by tokens.test.ts). framer-motion variants: lib/animations.ts.
export const motion = {
  duration: { fast: 150, normal: 250, slow: 400 },
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
} as const;
