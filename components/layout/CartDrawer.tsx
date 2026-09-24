"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { transition } from "@/lib/animations";
import { copy } from "@/data/copy";

// Quiet front-end-only bag drawer. No cart state, add/remove, or checkout yet —
// this ticket ships the shell; items + backend arrive with the PDP / cart sprint.
// ponytail: no background scroll-lock — add when items make the drawer tall.
export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Keep Tab within the panel — aria-modal promises it, so honour it.
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("button, a[href]");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (!panelRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const panelTransition = reduced ? { duration: 0 } : transition.normal;
  const fadeTransition = reduced ? { duration: 0 } : transition.fast;

  return (
    <AnimatePresence>
      {open && [
        <motion.div
          key="cart-overlay"
          className="fixed inset-0 z-50 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fadeTransition}
          aria-hidden="true"
          onClick={onClose}
        />,
        <motion.aside
          key="cart-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping bag"
          className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-gray-200 bg-ivory"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={panelTransition}
        >
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
            <span className="font-display text-lg uppercase tracking-widest">{copy.nav.utility.cart}</span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close bag"
              className="-mr-2 p-2 text-charcoal transition-colors duration-[250ms] ease-out hover:text-black"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-xl">Your bag is empty.</p>
            <p className="max-w-xs text-sm text-gray-500">{copy.brand.supportingProposition}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 text-sm uppercase tracking-wide text-charcoal underline underline-offset-4 transition-colors duration-[250ms] ease-out hover:text-black"
            >
              Continue shopping
            </button>
          </div>
        </motion.aside>,
      ]}
    </AnimatePresence>
  );
}
