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

export function SilhouetteBadge({ tag }: { tag: FitObjective }) {
  return (
    <span className="inline-block px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase bg-c-badge-bg text-c-badge-text rounded-full">
      {LABELS[tag]}
    </span>
  );
}
