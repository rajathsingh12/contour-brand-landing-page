"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Size, BodyShape, Concern, FitObjective, FitPreference } from "@/lib/types";
import type { UserPreferences } from "@/lib/fit-engine";
import { rankProducts } from "@/lib/fit-engine";
import { generateProfileName } from "@/data/fitProfiles";
import { bodyShapes as bodyShapesData } from "@/data/bodyShapes";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { fitFinderStep, fitFinderCard, fadeInUp, cardGrid } from "@/lib/animations";

const SIZES: Size[] = ["XL", "2XL", "3XL", "4XL", "5XL", "6XL"];

const ROOM_OPTIONS: { value: Concern; label: string }[] = [
  { value: "bust", label: "Bust" },
  { value: "midsection", label: "Stomach" },
  { value: "hips", label: "Hips" },
  { value: "thighs", label: "Thighs" },
  { value: "upper_arm", label: "Arms" },
  { value: "overall", label: "Overall" },
];

const GOAL_OPTIONS: { value: FitObjective; label: string }[] = [
  { value: "define", label: "Define" },
  { value: "smooth", label: "Smooth" },
  { value: "balance", label: "Balance" },
  { value: "lengthen", label: "Lengthen" },
  { value: "enhance", label: "Enhance" },
  { value: "skim", label: "Skim" },
  { value: "structure", label: "Structure" },
];

const FIT_OPTIONS: { value: FitPreference; label: string }[] = [
  { value: "fitted", label: "Fitted" },
  { value: "structured", label: "Structured" },
  { value: "relaxed", label: "Relaxed" },
  { value: "oversized", label: "Oversized" },
];

const SHAPE_OPTIONS: { value: BodyShape | "not-sure"; label: string; description: string }[] = [
  ...bodyShapesData.map((bs) => ({
    value: bs.shape as BodyShape,
    label: bs.shape === "inverted-triangle" ? "Inverted Triangle" : bs.shape.charAt(0).toUpperCase() + bs.shape.slice(1),
    description: bs.description,
  })),
  { value: "not-sure", label: "Not Sure", description: "We’ll recommend across all shapes" },
];

const GOAL_LABEL: Record<FitObjective, string> = {
  define: "defined waist",
  smooth: "smoothed midsection",
  balance: "balanced proportions",
  lengthen: "lengthened lines",
  enhance: "enhanced emphasis",
  skim: "relaxed drape",
  structure: "added structure",
};

function SelectCard({
  label,
  description,
  selected,
  onClick,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={`text-left px-5 py-4 rounded-lg border transition-all ${
          selected
            ? "border-c-accent bg-c-accent-light ring-1 ring-c-accent"
            : "border-c-border bg-c-surface hover:border-c-accent/40"
        }`}
      >
        <span className="block font-heading text-base font-semibold">{label}</span>
        {description && (
          <span className="block mt-1 text-sm text-c-text-secondary">{description}</span>
        )}
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      initial="unselected"
      animate={selected ? "selected" : "unselected"}
      whileHover="hover"
      variants={fitFinderCard}
      className={`text-left px-5 py-4 rounded-lg border transition-colors ${
        selected
          ? "border-c-accent bg-c-accent-light ring-1 ring-c-accent"
          : "border-c-border bg-c-surface hover:border-c-accent/40"
      }`}
    >
      <span className="block font-heading text-base font-semibold">{label}</span>
      {description && (
        <span className="block mt-1 text-sm text-c-text-secondary">{description}</span>
      )}
    </motion.button>
  );
}

