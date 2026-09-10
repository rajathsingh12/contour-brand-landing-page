"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { products } from "@/data/products";
import type { Category, FitObjective, Concern, Size } from "@/lib/types";

const CATEGORIES: { label: string; value: Category }[] = [
  { label: "Tops", value: "top" },
  { label: "Dresses", value: "dress" },
  { label: "Trousers", value: "trouser" },
  { label: "Co-ords", value: "coord" },
  { label: "Partywear", value: "party" },
];

const SIZES: Size[] = ["XL", "2XL", "3XL", "4XL", "5XL", "6XL"];

const PRICE_RANGES = [
  { label: "Under ₹800", value: "0-800" },
  { label: "₹800 – ₹1,000", value: "800-1000" },
  { label: "₹1,000 – ₹1,300", value: "1000-1300" },
  { label: "₹1,300+", value: "1300-9999" },
];

const OCCASIONS = ["casual", "work", "date-night", "party", "evening", "weekend", "brunch"];

const FIT_OBJECTIVES: { label: string; value: FitObjective }[] = [
  { label: "Smooth", value: "smooth" },
  { label: "Define", value: "define" },
  { label: "Balance", value: "balance" },
  { label: "Lengthen", value: "lengthen" },
  { label: "Enhance", value: "enhance" },
  { label: "Skim", value: "skim" },
  { label: "Structure", value: "structure" },
];

const CONCERNS: { label: string; value: Concern }[] = [
  { label: "Midsection", value: "midsection" },
  { label: "Arms", value: "upper_arm" },
  { label: "Hips", value: "hips" },
  { label: "Thighs", value: "thighs" },
  { label: "Shoulders", value: "shoulders" },
  { label: "Legs", value: "legs" },
];

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-c-border pb-4 mb-4">
      <h3 className="text-xs tracking-[0.15em] font-medium mb-3">{title}</h3>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <span
        className="w-4 h-4 border flex items-center justify-center transition-colors border-c-border group-hover:border-c-text peer-checked:bg-c-accent peer-checked:border-c-accent peer-focus-visible:ring-2 peer-focus-visible:ring-c-accent peer-focus-visible:ring-offset-1"
      >
        <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-sm text-c-text-secondary">{label}</span>
    </label>
  );
}

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const allColours = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      for (const c of p.colors) set.add(c);
    }
    return [...set].sort();
  }, []);

  const getValues = useCallback(
    (key: string): string[] => searchParams.getAll(key),
    [searchParams],
  );

  const toggleParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const existing = params.getAll(key);
      if (existing.includes(value)) {
        params.delete(key);
        existing.filter((v) => v !== value).forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
      router.push(`/shop?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const clearAll = useCallback(() => {
    router.push("/shop", { scroll: false });
  }, [router]);

  const hasFilters = searchParams.toString().length > 0;

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm tracking-[0.15em] font-medium">FILTERS</h2>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-c-text-secondary hover:text-c-text underline transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <FilterSection title="CATEGORY">
        {CATEGORIES.map((c) => (
          <FilterCheckbox
            key={c.value}
            label={c.label}
            checked={getValues("category").includes(c.value)}
            onChange={() => toggleParam("category", c.value)}
          />
        ))}
      </FilterSection>

      <FilterSection title="SIZE">
        {SIZES.map((s) => (
          <FilterCheckbox
            key={s}
            label={s}
            checked={getValues("size").includes(s)}
            onChange={() => toggleParam("size", s)}
          />
        ))}
      </FilterSection>

      <FilterSection title="PRICE">
        {PRICE_RANGES.map((p) => (
          <FilterCheckbox
            key={p.value}
            label={p.label}
            checked={getValues("price").includes(p.value)}
            onChange={() => toggleParam("price", p.value)}
          />
        ))}
      </FilterSection>

      <FilterSection title="COLOUR">
        {allColours.map((c) => (
          <FilterCheckbox
            key={c}
            label={c.charAt(0).toUpperCase() + c.slice(1).replace("-", " ")}
            checked={getValues("colour").includes(c)}
            onChange={() => toggleParam("colour", c)}
          />
        ))}
      </FilterSection>

      <FilterSection title="OCCASION">
        {OCCASIONS.map((o) => (
          <FilterCheckbox
            key={o}
            label={o.charAt(0).toUpperCase() + o.slice(1).replace("-", " ")}
            checked={getValues("occasion").includes(o)}
            onChange={() => toggleParam("occasion", o)}
          />
        ))}
      </FilterSection>

      <FilterSection title="FIT OBJECTIVE">
        {FIT_OBJECTIVES.map((f) => (
          <FilterCheckbox
            key={f.value}
            label={f.label}
            checked={getValues("fit").includes(f.value)}
            onChange={() => toggleParam("fit", f.value)}
          />
        ))}
      </FilterSection>

      <FilterSection title="BODY CONSIDERATION">
        {CONCERNS.map((c) => (
          <FilterCheckbox
            key={c.value}
            label={c.label}
            checked={getValues("concern").includes(c.value)}
            onChange={() => toggleParam("concern", c.value)}
          />
        ))}
      </FilterSection>
    </aside>
  );
}
