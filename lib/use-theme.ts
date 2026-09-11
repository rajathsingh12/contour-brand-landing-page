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

export type Mode = "light" | "dark";

function getInitialMode(): Mode {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-mode") === "dark" ? "dark" : "light";
  }
  return "light";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [mode, setModeState] = useState<Mode>(getInitialMode);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("contour-theme", t);
  }, []);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    if (m === "dark") {
      document.documentElement.setAttribute("data-mode", "dark");
    } else {
      document.documentElement.removeAttribute("data-mode");
    }
    localStorage.setItem("contour-mode", m);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode, setMode]);

  return { theme, setTheme, mode, setMode, toggleMode };
}