export default function FitFinderPage() {
  const [step, setStep] = useState(1);
  const [size, setSize] = useState<Size | null>(null);
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [goals, setGoals] = useState<FitObjective[]>([]);
  const [fitPref, setFitPref] = useState<FitPreference | null>(null);
  const [bodyShape, setBodyShape] = useState<BodyShape | "not-sure" | null>(null);

  const canAdvance =
    (step === 1 && size !== null) ||
    (step === 2 && concerns.length > 0) ||
    (step === 3 && goals.length > 0) ||
    (step === 4 && fitPref !== null) ||
    (step === 5 && bodyShape !== null);

  function toggleMulti<T>(list: T[], item: T): T[] {
    return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
  }

  function advance() {
    if (step < 5) setStep(step + 1);
    else setStep(6);
  }

  function reset() {
    setStep(1);
    setSize(null);
    setConcerns([]);
    setGoals([]);
    setFitPref(null);
    setBodyShape(null);
  }

  // Results
  const prefs: UserPreferences | null =
    fitPref && bodyShape && goals.length > 0
      ? { bodyShape, concerns, goals, fitPreference: fitPref }
      : null;

  const results = prefs ? rankProducts(products, prefs, 3) : [];
  const profileName = prefs ? generateProfileName(goals[0], prefs.fitPreference) : "";
  const preferenceSummary = prefs
    ? goals.map((g) => GOAL_LABEL[g] || g).join(" + ")
    : "";

  // Step 6 = results
  if (step === 6 && prefs) {
    return (
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-3xl mx-auto px-4 py-16 sm:py-24"
      >
        <motion.p variants={fadeInUp} className="text-sm uppercase tracking-widest text-c-accent mb-3">
          Your Fit Profile
        </motion.p>
        <motion.h1 variants={fadeInUp} className="font-heading text-4xl sm:text-5xl font-bold mb-4">
          {profileName}
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-lg text-c-text-secondary mb-10">
          You prefer: {preferenceSummary}
        </motion.p>

        <motion.h2 variants={fadeInUp} className="font-heading text-2xl font-semibold mb-6">
          Recommended For You
        </motion.h2>
        <motion.div
          variants={cardGrid}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
        >
          {results.map(({ product }) => (
            <motion.div key={product.id} variants={fadeInUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          variants={fadeInUp}
          type="button"
          onClick={reset}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-8 py-3 border border-c-accent text-c-accent text-sm uppercase tracking-wider rounded-full hover:bg-c-accent-light transition-colors"
        >
          Retake
        </motion.button>

        <motion.p variants={fadeInUp} className="mt-10 text-xs text-c-text-secondary">
          Your fit profile is a styling recommendation based on your preferences and proportions.
        </motion.p>
      </motion.section>
    );
  }

  const STEP_TITLES = [
    "",
    "What’s your usual size?",
    "Where do you prefer more room?",
    "What do you want your outfit to do?",
    "What’s your preferred fit?",
    "What’s your body shape?",
  ];

  return (
    <section className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
      <motion.p
        key={`step-${step}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm uppercase tracking-widest text-c-accent mb-2"
      >
        Step {step} of 5
      </motion.p>
      <motion.h1
        key={`title-${step}`}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="font-heading text-3xl sm:text-4xl font-bold mb-8"
      >
        {STEP_TITLES[step]}
      </motion.h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fitFinderStep}
        >
          {step === 1 && (
            <div className="grid grid-cols-3 gap-3">
              {SIZES.map((s) => (
                <SelectCard key={s} label={s} selected={size === s} onClick={() => setSize(s)} />
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ROOM_OPTIONS.map((o) => (
                <SelectCard
                  key={o.value}
                  label={o.label}
                  selected={concerns.includes(o.value)}
                  onClick={() => setConcerns(toggleMulti(concerns, o.value))}
                />
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {GOAL_OPTIONS.map((o) => (
                <SelectCard
                  key={o.value}
                  label={o.label}
                  selected={goals.includes(o.value)}
                  onClick={() => setGoals(toggleMulti(goals, o.value))}
                />
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="grid grid-cols-2 gap-3">
              {FIT_OPTIONS.map((o) => (
                <SelectCard
                  key={o.value}
                  label={o.label}
                  selected={fitPref === o.value}
                  onClick={() => setFitPref(o.value)}
                />
              ))}
            </div>
          )}

          {step === 5 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SHAPE_OPTIONS.map((o) => (
                <SelectCard
                  key={o.value}
                  label={o.label}
                  description={o.description}
                  selected={bodyShape === o.value}
                  onClick={() => setBodyShape(o.value)}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-10 flex items-center gap-4"
      >
        {step > 1 && (
          <motion.button
            type="button"
            onClick={() => setStep(step - 1)}
            whileHover={{ x: -2 }}
            className="text-sm text-c-text-secondary hover:text-c-text transition-colors"
          >
            &larr; Back
          </motion.button>
        )}
        <motion.button
          type="button"
          onClick={advance}
          disabled={!canAdvance}
          whileHover={{ scale: canAdvance ? 1.02 : 1 }}
          whileTap={{ scale: canAdvance ? 0.98 : 1 }}
          className="inline-flex items-center px-8 py-3 bg-c-accent text-white text-sm uppercase tracking-wider rounded-full hover:bg-c-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {step === 5 ? "See My Results" : "Continue"}
        </motion.button>
      </motion.div>
    </section>
  );
}
