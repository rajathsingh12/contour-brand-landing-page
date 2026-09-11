"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { FitObjective } from "@/lib/types";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const LABELS: Record<FitObjective, string> = {
  smooth: "SMOOTH",
  define: "DEFINE",
  balance: "BALANCE",
  lengthen: "LENGTHEN",
  enhance: "ENHANCE",
  skim: "SKIM",
  structure: "STRUCTURE",
};

const BASE_CLASS = "inline-block font-semibold tracking-wider uppercase bg-c-badge-bg text-c-badge-text rounded-full";

export function SilhouetteBadge({
  tag,
  href,
  size = "sm",
}: {
  tag: FitObjective;
  href?: string;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "md" ? "px-5 py-2 text-sm" : "px-2.5 py-0.5 text-xs";
  const className = `${BASE_CLASS} ${sizeClass}${
    href ? " hover:bg-c-accent-light transition-colors" : ""
  }`;
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    if (href) {
      return (
        <Link href={href} className={className}>
          {LABELS[tag]}
        </Link>
      );
    }
    return <span className={className}>{LABELS[tag]}</span>;
  }

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="inline-block"
      >
        <Link href={href} className={className}>
          {LABELS[tag]}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {LABELS[tag]}
    </motion.span>
  );
}
