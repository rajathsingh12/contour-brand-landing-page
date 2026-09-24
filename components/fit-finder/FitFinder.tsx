"use client";

import { useState } from "react";
import { FIT_CATEGORIES, type FitCategory } from "@/data/dresses";
import { CATEGORY_LABELS } from "@/lib/shop/categories";
import { copy } from "@/data/copy";
import { recommend } from "@/lib/fit-finder";
import { Heading, Text } from "@/components/ui";
import { CollectionGrid } from "@/components/product";

const c = copy.home.fitFinder;

// Rule-based fit finder: toggle one or more concerns, see the dresses designed
// around them via the shared grid. Scoring is deterministic (see lib/fit-finder).
export function FitFinder() {
  const [selected, setSelected] = useState<FitCategory[]>([]);

  const toggle = (category: FitCategory) =>
    setSelected((prev) =>
      prev.includes(category) ? prev.filter((x) => x !== category) : [...prev, category],
    );

  const results = recommend(selected);

  return (
    <div>
      <fieldset>
        <legend className="text-xs uppercase tracking-widest text-gray-500">
          {c.concernsLegend}
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {FIT_CATEGORIES.map((category) => {
            const isSelected = selected.includes(category);
            return (
              <button
                key={category}
                type="button"
                onClick={() => toggle(category)}
                aria-pressed={isSelected}
                className={`border px-4 py-2 text-sm font-medium transition-colors duration-[250ms] ease-out ${
                  isSelected
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-black hover:border-gray-400"
                }`}
              >
                {CATEGORY_LABELS[category]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-10" aria-live="polite">
        {selected.length === 0 ? (
          <Text variant="secondary" size="sm">{c.prompt}</Text>
        ) : results.length === 0 ? (
          <Text variant="secondary" size="sm">{c.empty}</Text>
        ) : (
          <>
            <Heading as="h2" size="sm">{c.resultsHeading}</Heading>
            <div className="mt-6">
              <CollectionGrid dresses={results} headingLevel={3} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
