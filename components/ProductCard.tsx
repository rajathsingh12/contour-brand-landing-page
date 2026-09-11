"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SilhouetteBadge } from "./SilhouetteBadge";
import type { Product } from "@/lib/types";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function ProductCard({ product }: { product: Product }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
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

  return (
    <Link href={`/products/${product.id}`} className="block">
      <motion.div
        initial={{ opacity: 1 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="bg-c-surface rounded-lg border border-c-border overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div className="aspect-[3/4] relative bg-c-bg overflow-hidden">
          {product.images[0] ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </motion.div>
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
          <motion.div
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
            className="mt-2 flex flex-wrap gap-1"
          >
            {product.fitObjectives.map((tag) => (
              <SilhouetteBadge key={tag} tag={tag} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
