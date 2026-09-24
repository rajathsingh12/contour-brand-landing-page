/**
 * Design tokens for Contour brand
 * Black + warm neutrals with muted accents only
 * All colours named, saturation ≤ 40%
 */

export const colors = {
  // Core palette
  black: "#000000",
  ivory: "#faf8f6",
  charcoal: "#2a2a2a",
  warmWhite: "#ffffff",

  // Warm neutrals
  taupe: "#9b8b7e",
  stone: "#b5a89a",
  cream: "#f5f0eb",

  // Muted accents (saturation ≤ 40%)
  burgundy: "#6b2139",
  deepNavy: "#1a2845",
  dustyRose: "#c4989b",
  softOlive: "#898b75",

  // Extended neutrals for UI
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

export const spacing = {
  0: "0",
  px: "1px",
  0.5: "0.125rem",   // 2px
  1: "0.25rem",      // 4px
  1.5: "0.375rem",   // 6px
  2: "0.5rem",       // 8px
  2.5: "0.625rem",   // 10px
  3: "0.75rem",      // 12px
  3.5: "0.875rem",   // 14px
  4: "1rem",         // 16px
  5: "1.25rem",      // 20px
  6: "1.5rem",       // 24px
  7: "1.75rem",      // 28px
  8: "2rem",         // 32px
  9: "2.25rem",      // 36px
  10: "2.5rem",      // 40px
  11: "2.75rem",     // 44px
  12: "3rem",        // 48px
  14: "3.5rem",      // 56px
  16: "4rem",        // 64px
  20: "5rem",        // 80px
  24: "6rem",        // 96px
  28: "7rem",        // 112px
  32: "8rem",        // 128px
  36: "9rem",        // 144px
  40: "10rem",       // 160px
  44: "11rem",       // 176px
  48: "12rem",       // 192px
  52: "13rem",       // 208px
  56: "14rem",       // 224px
  60: "15rem",       // 240px
  64: "16rem",       // 256px
  72: "18rem",       // 288px
  80: "20rem",       // 320px
  96: "24rem",       // 384px
} as const;

export const motion = {
  // Duration
  duration: {
    fast: "150ms",
    normal: "250ms",
    slow: "400ms",
  },

  // Easing
  ease: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

export const typography = {
  // Font families (via next/font)
  fontFamily: {
    display: "var(--font-fraunces)",
    body: "var(--font-inter)",
  },

  // Type scale
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }],      // 12px
    sm: ["0.875rem", { lineHeight: "1.25rem" }],  // 14px
    base: ["1rem", { lineHeight: "1.5rem" }],     // 16px
    lg: ["1.125rem", { lineHeight: "1.75rem" }],  // 18px
    xl: ["1.25rem", { lineHeight: "1.75rem" }],   // 20px
    "2xl": ["1.5rem", { lineHeight: "2rem" }],    // 24px
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],   // 36px
    "5xl": ["3rem", { lineHeight: "1" }],           // 48px
    "6xl": ["3.75rem", { lineHeight: "1" }],        // 60px
    "7xl": ["4.5rem", { lineHeight: "1" }],         // 72px
    "8xl": ["6rem", { lineHeight: "1" }],           // 96px
    "9xl": ["8rem", { lineHeight: "1" }],           // 128px
  },

  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;
