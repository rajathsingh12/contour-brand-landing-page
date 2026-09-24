# Contour Brand — Landing Page

All project context — brand spec, product system, page structure, tech stack, implementation roadmap — lives in [`AGENTS.md`](./AGENTS.md). Read it before making any decisions.

## Quick reference

- **What:** D2C fashion brand — dresses only, a fixed 15-dress collection in sizes L–4XL. Sculpting-focused, not a "plus-size brand." Positioning: "SCULPTED BY DESIGN." / "Dresses designed around your proportions." / "Not sized up. Thought through."
- **Stack:** Next.js App Router (16.x) + React 19 + TypeScript 5 + Tailwind CSS v4 + framer-motion + Vitest. Cart is a quiet front-end drawer; no backend/commerce platform committed for this revamp.
- **Start with:** Sprint 1 (design system) → Sprint 2 (homepage)
- **Brand voice:** Elegant, confident, intelligent, fashion-forward — never apologetic, patronizing, or body-shaming
- **Key differentiator on site:** Five anatomical fit categories (ARMS, BUST, TUMMY, WAIST, HIPS & THIGHS) + rule-based Fit Finder + a "Why It Works" fit rationale on every dress

## Rules

- Follow the homepage section order, product page structure, and product data model exactly as specified in AGENTS.md.
- Product scope is dresses only — a fixed 15-dress collection. No tops, trousers, jeans, skirts, co-ords, ethnicwear, or accessories, even as placeholders.
- Use exactly five customer-facing fit categories — ARMS, BUST, TUMMY, WAIST, HIPS & THIGHS — as the shopping vocabulary. No "Silhouette Engineering" tag system; never use Sculpt/Balance/Lengthen/Enhance as shopping categories. (proportion/structure/drape/silhouette may still be used as design language.)
- Fit guidance is a styling recommendation, never a restriction. Never tell the customer she "can't wear this."
- Visual direction is minimal fashion editorial. No pink-heavy aesthetics, no body-positive slogans, no cartoon bodies, no discount/promo styling.
- Avoid the phrase "plus-size" in customer-facing copy — use proportions, fit, silhouette, construction, ease, coverage, definition, design.
- Prices are ₹1,099 / ₹1,299 / ₹1,499, identical across all sizes, always displayed in ₹ (INR).
- Fit Finder is rule-based deterministic scoring, not AI. Don't claim "AI-powered" anywhere.
