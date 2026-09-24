# Contour — Landing Page Project

This file is the single source of truth for building the Contour brand landing page — brand spec, product system, page structure, technical decisions, and implementation roadmap. Where anything here conflicts with older notes, the revamp brief in `docs/new-data/website-revamp-idea.md` and `docs/new-data/new-prompt-for-revamp.md` wins.

---

## Brand identity

**Name:** CONTOUR

**Primary brand line:** SCULPTED BY DESIGN.

**Supporting proposition:** Dresses designed around your proportions.

**Core philosophy:** Not sized up. Thought through.

**Brand statement (approved verbatim copy):** FIVE FIT CONCERNS. / FIFTEEN DRESSES. / DESIGNED FOR REAL BODIES.

Contour is an India-first D2C fashion brand focused **exclusively on dresses**. It is built around contouring and sculpting through intelligent design — silhouette, proportion, structure, drape, seam placement, ease and construction — to create dresses that look considered and sculpted while staying comfortable and wearable. Contour is **not** primarily a "plus-size brand"; it is a sculpting-focused fashion brand that initially serves an extended-size customer through **L–4XL**.

**What the brand is NOT:**
- Not body-positive messaging ("celebrate your curves", "you deserve to feel beautiful")
- Not clinical/medical ("hide your flaws", "hide your tummy", "fix your body")
- Not apologetic or patronizing
- Not led with a "plus-size" framing

**What the brand IS:**
- Beautiful fashion first, intelligent fit second
- Confident, elegant, intelligent, fashion-forward, minimal

**Voice examples:**

| Avoid | Use instead |
|---|---|
| "You deserve to feel beautiful" | "Dresses designed around your proportions" |
| "Celebrate your curves!" | "Not sized up. Thought through." |
| "Hide your tummy / fix your body" | "Considered fit, thoughtful coverage, effortless definition" |

---

## The problem being solved

Most mainstream clothing is designed around standardized proportions then simply scaled up. A fuller body isn't simply a larger version of a smaller body — yet fashion has become good at changing measurements without getting better at understanding proportions. Customers whose proportions differ experience poor fit and awkward silhouettes, especially around the arms, bust, tummy, waist, hips and thighs. The defensible position is **intelligent, sculpting-focused dress design** — silhouette, proportion, structure, drape and construction considered around the body wearing the dress — not mere size availability.

---

## Differentiation

1. **Dresses designed around proportions** — silhouette, proportion, structure, drape, seam placement, ease and construction considered for fuller busts, arms, abdomen, waist, hips and thighs.
2. **Five anatomical fit categories** — every dress belongs to one clear fit concern it is designed to address.
3. **Extended sizing done right** — L–4XL, with the same price across every size.
4. **Fashion first** — the result reads as sophisticated, timeless fashion, never "the plus-size version."

---

## Fit categories (customer-facing shopping vocabulary)

Exactly **five** anatomical fit categories. These replace any prior tag system. Do **not** create a "Multi-Fit" or "Back" category, and never use vague shopping categories such as Sculpt, Balance, Lengthen or Enhance. Words like proportion, structure, drape and silhouette may be used as **design language**, never as a tag/category system.

| Category | Focus | Card tagline (verbatim) |
|---|---|---|
| **ARMS** | Fuller upper arms / elegant arm coverage | Elegant arm coverage for fuller upper arms. |
| **BUST** | Fuller bust / considered neckline and bust fit | Considered necklines and fit for fuller busts. |
| **TUMMY** | Fuller abdomen / clean, comfortable midsection | Clean, comfortable midsection. |
| **WAIST** | Less-defined waist / effortless waist definition | Effortless waist definition without squeezing. |
| **HIPS & THIGHS** | Fuller hips and thighs / comfortable lower-body ease | Comfortable lower-body ease where you need it. |

---

## Product catalogue — The Contour Collection

**Dresses only.** A fixed collection of **exactly 15 dresses**. Never create or display tops, trousers, jeans, skirts, co-ords, ethnicwear, accessories, or generic apparel categories — not even as placeholders. Each dress maps to exactly one fit category and has a clear reason for belonging to it. Use each code lowercased (e.g. `a1`) as the dress `id`.

