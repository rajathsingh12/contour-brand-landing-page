# CONTOUR — Agent Instructions

These instructions apply to all agents (subagents, reviewers, planners) working in this repository.

Read `CLAUDE.md` first — it contains the domain vocabulary, tech stack, architecture decisions, and design system that every agent must follow.

## Project context

This is a D2C fashion brand website for women XL–6XL. The brand's differentiator is **silhouette engineering** — garments designed around specific body proportions and fit objectives. The website must communicate this through its structure, navigation, product data, and the Fit Finder feature.

This is not a generic e-commerce template. Agents must understand the domain before writing code.

## Priorities (in order)

1. **Correctness** — code works, types are sound, data is consistent
2. **Domain fidelity** — every component, page, and data structure serves the brand proposition (fit-aware discovery)
3. **Visual quality** — the site must look like a premium fashion editorial, not a Bootstrap template
4. **Performance** — fast loads, good Core Web Vitals, optimized images
5. **Minimal scope** — do exactly what's asked, nothing more

## Domain rules

- Use domain vocabulary from `CLAUDE.md` consistently. `fitObjectives` not `tags`, `bodyShapes` not `bodyTypes`, `concerns` not `problemAreas`.
- Every product must have complete fit metadata. A product without `fitObjectives`, `bodyShapes`, and `concerns` is incomplete.
- The Fit Finder is rule-based scoring, not ML. The scoring weights are defined in `CLAUDE.md`.
- Body shapes are styling frameworks, not medical classifications. Never use language that implies scientific authority.
- Sizes are always `XL` through `6XL`. Never render sizes below XL.

## Technical rules

### Framework

- Next.js 15 App Router with TypeScript. Use React Server Components by default; add `'use client'` only when the component needs browser APIs, state, or event handlers.
- Tailwind CSS 4 for styling. No CSS modules, no styled-components, no component libraries.
- All data lives in typed `data/*.ts` files for MVP. No API routes, no database, no CMS until instructed.

### Code style

- TypeScript strict mode. No `any`. No `@ts-ignore`.
- Named exports, not default exports (except for Next.js page/layout conventions).
- Props interfaces named `{ComponentName}Props`.
- One component per file. File name matches the component name in kebab-case.
- Colocate component-specific types with the component. Shared types in `types/`.

### Components

- Build from scratch using Tailwind. No shadcn, Radix, Headless UI, or other component libraries.
- Every interactive component must be keyboard-accessible and have appropriate ARIA attributes.
- Use `next/image` for all images. Set explicit width/height or use `fill` with a sized container.
- Use `next/link` for all internal navigation.

### Data

- Product data in `data/products.ts` must match the schema defined in `CLAUDE.md` exactly.
- Type definitions for Product, BodyShape, FitObjective, FitProfile, Collection, etc. live in `types/`.
- Use string literal unions for enums: `type FitObjective = 'smooth' | 'define' | 'balance' | 'lengthen' | 'enhance' | 'skim' | 'structure'`
- Prices are numbers in INR (no decimals). Format with `Intl.NumberFormat` at render time.

### File structure

Follow the structure in `CLAUDE.md`. Do not create new top-level directories without justification. Place things where the architecture says they go:

- Pages → `app/`
- Components → `components/{domain}/`
- Data → `data/`
- Utilities → `lib/`
- Types → `types/`

## Copy and content rules

All user-facing text must follow the brand voice defined in `CLAUDE.md`:

- Confident, direct, fashionable, intelligent
- Never apologetic, never patronizing
- No body-positive slogans, no "celebrate your curves", no "you deserve to feel beautiful"
- No "plus-size" in customer-facing copy — use "XL–6XL" or "extended sizing"
- No "AI-powered" for the Fit Finder
- Product names are aspirational ("The Sculpt Midi"), not clinical ("Plus Size Tummy Hiding Dress")

## Testing

- If you add a utility function (especially `lib/fit-engine.ts`), add a co-located test or a test in `__tests__/`.
- For components, manual visual verification is acceptable for MVP. Note when you cannot verify a visual change.

## Git

- Commit only when explicitly asked.
- Commit messages: short, descriptive, lowercase. Example: `add product card component with silhouette badges`
- One concern per commit.

## What not to do

- Do not install npm packages without being asked. The project uses Next.js + Tailwind only.
- Do not add Shopify, Supabase, Razorpay, or any external service integration until instructed.
- Do not create placeholder/stub pages that say "Coming soon." Either build the page or don't create the route.
- Do not add analytics, error tracking, or monitoring without being asked.
- Do not refactor or reorganize existing working code unless the task requires it.
- Do not create README.md, CONTRIBUTING.md, or documentation files unless asked.
- Do not add comments to code unless the why is genuinely non-obvious.
