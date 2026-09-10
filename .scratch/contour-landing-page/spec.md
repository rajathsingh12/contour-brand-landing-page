# Contour Landing Page — Spec

Status: ready-for-agent

## Problem Statement

An MBA student needs a fully navigable, visually polished brand website for Contour — a D2C fashion brand targeting Indian women XL–6XL — as the complete deliverable for an MBA evaluation. The site must communicate the brand story, demonstrate the proprietary Silhouette Engineering concept, show a working Fit Finder recommendation engine, and present the full business thesis (market positioning, competitive analysis, business model, unit economics) through the "Our Approach" page. No real commerce backend is needed — all product data is static, all transactions are simulated. The deadline is tonight.

## Solution

A static Next.js + TypeScript + Tailwind CSS site deployed to Vercel, containing:

- A 10-section homepage per the AGENTS.md spec
- A shop page with functional category, size, price, occasion, fit-objective, and body-consideration filters operating on 19 hardcoded SKUs
- Dynamic product detail pages with the full Contour product page layout (silhouette tags, "Why we designed it", body shape recommendations, fit description, model info)
- A 5-step interactive Fit Finder backed by a real scoring engine (rule-based, weighted formula) that returns a named fit profile and 3 product recommendations
- A size guide with per-size measurement tables and visual guidance
- An "Our Approach" page presenting the full MBA business thesis as editorial web content
- A theme switcher with 4 pre-built colour palettes (Burgundy, Sage, Midnight, Ember) using CSS custom properties, swappable via one click

All product imagery sourced from Unsplash/Pexels/Indian fashion sites for academic use, with a README disclaimer.

## User Stories

1. As an MBA evaluator, I want to land on the homepage and immediately understand the brand proposition (fashion engineered for your shape, XL–6XL, ₹599–₹1,499), so that I can assess the business concept in seconds.
2. As an MBA evaluator, I want to see the Silhouette Engineering tag system (SMOOTH, DEFINE, BALANCE, LENGTHEN, ENHANCE, SKIM, STRUCTURE) presented visually on the homepage and on products, so that I understand the proprietary concept.
3. As an MBA evaluator, I want to browse the shop page and use fit-objective filters (e.g. "Smooth", "Define") alongside standard filters (category, size, price), so that I can see how the site's UX differentiates from conventional fashion sites.
4. As an MBA evaluator, I want to click a product and see the full Contour product page — silhouette tags, "why we designed it", body shape recommendations, fit description, model info — so that I can evaluate the differentiated product experience.
5. As an MBA evaluator, I want to complete the 5-step Fit Finder and receive a personalised fit profile with 3 product recommendations, so that I can evaluate the recommendation concept.
6. As an MBA evaluator, I want to read the "Our Approach" page and understand the four-layer differentiation, competitive positioning, target market, business model, and fit-data flywheel, so that I can evaluate the strategic depth.
7. As an MBA evaluator, I want to see real-looking product imagery across the site, so that the brand experience feels credible.
8. As a potential customer (role-play), I want to navigate from "I want to define my waist" on the homepage to filtered products that address that goal, so that the site demonstrates its intent-based shopping flow.
9. As a potential customer, I want to use the size guide with per-size measurements and garment-specific fit notes, so that I feel confident about sizing.
10. As a potential customer, I want to switch the site's colour theme to see the brand in different visual directions, so that the theme system demonstrates flexibility.
11. As a site visitor, I want the header navigation to include Home, Shop (with category dropdowns), Shop by Fit (with fit-objective dropdowns), Fit Finder, Size Guide, Our Approach — all linking to working pages.
12. As a site visitor, I want the "Shop by Fit" nav links to arrive on the shop page with the corresponding fit filter pre-applied.
13. As a site visitor, I want the Fit Finder's product recommendations to link to actual product detail pages.
14. As a site visitor, I want the homepage "What Do You Want Your Outfit To Do?" cards to link to the shop page with relevant filters applied.
15. As a site visitor, I want a footer with brand tagline, navigation links, and social placeholder.
16. As a site visitor, I want the site to look polished on desktop and not break on mobile (basic responsive).
17. As a site visitor, I want the body-shape system framed as a styling recommendation ("If you're looking for X effect, these styles work well"), never as a restriction.
18. As a site visitor, I want the Fit Finder disclaimer ("Your fit profile is a styling recommendation based on your preferences and proportions") to appear on the results page.
19. As a site visitor, I want prices displayed in ₹ (INR) everywhere.
20. As a site visitor, I want the brand voice to be confident, direct, and fashionable — never apologetic or patronising — across all page copy.

