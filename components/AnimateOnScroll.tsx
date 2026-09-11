"use client";

/**
 * AnimateOnScroll - Wrapper component for scroll-triggered animations
 * Uses Intersection Observer via framer-motion's useInView
 */

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { viewportDefaults } from "@/lib/animations";

interface AnimateOnScrollProps {
  children: ReactNode;
  variant?: Variants;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
  as?: keyof typeof motion;
}

export function AnimateOnScroll({
  children,
  variant,
  className,
  delay = 0,
  once = true,
  amount = 0.3,
  as = "div",
}: AnimateOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  const prefersReducedMotion = useReducedMotion();

  const MotionComponent = motion[as] as typeof motion.div;

  // If user prefers reduced motion, render without animation
  if (prefersReducedMotion) {
    return (
      <MotionComponent ref={ref} className={className}>
        {children}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
