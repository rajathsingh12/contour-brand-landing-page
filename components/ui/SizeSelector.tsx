"use client";

import { useState } from "react";

type Size = "L" | "XL" | "2XL" | "3XL" | "4XL";

export interface SizeSelectorProps {
  value?: Size;
  onChange?: (size: Size) => void;
  className?: string;
}

const SIZES: Size[] = ["L", "XL", "2XL", "3XL", "4XL"];

export function SizeSelector({ value, onChange, className = "" }: SizeSelectorProps) {
  const [selected, setSelected] = useState<Size | undefined>(value);

  const handleSelect = (size: Size) => {
    setSelected(size);
    onChange?.(size);
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {SIZES.map((size) => {
        const isSelected = selected === size;
        return (
          <button
            key={size}
            type="button"
            onClick={() => handleSelect(size)}
            className={`
              px-4 py-2 min-w-[4rem] text-sm font-medium
              border transition-colors duration-[250ms] ease-out
              ${
                isSelected
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-black hover:border-gray-400"
              }
            `}
            aria-pressed={isSelected}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
