export type Size = "XL" | "2XL" | "3XL" | "4XL" | "5XL" | "6XL";

export type BodyShape = "apple" | "pear" | "hourglass" | "rectangle" | "inverted-triangle";

export type FitObjective = "smooth" | "define" | "balance" | "lengthen" | "enhance" | "skim" | "structure";

export type Concern = "midsection" | "upper_arm" | "hips" | "thighs" | "shoulders" | "legs";

export type Category = "top" | "dress" | "trouser" | "coord" | "party";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  sizes: Size[];
  colors: string[];
  bodyShapes: BodyShape[];
  fitObjectives: FitObjective[];
  concernsAddressed: Concern[];
  fitType: string;
  fabric: string;
  stretchLevel: "none" | "low" | "medium" | "high";
  length: string;
  occasions: string[];
  styleTags: string[];
  images: string[];
  modelInfo: { size: string; height: string };
}
