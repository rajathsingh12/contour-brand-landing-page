import type { Product, Size, FitObjective, Concern } from "./types";

export interface FilterParams {
  category?: string[];
  size?: string[];
  price?: string[];
  colour?: string[];
  occasion?: string[];
  fit?: string[];
  concern?: string[];
}

export function parseSearchParams(params: Record<string, string | string[] | undefined>): FilterParams {
  const toArray = (v: string | string[] | undefined): string[] => {
    if (!v) return [];
    if (Array.isArray(v)) return v;
    return [v];
  };
  return {
    category: toArray(params.category),
    size: toArray(params.size),
    price: toArray(params.price),
    colour: toArray(params.colour),
    occasion: toArray(params.occasion),
    fit: toArray(params.fit),
    concern: toArray(params.concern),
  };
}

function matchesPriceRange(price: number, range: string): boolean {
  const [min, max] = range.split("-").map(Number);
  return price >= min && price <= max;
}

function includes<T>(arr: readonly T[], value: unknown): value is T {
  return (arr as readonly unknown[]).includes(value);
}

export function filterProducts(products: Product[], filters: FilterParams): Product[] {
  return products.filter((p) => {
    if (filters.category?.length && !filters.category.includes(p.category)) return false;
    if (filters.size?.length && !filters.size.some((s) => includes(p.sizes, s))) return false;
    if (filters.price?.length && !filters.price.some((r) => matchesPriceRange(p.price, r))) return false;
    if (filters.colour?.length && !filters.colour.some((c) => p.colors.includes(c))) return false;
    if (filters.occasion?.length && !filters.occasion.some((o) => p.occasions.includes(o))) return false;
    if (filters.fit?.length && !filters.fit.some((f) => includes(p.fitObjectives, f))) return false;
    if (filters.concern?.length && !filters.concern.some((c) => includes(p.concernsAddressed, c))) return false;
    return true;
  });
}
