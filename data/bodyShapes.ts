import type { BodyShapeData } from "@/lib/types";

export const bodyShapes: BodyShapeData[] = [
  {
    shape: "apple",
    description: "More volume around midsection",
    recommendedObjectives: ["smooth", "define", "lengthen", "structure"],
    stylingTips: [
      "A-line silhouettes",
      "V-necklines",
      "Longer tops",
      "Structured shoulders",
      "Straight or wide-leg trousers",
      "Vertical details",
    ],
  },
  {
    shape: "pear",
    description: "More volume around hips and thighs",
    recommendedObjectives: ["balance", "structure", "enhance", "skim"],
    stylingTips: [
      "Structured tops",
      "Interesting necklines",
      "Shoulder detailing",
      "A-line skirts",
      "Darker lower silhouettes",
    ],
  },
  {
    shape: "hourglass",
    description: "Defined waist with balanced bust and hips",
    recommendedObjectives: ["define", "enhance", "smooth", "structure"],
    stylingTips: [
      "Wrap silhouettes",
      "Waist-defined dresses",
      "Fitted but structured pieces",
      "High-rise trousers",
    ],
  },
  {
    shape: "rectangle",
    description: "Less natural waist definition",
    recommendedObjectives: ["define", "enhance", "structure", "balance"],
    stylingTips: [
      "Belted styles",
      "Peplum shapes",
      "Waist seams",
      "Strategic colour blocking",
    ],
  },
  {
    shape: "inverted-triangle",
    description: "Broader shoulders relative to hips",
    recommendedObjectives: ["balance", "skim", "enhance", "lengthen"],
    stylingTips: [
      "Softer shoulders",
      "Wider-leg trousers",
      "A-line skirts",
      "Hip-enhancing silhouettes",
    ],
  },
];

export const bodyShapeMap = new Map(
  bodyShapes.map((bs) => [bs.shape, bs]),
);
