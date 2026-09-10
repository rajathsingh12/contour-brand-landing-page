import Link from "next/link";
import type { FitObjective } from "@/lib/types";

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

  if (href) {
    return (
      <Link href={href} className={className}>
        {LABELS[tag]}
      </Link>
    );
  }

  return <span className={className}>{LABELS[tag]}</span>;
}
