import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { bodyShapes } from "@/data/bodyShapes";
import { SilhouetteBadge } from "@/components/SilhouetteBadge";
import type { Concern, Size } from "@/lib/types";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: "Product Not Found — Contour" };
  return {
    title: `${product.name} — Contour`,
    description: product.whyWeDesignedIt,
  };
}

const ALL_SIZES: Size[] = ["XL", "2XL", "3XL", "4XL", "5XL", "6XL"];

const CONCERN_LABELS: Record<Concern, string> = {
  midsection: "Midsection",
  upper_arm: "Arms",
  hips: "Hips",
  thighs: "Thighs",
  shoulders: "Shoulders",
  legs: "Legs",
  bust: "Bust",
  overall: "Overall",
};

function shapeLabel(shape: string): string {
  return shape
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const suitedShapes = bodyShapes.filter((s) => product.bodyShapes.includes(s.shape));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Image */}
        <div className="lg:w-1/2">
          <div className="aspect-[3/4] bg-c-bg relative overflow-hidden rounded-lg">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-c-text-secondary text-sm">
                Image coming soon
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="lg:w-1/2">
          {/* Name + price */}
          <h1 className="font-heading text-3xl font-bold tracking-tight mb-1">{product.name}</h1>
          <p className="text-xl font-medium text-c-accent mb-6">
            &#8377;{product.price.toLocaleString("en-IN")}
          </p>

          {/* Silhouette tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {product.fitObjectives.map((obj) => (
              <SilhouetteBadge key={obj} tag={obj} />
            ))}
          </div>

          {/* Why we designed it */}
          <div className="mb-8">
            <h2 className="text-xs tracking-[0.15em] font-medium mb-2">WHY WE DESIGNED IT</h2>
            <p className="text-c-text-secondary leading-relaxed">{product.whyWeDesignedIt}</p>
          </div>

          {/* Best suited for */}
          <div className="mb-8">
            <h2 className="text-xs tracking-[0.15em] font-medium mb-2">BEST SUITED FOR</h2>
            <div className="space-y-1">
              {suitedShapes.length > 0 && (
                <p className="text-sm text-c-text-secondary">
                  <span className="text-c-text font-medium">Body shapes: </span>
                  {suitedShapes.map((s) => shapeLabel(s.shape)).join(", ")}
                </p>
              )}
              {product.concernsAddressed.length > 0 && (
                <p className="text-sm text-c-text-secondary">
                  <span className="text-c-text font-medium">Addresses: </span>
                  {product.concernsAddressed.map((c) => CONCERN_LABELS[c]).join(", ")}
                </p>
              )}
            </div>
            <p className="text-xs text-c-text-secondary mt-2 italic">
              Your fit profile is a styling recommendation based on your preferences and proportions.
            </p>
          </div>

          {/* Fit description */}
          <div className="mb-8">
            <h2 className="text-xs tracking-[0.15em] font-medium mb-2">FIT</h2>
            <p className="text-sm text-c-text-secondary">{product.fitDescription}</p>
          </div>

          {/* Fabric */}
          <div className="mb-8">
            <h2 className="text-xs tracking-[0.15em] font-medium mb-2">FABRIC</h2>
            <p className="text-sm text-c-text-secondary">{product.fabric}</p>
          </div>

          {/* Model info */}
          <div className="mb-8">
            <h2 className="text-xs tracking-[0.15em] font-medium mb-2">MODEL</h2>
            <p className="text-sm text-c-text-secondary">
              Wearing size {product.modelInfo.size} &middot; Height {product.modelInfo.height}
            </p>
          </div>

          {/* Size selector */}
          <div className="mb-8">
            <h2 className="text-xs tracking-[0.15em] font-medium mb-3">SIZE</h2>
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((size) => {
                const available = product.sizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    disabled={!available}
                    className={`min-w-[3.5rem] px-3 py-2 text-sm border rounded transition-colors ${
                      available
                        ? "border-c-border hover:border-c-accent cursor-pointer"
                        : "border-c-border/40 text-c-text-secondary/40 cursor-not-allowed"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fit Finder CTA */}
          <Link
            href="/fit-finder"
            className="inline-flex items-center px-6 py-3 border border-c-accent text-c-accent text-sm uppercase tracking-wider rounded-full hover:bg-c-accent-light transition-colors"
          >
            Not sure about your size? Find My Fit
          </Link>
        </div>
      </div>
    </div>
  );
}