| Code | Dress | Fit | Colour | Silhouette & detail |
|---|---|---|---|---|
| A1 | The Elongated Sleeve | ARMS | Black | Square neck, structured ¾ blouson sleeves, A-line |
| A2 | The Cape Sleeve | ARMS | Burgundy / wine | Square neck, draped cape / flutter sleeve |
| A3 | The Sculpt Sleeve | ARMS | Charcoal grey | Square neck, ¾ puff sleeves, defined waist |
| B1 | The Wrap Neck | BUST | Black | Long-sleeve wrap V-neck |
| B2 | The Square Neck | BUST | Taupe / stone | Sleeveless square neck, tailored |
| B3 | The V-Neck Panel | BUST | Black | Long-sleeve V-neck wrap panel |
| T1 | The Diagonal Drape | TUMMY | Mocha / taupe-brown | Sleeveless V-neck, diagonal drape wrap |
| T2 | The Panelled Midi | TUMMY | Black | Short-sleeve square neck, panelled midi |
| T3 | The Raised-Waist | TUMMY | Soft olive | Sleeveless square neck, raised-waist A-line |
| W1 | The Tailored Waist | WAIST | Black | Sleeveless square neck, tie belt |
| W2 | The Contoured Seam | WAIST | Espresso / chocolate | Long-sleeve wrap V-neck with tie |
| W3 | The Belt-Free Wrap | WAIST | Black | Short-sleeve V-neck wrap |
| H1 | The Structured A-Line | HIPS & THIGHS | Black | Short-sleeve square neck, full A-line |
| H2 | The Panelled Flare | HIPS & THIGHS | Dusty rose / mauve | Flutter-sleeve V-neck, panelled flare |
| H3 | The Fluid Column | HIPS & THIGHS | Deep navy | Short-sleeve square neck, column with side drape |

---

## Product data model

Every dress in `data/` conforms to a typed `Dress`:

```ts
type FitCategory = "ARMS" | "BUST" | "TUMMY" | "WAIST" | "HIPS_THIGHS";

interface Dress {
  id: string;                       // canonical code lowercased, e.g. "a1"
  name: string;
  fitCategory: FitCategory;
  price: 1099 | 1299 | 1499;        // ₹ INR — identical across all sizes
  sizes: ["L", "XL", "2XL", "3XL", "4XL"];
  whyItWorks: string[];             // design features addressing the fit concern
  fabric: string;
  care: string;
  modelSize: string;
  images: { front: string; threeQuarter: string; side: string; back: string; detail: string };
}
```

Prices are ₹1,099 / ₹1,299 / ₹1,499 and are **identical across all sizes** — enforce with a type/unit check, not convention.

---

## Product page structure

Every product page includes, in order:

1. Product name + price
2. Fit focus — its ARMS / BUST / TUMMY / WAIST / HIPS & THIGHS category
3. **Why It Works** — the design features that address the fit concern (the most important section)
4. Fabric
5. Care instructions
6. Size selector — L / XL / 2XL / 3XL / 4XL
7. Model size
8. Size-guide link
9. Shipping information
10. Return information
11. Payment methods (prepaid + COD)
12. Reviews
13. Recommended dresses

**Why It Works** example: "Strategic diagonal drape creates a clean visual line through the midsection · designed with appropriate abdominal ease · structured enough to hold its silhouette without clinging · midi length creates an uninterrupted vertical line."

---

## Fit Finder

Rule-based, deterministic recommendation — **never called "AI"** in code or copy. The customer selects one or more fit concerns; the engine recommends relevant dresses.

- **Input:** one or more fit concerns — ARMS / BUST / TUMMY / WAIST / HIPS & THIGHS
- **Signature:** `recommend(concerns: FitCategory[]): Dress[]`
- **Scoring:** score by category match, stable-sort by score then price. No randomness, no network, no model.

