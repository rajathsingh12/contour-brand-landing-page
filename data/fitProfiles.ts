import type { FitObjective, FitPreference } from "@/lib/types";

const GOAL_ADJECTIVES: Record<FitObjective, string> = {
  smooth: "Smooth",
  define: "Defined",
  balance: "Balanced",
  lengthen: "Lengthened",
  enhance: "Enhanced",
  skim: "Effortless",
  structure: "Structured",
};

const FIT_NOUNS: Record<FitPreference, string> = {
  fitted: "Sculpt",
  structured: "Contour",
  relaxed: "Drape",
  oversized: "Flow",
};

export function generateProfileName(
  primaryGoal: FitObjective,
  fitPreference: FitPreference,
): string {
  return `The ${GOAL_ADJECTIVES[primaryGoal]} ${FIT_NOUNS[fitPreference]}`;
}
