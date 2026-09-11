"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, THEMES } from "@/lib/use-theme";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change theme"
        className="p-2 hover:bg-c-accent-light rounded-md transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="5" cy="5" r="3" fill="#6b2139" />
          <circle cx="13" cy="5" r="3" fill="#4a6741" />
          <circle cx="5" cy="13" r="3" fill="#2c3e6b" />
          <circle cx="13" cy="13" r="3" fill="#b0582a" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-c-surface border border-c-border rounded-lg shadow-lg p-2 flex gap-2 z-50">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTheme(t.id); setOpen(false); }}
              aria-label={t.label}
              className={`w-7 h-7 rounded-full border-2 transition-transform ${
                theme === t.id ? "border-c-text scale-110" : "border-c-border hover:scale-105"
              }`}
              style={{ backgroundColor: t.swatch }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