## Implementation Decisions

### Architecture
- Static Next.js App Router project. No API routes, no server actions, no database. All data in TypeScript modules under `data/`.
- Tailwind CSS for styling. No component library (Radix, shadcn, etc.) — hand-built components to keep the dependency surface minimal.
- Google Fonts loaded via `next/font/google`: Playfair Display (serif, headings) + DM Sans (sans-serif, body).

### Theme system
- 4 themes: Burgundy (default), Sage, Midnight, Ember. Each defines: `--color-bg`, `--color-text`, `--color-accent`, `--color-accent-light`, `--color-muted`, `--color-border`, `--color-card-bg`.
- Applied via `data-theme` attribute on `<html>`. Theme choice persisted to `localStorage`.
- Tailwind config extended with custom colours referencing CSS custom properties.
- Theme switcher: small palette icon in the header, opens a 4-swatch dropdown.

### Product data model
- Full `Product` interface per AGENTS.md spec (id, name, category, price, sizes, colors, bodyShapes, fitObjectives, concernsAddressed, fitType, fabric, stretchLevel, length, occasions, styleTags, images, modelInfo).
- Supporting union types: `Size`, `BodyShape`, `FitObjective`, `Concern`, `Category`.
- All 19 SKUs fully tagged with body shapes, fit objectives, and concerns (mapping to be proposed based on garment construction logic).

### Fit Finder engine
- Pure function in `lib/fit-engine.ts`.
- Scoring: `body_shape_match × 30 + concern_match × 30 + goal_match × 25 + fit_preference × 15`.
- "Not sure" body shape: score redistributed evenly across all shapes.
- Deterministic profile name generation from user inputs (e.g. "The Balanced Sculpt").
- Returns top 3 products.

### Routing
- `/` — Homepage
- `/shop` — Product listing with filters (query params for filter state)
- `/products/[id]` — Product detail
- `/fit-finder` — 5-step flow
- `/size-guide` — Measurement tables
- `/our-approach` — MBA thesis page

### Brand copy
- All copy follows the voice guide in AGENTS.md. Campaign headline: "YOUR BODY ISN'T DIFFICULT. THE FIT WAS." Homepage hero: "FASHION THAT FITS YOUR SHAPE."
- "Our Approach" contains the full business thesis: brand story, problem statement, four-layer differentiation, competitive positioning, target customer, business model, fit-data flywheel, unit economics summary.

### Images
- Sourced from Unsplash/Pexels + Indian fashion sites for academic use.
- Stored in `public/images/products/` (per-SKU) and `public/images/hero/` (lifestyle/editorial).
- README disclaimer about placeholder imagery.

## Testing Decisions

- **Fit engine**: Vitest unit tests. A good test here exercises the scoring function's external behaviour: given these user preferences and this product array, do the right products rank highest? Tests should NOT mock the scoring internals or test individual weight calculations — test the output ranking.
- **Product data**: TypeScript compiler enforces the `Product` interface. If a product entry has a missing or wrong-typed field, the build fails. No runtime tests needed.
- **Theme system**: Visual verification in the browser. No automated tests — the value proposition is visual, not logical.
- **All pages**: Visual verification via `npm run dev`. Desktop-first check, basic mobile resize check.
- **No prior test art** in this repo — it's greenfield. Vitest is the test runner choice.

## Out of Scope

- Real commerce (Shopify, Razorpay, cart, checkout, order management)
- Supabase or any database
- User accounts, authentication, email collection
- CMS or admin panel
- Real product photography
- AI-powered recommendations
- Mobile-optimised UX (basic responsive only — must not break, not pixel-perfect)
- SEO optimisation
- Analytics integration
- Journal/blog page
- Contact page (nav link can be a placeholder)
- Shipping/returns pages

## Further Notes

- The brand name "Contour" is committed. No need to keep it swappable.
- The Fit Finder scoring weights are speculative. The implementation should ship them as-is but the engine should be structured so weights are easy to tune (named constants, not magic numbers).
- With only 19 SKUs, many Fit Finder completions will return overlapping recommendations. This is acceptable for the MVP — the concept demonstration matters more than result diversity.
- All product tag assignments (which SKU gets which body shapes / fit objectives / concerns) will be proposed based on garment construction logic and included in the product data ticket.
