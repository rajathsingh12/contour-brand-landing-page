import Link from "next/link";
import Image from "next/image";
import { SilhouetteBadge } from "./SilhouetteBadge";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-c-surface rounded-lg border border-c-border overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-[3/4] relative bg-c-bg">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-c-text-secondary text-sm">
            Image coming soon
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading text-base font-semibold">{product.name}</h3>
        <p className="mt-1 text-sm font-medium text-c-accent">
          &#8377;{product.price.toLocaleString("en-IN")}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {product.fitObjectives.map((tag) => (
            <SilhouetteBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}
