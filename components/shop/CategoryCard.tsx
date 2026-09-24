import Link from "next/link";
import type { FitCategory } from "@/data/dresses";
import { CATEGORY_LABELS, categoryToSlug } from "@/lib/shop/categories";
import { copy } from "@/data/copy";
import { Text } from "@/components/ui";

export interface CategoryCardProps {
  category: FitCategory;
  headingLevel?: 2 | 3;
}

// One of the five fit-concern cards. Verbatim tagline from data/copy.ts; links
// to the filtered category listing. Reused by /shop-by-fit and the homepage —
// headingLevel keeps the label subordinate to the preceding heading.
export function CategoryCard({ category, headingLevel = 2 }: CategoryCardProps) {
  const label = CATEGORY_LABELS[category];
  const tagline = copy.shopByFit[category];
  const LabelTag = `h${headingLevel}` as "h2" | "h3";

  return (
    <Link
      href={`/shop-by-fit/${categoryToSlug(category)}`}
      className="group flex min-h-[12rem] flex-col justify-between border border-gray-200 bg-white p-6 transition-colors duration-[250ms] ease-out hover:border-black focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:p-8"
    >
      <LabelTag className="font-display text-2xl">{label}</LabelTag>
      <div>
        <Text variant="secondary" size="sm">{tagline}</Text>
        <span className="mt-6 inline-block text-xs uppercase tracking-widest text-black">
          Shop {label}
          <span aria-hidden="true" className="ml-1 inline-block transition-transform duration-[250ms] ease-out group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
