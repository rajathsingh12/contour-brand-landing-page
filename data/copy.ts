// Keyed, verbatim copy blocks for the Contour site — the single source every page reads from.
// Customer-facing strings only; no "plus-size" anywhere, and the Fit Finder is never called "AI".

import type { FitCategory } from "@/data/dresses";

export const copy = {
  brand: {
    name: "CONTOUR",
    primaryLine: "SCULPTED BY DESIGN.",
    supportingProposition: "Dresses designed around your proportions.",
    philosophy: "Not sized up. Thought through.",
    statement: ["FIVE FIT CONCERNS.", "FIFTEEN DRESSES.", "DESIGNED FOR REAL BODIES."],
    lockup: "CONTOUR · DRESSES DESIGNED AROUND YOU · SIZES L–4XL",
  },

  nav: {
    brand: "CONTOUR",
    primary: ["SHOP", "SHOP BY FIT", "FIT FINDER", "OUR APPROACH", "SIZE GUIDE", "ABOUT"],
    utility: { search: "SEARCH", account: "ACCOUNT", cart: "CART" },
  },

  hero: {
    headline: "SCULPTED BY DESIGN.",
    subheading: "Sophisticated dresses designed around your proportions.",
    ctaPrimary: "SHOP THE COLLECTION",
    ctaSecondary: "FIND YOUR FIT",
  },

  home: {
    // Section 2
    designedDifferently: {
      headline: "DRESSES DESIGNED DIFFERENTLY.",
      body: "A fuller body isn't simply a larger version of a smaller body. Contour approaches dress design differently—using proportion, structure, drape and silhouette to create dresses designed around the body wearing them.",
      display: "L–4XL · INDIA-FIRST · SAME PRICE ACROSS SIZES",
    },
    // Section 3
    shopByFit: {
      headline: "SHOP BY FIT",
    },
    // Section 4
    collection: {
      headline: "THE CONTOUR COLLECTION",
    },
    // Section 5
    thoughtThrough: {
      headline: "NOT SIZED UP. THOUGHT THROUGH.",
      body: [
        "A fuller body isn't simply a larger version of a smaller body.",
        "That's why Contour approaches dress design differently. Our silhouettes, proportions, construction and ease are considered around fuller busts, arms, abdomen, waist, hips and thighs.",
        "The result isn't a dress designed to hide you.",
        "It's a dress designed around you.",
      ],
    },
    // Section 6
    fitFinder: {
      headline: "FIND YOUR CONTOUR",
      subheading: "Tell us what you'd like your dress to fit better.",
      concernsLegend: "Select what you'd like your dress to fit better",
      prompt: "Select a fit concern to see the dresses designed around it.",
      resultsHeading: "Designed around you",
      empty: "No dresses match that combination just yet.",
    },
    // Section 7
    sizePrice: {
      headline: "YOUR SIZE. YOUR PRICE.",
      body: "Contour currently offers L–4XL, with the same price across every size.",
      cta: "VIEW SIZE GUIDE",
    },
    // Section 8
    about: {
      headline: "WHY CONTOUR?",
      body: [
        "Fashion has become very good at changing measurements.",
        "It hasn't always become better at understanding proportions.",
        "Contour was created around a simple idea: a well-designed dress should account for the body wearing it.",
        "We focus on silhouette, proportion, structure, drape and fit to create sophisticated dresses that contour rather than conceal.",
        "Starting with L–4XL, our first collection is designed around five fit considerations: arms, bust, tummy, waist, and hips & thighs.",
        "Good design doesn't ask your body to fit the dress.",
        "The dress should be designed around you.",
      ],
    },
  },

  // Verbatim Shop-by-Fit category taglines.
  shopByFit: {
    ARMS: "Elegant arm coverage for fuller upper arms.",
    BUST: "Considered necklines and fit for fuller busts.",
    TUMMY: "Clean, comfortable midsection.",
    WAIST: "Effortless waist definition without squeezing.",
    HIPS_THIGHS: "Comfortable lower-body ease where you need it.",
  } satisfies Record<FitCategory, string>,

  footer: {
    tagline: "Dresses designed around your proportions. Sizes L–4XL.",
    payment: {
      heading: "Payment",
      methods: "Prepaid and Cash on Delivery.",
    },
  },

  // Product detail page — shared, dress-agnostic labels and info blocks. The
  // per-dress fields (name, whyItWorks, fabric, care, modelSize) come from data/dresses.ts.
  product: {
    fitFocusLabel: "Designed for",
    priceNote: "One price across every size, L–4XL.",
    whyItWorksHeading: "Why It Works",
    detailsHeading: "Details",
    fabricLabel: "Fabric",
    careLabel: "Care",
    modelLabel: "Model wears",
    sizeLabel: "Select your size",
    sizeGuideLink: "View size guide",
    recommendedHeading: "You may also like",
    info: [
      { heading: "Shipping", body: "Dispatched within 2–3 working days, with free shipping across India on every order." },
      { heading: "Returns", body: "Easy 7-day returns and exchanges — the dress should be unworn with its tags intact." },
      { heading: "Payment", body: "Pay online in advance (prepaid) or choose Cash on Delivery at your door." },
    ],
    reviews: {
      heading: "Reviews",
      rating: 4.8,
      items: [
        { quote: "The fit is genuinely considered — it skims exactly where I'd want it to and still feels easy to move in.", author: "Aditi R." },
        { quote: "Beautiful fabric and the length is just right. I've reached for it every week since it arrived.", author: "Meera S." },
        { quote: "Elegant, comfortable, and it holds its shape all day. Ordered a second in another colour.", author: "Priya N." },
      ],
    },
  },
};
