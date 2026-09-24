/**
 * Animation Configuration & Variants
 * Reusable animation definitions for Contour Brand
 */

import { Variants, Transition } from "framer-motion";

// ── Duration & Easing ──
// All durations ≤ 400ms per the design-system motion constraint (ticket 02).
export const duration = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.4,
};

export const easing = {
  easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeInOut: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  gentle: { type: "spring" as const, stiffness: 100, damping: 20 },
};

// ── Base Transitions ──
export const transition = {
  fast: { duration: duration.fast, ease: easing.easeOut } as Transition,
  normal: { duration: duration.normal, ease: easing.easeOut } as Transition,
  slow: { duration: duration.slow, ease: easing.easeOut } as Transition,
  spring: easing.spring as Transition,
  gentle: easing.gentle as Transition,
};

// ── Fade Variants ──
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transition.normal,
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.normal,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.normal,
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transition.normal,
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transition.normal,
  },
};

// ── Scale Variants ──
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transition.spring,
  },
};

export const scaleInSubtle: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transition.normal,
  },
};

// ── Stagger Containers ──
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// ── Hero Specific ──
export const heroTitle: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.easeOut,
    },
  },
};

export const heroSubtitle: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.easeOut,
      delay: 0.2,
    },
  },
};

export const heroCTA: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ...transition.spring,
      delay: 0.4,
    },
  },
};

// ── Product Card Variants ──
export const productCard: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transition.normal,
  },
  hover: {
    y: -8,
    transition: transition.fast,
  },
};

export const productImage: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: duration.slow, ease: easing.easeOut },
  },
};

// ── Button Variants ──
export const buttonHover: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: transition.fast,
  },
  tap: {
    scale: 0.98,
    transition: transition.fast,
  },
};

export const buttonPrimary: Variants = {
  rest: { scale: 1, boxShadow: "0 0 0 rgba(0, 0, 0, 0)" },
  hover: {
    scale: 1.02,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: transition.fast,
  },
  tap: {
    scale: 0.98,
    transition: transition.fast,
  },
};

// ── Badge Variants ──
export const badge: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transition.spring,
  },
  hover: {
    scale: 1.05,
    transition: transition.fast,
  },
};

// ── Section Reveal ──
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.easeOut,
    },
  },
};

// ── Card Grid Stagger ──
export const cardGrid: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// ── Navigation ──
export const navDropdown: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: { duration: duration.fast },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easing.easeOut,
    },
  },
};

export const mobileMenu: Variants = {
  hidden: {
    opacity: 0,
    x: "100%",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.normal,
      ease: easing.easeOut,
    },
  },
};

// ── Fit Finder Steps ──
export const fitFinderStep: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transition.normal,
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: transition.fast,
  },
};

export const fitFinderCard: Variants = {
  unselected: {
    scale: 1,
    borderColor: "var(--c-border)",
  },
  selected: {
    scale: 1.02,
    borderColor: "var(--c-accent)",
    transition: transition.spring,
  },
  hover: {
    scale: 1.01,
    transition: transition.fast,
  },
};

// ── Loading States ──
export const spinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ── Utility: Viewport Defaults ──
export const viewportDefaults = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -100px 0px",
};
