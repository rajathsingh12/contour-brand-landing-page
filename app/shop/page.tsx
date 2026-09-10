import { Suspense } from "react";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { filterProducts, parseSearchParams } from "@/lib/filter-products";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";

export const metadata: Metadata = {
  title: "Shop — Contour",
  description:
    "Browse the full Contour collection. Filter by fit objective, body consideration, category, size, and more. XL–6XL.",
};

function ShopGrid({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const filters = parseSearchParams(searchParams);
  const filtered = filterProducts(products, filters);

  return (
    <>
      <p className="text-sm text-c-text-secondary mb-6">
        {filtered.length} {filtered.length === 1 ? "product" : "products"}
      </p>
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-c-text-secondary mb-4">No products match your filters.</p>
          <a
            href="/shop"
            className="inline-flex items-center px-6 py-2.5 border border-c-accent text-c-accent text-sm uppercase tracking-wider rounded-full hover:bg-c-accent-light transition-colors"
          >
            Clear Filters
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight mb-10">
        Shop the Collection
      </h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-56 shrink-0">
          <Suspense>
            <ProductFilters />
          </Suspense>
        </div>
        <div className="flex-1">
          <ShopGrid searchParams={params} />
        </div>
      </div>
    </div>
  );
}