Implement in `lib/fit-finder/` as a pure function, unit-tested (fixed input → fixed output).

---

## Homepage sections (in order)

Exactly **8** sections:

| # | Section | Content |
|---|---|---|
| 1 | **Hero** | Editorial photo + "SCULPTED BY DESIGN." / "Sophisticated dresses designed around your proportions." / CTAs: SHOP THE COLLECTION, FIND YOUR FIT |
| 2 | **Dresses Designed Differently** | "A fuller body isn't simply a larger version of a smaller body…" + display line: **L–4XL · INDIA-FIRST · SAME PRICE ACROSS SIZES** |
| 3 | **Shop by Fit** | Five category cards: ARMS, BUST, TUMMY, WAIST, HIPS & THIGHS |
| 4 | **The Contour Collection** | Editorial grid of all 15 dresses; each card: image, name, fit category, price, sizes, "View Dress" |
| 5 | **Not Sized Up. Thought Through.** | Design-philosophy copy |
| 6 | **Fit Finder** | "FIND YOUR CONTOUR" — select a fit concern, get recommendations |
| 7 | **Your Size. Your Price.** | "L–4XL, same price across every size." / CTA: VIEW SIZE GUIDE |
| 8 | **Why Contour? (About)** | Brand story |

---

## Website navigation

CONTOUR · SHOP · SHOP BY FIT · FIT FINDER · OUR APPROACH · SIZE GUIDE · ABOUT · SEARCH · ACCOUNT · CART

Cart is a quiet front-end drawer (no backend claims). Keep navigation minimal — no tops/trousers/skirts/co-ords/collections/journal categories.

**Route map (App Router):** `/`, `/shop`, `/shop-by-fit` → `/shop-by-fit/[category]`, `/fit-finder`, `/our-approach`, `/size-guide`, `/about`, `/products/[id]`.

---

## Website filters

Filter dresses by **fit category** (ARMS / BUST / TUMMY / WAIST / HIPS & THIGHS), and optionally by colour family. Size (all L–4XL) and price (₹1,099 / ₹1,299 / ₹1,499) are uniform across the collection.

---

## Size guide

Show per-size measurements for **L, XL, 2XL, 3XL, 4XL** across Bust, Waist, Hip and Upper arm, plus garment-specific fit notes (e.g. "extra room through the midsection") and a visual measurement guide.

---

## Visual identity

**Direction:** Minimal, quiet-luxury fashion editorial — classy, elegant, chic, timeless, sophisticated, expensive, feminine, modern, restrained.

**Foundation:** black (hero colour), ivory, warm white, charcoal and muted neutrals. Sophisticated serif for headlines; clean modern sans for nav and body. Generous whitespace, hairline borders, restrained UI.

| Use | Avoid |
|---|---|
| Editorial serif headlines + clean sans body | Pink-heavy "curvy girl" aesthetics |
| Black + warm-neutral palette, muted accents only | Neon / saturated / hot-pink / electric colours |
| Full-bleed editorial photography, garment in focus | Body-positive slogans, "love yourself" messaging |
| Hairline borders, generous whitespace | Rounded drop-shadow cards, cheap ecommerce patterns |
| Large product imagery at consistent ratios | Promo/sale banners, discount badges, countdowns |
| Restrained, subtle motion | Loud gradients, flashy animation, cartoon bodies |

---

## Colour direction

Black is the hero colour, used alongside sophisticated muted colours. Approved families: black, charcoal, espresso, chocolate, taupe, stone, cream, deep navy, burgundy, wine, dusty rose, muted pink, powder pink, muted mauve, dusty blue, slate blue, muted lavender, muted sage, soft olive. Pinks/oranges/yellows/blues are allowed only if muted, pastel or dusty. **Never** neon, fluorescent, or highly saturated colours.

---

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js App Router (16.x) | React 19, RSC by default |
| Language | TypeScript 5 | |
| Styling | Tailwind CSS v4 | `@theme` design tokens |
| Motion | framer-motion | Subtle, ≤400ms, honour `prefers-reduced-motion` |
| Testing | Vitest | Fit Finder unit tests |
| Cart | Front-end drawer only | No backend claims |

