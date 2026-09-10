import type { BodyShape, Concern, FitObjective, FitPreference, Product } from "@/lib/types";

export interface UserPreferences {
  bodyShape: BodyShape | "not-sure";
  concerns: Concern[];
  goals: FitObjective[];
  fitPreference: FitPreference;
}

export interface ScoredProduct {
  product: Product;
  score: number;
}

const WEIGHT_BODY_SHAPE = 30;
const WEIGHT_CONCERN = 30;
const WEIGHT_GOAL = 25;
const WEIGHT_FIT_PREFERENCE = 15;

const ALL_BODY_SHAPES: BodyShape[] = [
  "apple",
  "pear",
  "hourglass",
  "rectangle",
  "inverted-triangle",
];

const FIT_PREFERENCE_TO_FIT_TYPES: Record<FitPreference, string[]> = {
  fitted: ["structured-fitted", "wrap", "body-skimming-ruched", "high-rise-sculpted", "fitted-top-flared-skirt"],
  structured: ["structured", "structured-relaxed", "structured-matched", "structured-tailored", "structured-fitted", "mid-rise-straight", "high-rise-wide", "high-rise-flared"],
  relaxed: ["relaxed", "relaxed-draped", "relaxed-belted", "relaxed-matched", "fitted-top-flared-skirt"],
  oversized: ["relaxed", "relaxed-draped", "relaxed-matched", "high-rise-wide"],
};

function overlapRatio(productTags: readonly string[], userTags: readonly string[]): number {
  if (userTags.length === 0) return 0;
  const matched = userTags.filter((t) => productTags.includes(t)).length;
  return matched / userTags.length;
}

function scoreBodyShape(product: Product, bodyShape: BodyShape | "not-sure"): number {
  if (bodyShape === "not-sure") {
    const avg =
      ALL_BODY_SHAPES.reduce(
        (sum, shape) => sum + (product.bodyShapes.includes(shape) ? 1 : 0),
        0,
      ) / ALL_BODY_SHAPES.length;
    return avg * WEIGHT_BODY_SHAPE;
  }
  return product.bodyShapes.includes(bodyShape) ? WEIGHT_BODY_SHAPE : 0;
}

function scoreConcerns(product: Product, concerns: Concern[]): number {
  return overlapRatio(product.concernsAddressed, concerns) * WEIGHT_CONCERN;
}

function scoreGoals(product: Product, goals: FitObjective[]): number {
  return overlapRatio(product.fitObjectives, goals) * WEIGHT_GOAL;
}

function scoreFitPreference(product: Product, fitPreference: FitPreference): number {
  const matchTypes = FIT_PREFERENCE_TO_FIT_TYPES[fitPreference];
  return matchTypes.includes(product.fitType) ? WEIGHT_FIT_PREFERENCE : 0;
}

export function scoreProduct(product: Product, prefs: UserPreferences): number {
  return (
    scoreBodyShape(product, prefs.bodyShape) +
    scoreConcerns(product, prefs.concerns) +
    scoreGoals(product, prefs.goals) +
    scoreFitPreference(product, prefs.fitPreference)
  );
}

export function rankProducts(
  products: Product[],
  prefs: UserPreferences,
  topN = 3,
): ScoredProduct[] {
  return products
    .map((product) => ({ product, score: scoreProduct(product, prefs) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}
