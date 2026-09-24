import type { Dress } from "@/data/dresses";
import { ProductCard } from "./ProductCard";

export interface CollectionGridProps {
  dresses: Dress[];
  priorityCount?: number;
  headingLevel?: 2 | 3;
}

// Editorial product grid reused by /shop, /shop-by-fit/[category], the homepage,
// PDP recommendations and Fit Finder results. priorityCount marks the first N
// images as LCP-priority for above-the-fold grids; headingLevel is forwarded to
// each card so names stay subordinate to the surrounding heading.
export function CollectionGrid({ dresses, priorityCount = 0, headingLevel }: CollectionGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
      {dresses.map((dress, i) => (
        <li key={dress.id}>
          <ProductCard dress={dress} priority={i < priorityCount} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