**Out of scope for this revamp:** no backend or commerce platform is committed. Any future Supabase / Shopify / Razorpay integration is out of scope here — the cart is a quiet front-end drawer.

---

## Payment

Communicate accepted methods — **prepaid** and **COD** — clearly but unobtrusively (e.g. in the footer). No live payment processing is in scope for this revamp.

---

## Repository structure

```
contour-brand/
├── app/
│   ├── page.tsx              # Homepage (8 sections)
│   ├── shop/                 # All 15 dresses
│   ├── shop-by-fit/          # 5 category cards
│   │   └── [category]/       # Filtered listing
│   ├── fit-finder/
│   ├── our-approach/
│   ├── size-guide/
│   ├── about/
│   └── products/[id]/        # Dress detail page
├── components/
│   ├── layout/               # Header/Nav + Footer
│   ├── home/                 # 8 homepage sections
│   ├── product/              # Product card, grid, PDP
│   ├── shop/                 # Shop + shop-by-fit listings
│   ├── fit-finder/           # Fit Finder UI
│   ├── editorial/            # About, Our Approach, Size Guide bodies
│   └── ui/                   # Shared primitives (Button, Heading, Price, SizeSelector, ImageFrame, …)
├── data/                     # Typed Dress model + all 15 dresses + copy blocks
├── lib/
│   ├── design/               # Tokens, fonts, Tailwind theme, motion
│   └── fit-finder/           # Deterministic scoring engine
├── public/images/            # Dress imagery (front/3-4/side/back/detail)
├── CLAUDE.md
├── AGENTS.md
└── package.json
```

---

## Implementation roadmap

| Sprint | Deliverable |
|---|---|
| 1 | **Design system** — tokens, typography, colour, buttons, cards, nav, spacing, responsive layout |
| 2 | **Homepage** — all 8 sections |
| 3 | **Shop** — `/shop` (all 15) + `/shop-by-fit` category listings |
| 4 | **Product page** — full PDP per spec above |
| 5 | **Fit Finder** — deterministic scoring engine + UI |
| 6 | **Size guide** — measurement table (L–4XL) + visual guide + per-dress fit notes |
| 7 | **Editorial pages** — About, Our Approach |
| 8 | **Cart drawer** — front-end only |
| 9 | **Mobile optimization** — responsive pass |
| 10 | **Production build + evidence sweep** |

Landing-page-first: start with Sprints 1–2 to prove the brand experience.

---

## MVP pages

Homepage, Shop, Shop by Fit, Product pages, Fit Finder, Size Guide, Our Approach, About. Cart is a front-end drawer.

## Post-MVP (later)

Loyalty, personalisation, richer reviews, user accounts, wishlist.

---

## Campaign headline

**Primary:** SCULPTED BY DESIGN.
**Supporting:** Dresses designed around your proportions.
**Philosophy:** Not sized up. Thought through.

---

## Target customer

Women approximately 25–45 in India who want sophisticated, polished, elegant fashion. She may struggle to find dresses that fit properly around the arms, bust, tummy, waist, hips or thighs, but does not necessarily identify primarily as a "plus-size shopper." She wants beautiful fashion first, intelligent fit second.

---

## Brand language

Tone: elegant, confident, intelligent, minimal, fashion-forward. Never childish, never overly enthusiastic, never body-shaming, never overly clinical. **Avoid the phrase "plus-size" in customer-facing copy** — use proportions, fit, silhouette, construction, ease, coverage, definition and design instead. (Internal notes may use it.)

---

## Pricing

Three price points, identical across all sizes:

| Price (₹) | Tier |
|---|---|
| ₹1,099 | Entry-level |
| ₹1,299 | Core collection |
| ₹1,499 | Statement / more detailed construction |

Range ₹1,000–₹1,500. All L–4XL sizes have identical pricing. Always displayed in ₹ (INR).

---

## Agent skills

### Issue tracker

Local markdown under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->








