"use client";

import { useState, useCallback } from "react";

export type Theme = "burgundy" | "sage" | "midnight" | "ember";

export const THEMES: { id: Theme; label: string; swatch: string }[] = [
  { id: "burgundy", label: "Burgundy", swatch: "#6b2139" },
  { id: "sage", label: "Sage", swatch: "#4a6741" },
  { id: "midnight", label: "Midnight", swatch: "#2c3e6b" },
  { id: "ember", label: "Ember", swatch: "#b0582a" },
];

function getInitialTheme(): Theme {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-theme") as Theme | null;
    if (attr && THEMES.some((t) => t.id === attr)) return attr;
  }
  return "burgundy";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("contour-theme", t);
  }, []);

  return { theme, setTheme };
}
