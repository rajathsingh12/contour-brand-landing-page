# CONTOUR — Project Instructions

This is the development root for a D2C fashion brand website targeting women XL–6XL. The brand name is **CONTOUR**. Tagline: **Designed Around Your Shape.**

## What this project is

A Next.js storefront for a plus-size women's Western-wear brand whose core differentiator is **silhouette engineering** — garments designed around specific body proportions and fit objectives, not simply graded up from standard sizes. Price range ₹599–₹1,499.

This is not a generic fashion e-commerce template. Every technical decision should serve the brand's core proposition: **fit-aware product discovery and purchase**.

## Domain vocabulary

Use these terms consistently across code, data, copy, and component names.

| Term | Meaning |
|---|---|
| Fit Objective | A design intent assigned to a garment: `smooth`, `define`, `balance`, `lengthen`, `enhance`, `skim`, `structure` |
| Body Shape | Styling framework category: `apple`, `pear`, `hourglass`, `rectangle`, `inverted-triangle` |
| Concern | Body area the customer wants the garment to address: `midsection`, `upper-arm`, `hip`, `thigh`, `shoulder`, `leg` |
| Fit Type | How the garment sits: `fitted`, `structured`, `relaxed`, `oversized` |
| Fit Profile | The result of the Fit Finder — a combination of size, concerns, goals, fit preference, and body shape |
| Fit Finder | The multi-step questionnaire that produces a Fit Profile and product recommendations |
| Silhouette Badge | A UI element showing which fit objectives a product serves (e.g. `SMOOTH · DEFINE · SKIM`) |
| Collection | A curated set of products (e.g. "The Silhouette Edit", "The Work Edit") |
| Product Tier | Price/positioning tier: `everyday` (₹599–999), `signature` (₹899–1299), `statement` (₹1199–1499) |

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | TypeScript, RSC by default |
| Styling | Tailwind CSS 4 | No component library — custom design system |
| Data (MVP) | Static TypeScript files in `data/` | Typed product/body-shape/collection data |
| Commerce (future) | Shopify Storefront API | Headless — Shopify handles inventory, orders, payments |
| Backend (future) | Supabase | Auth, Fit Finder profiles, customer data, analytics |
| Payments (future) | Razorpay | Indian payment gateway |
| Deployment | Vercel | |
| Analytics (future) | PostHog or GA4 | Event tracking for fit-finder usage, conversions |

For the MVP build phase, all product data lives in typed `data/*.ts` files. Do not introduce a database, CMS, or Shopify integration until the frontend is complete and validated.

## Architecture decisions

### App Router structure

```
app/
  page.tsx              # Homepage (10-section layout)
  shop/
    page.tsx            # Product listing with fit filters
    [category]/page.tsx # Category pages
  products/
    [slug]/page.tsx     # Product detail page
  fit-finder/
    page.tsx            # Multi-step Fit Finder
  collections/
    [slug]/page.tsx     # Collection pages
  size-guide/page.tsx
  about/page.tsx        # "Our Approach"
  journal/page.tsx      # Blog/editorial (future)
  cart/page.tsx         # Cart (future)
```

### Component organization

```
components/
  layout/         # Header, Footer, Navigation, MobileNav
  home/           # Hero, SilhouetteSection, FitGoalsCards, PriceSection, etc.
  product/        # ProductCard, ProductGrid, ProductFilters, SilhouetteBadge
  fit-finder/     # FitFinderStep, FitProfile, FitResults
  shared/         # Button, Badge, SizeSelector, Container, Section
```

### Data layer

```
data/
  products.ts       # Full product catalog with fit metadata
  body-shapes.ts    # Body shape definitions + recommendations
  fit-profiles.ts   # Fit Finder scoring logic and profile generation
  collections.ts    # Named product groupings
  size-chart.ts     # Size measurements per category
```

Every product record must include: `id`, `name`, `slug`, `category`, `price`, `sizes`, `colors`, `bodyShapes`, `fitObjectives`, `concerns`, `fitType`, `fabric`, `stretchLevel`, `length`, `occasions`, `styleTags`, `tier`, `images`, `description`, `whyWeDesignedIt`, `fitNotes`.

### Fit Finder engine

Rule-based scoring, not ML. Lives in `lib/fit-engine.ts`.

Scoring formula for MVP:
```
productScore =
  bodyShapeMatch × 0.30
+ concernMatch  × 0.30
+ goalMatch     × 0.25
+ fitPrefMatch  × 0.15
```

Do not call this "AI-powered." Call it "Fit Finder" or "Personal Fit Profile."

## Design system

### Visual direction

Minimal fashion editorial. The brand should look more expensive than it is.

- Clean typography (one serif display + one sans-serif body)
- Neutral base palette (off-white, warm grey, charcoal, black)
- One accent colour (TBD — likely warm tone)
- Large product imagery, editorial layouts
- No pink-heavy aesthetics, no cartoon bodies, no measuring-tape clichés
- No body-positive slogans ("You deserve to feel beautiful", "Celebrate your curves")
- No apologetic or patronizing tone

### Brand voice (for all UI copy)

- Confident, direct, fashionable, intelligent
- Slightly provocative, never apologetic, never patronizing
- Say "Good clothes should fit properly" not "You deserve to feel beautiful"
- Say "Designed around your proportions" not "Celebrate your curves"
- Say "Choose what you emphasize" not "Hide your flaws"

### Responsive

Mobile-first. Three breakpoints: mobile (default), tablet (md: 768px), desktop (lg: 1024px, xl: 1280px).

## Navigation structure (MVP)

```
HOME
SHOP
  All | Tops | Dresses | Trousers | Co-ords | Workwear | Partywear
SHOP BY FIT
  Smooth | Define | Balance | Lengthen | Enhance | Skim
FIT FINDER
SIZE GUIDE
NEW DROP
OUR APPROACH
JOURNAL
CONTACT
```

The "Shop by Fit" navigation is a primary differentiator — it must be equally prominent as category navigation.

## Homepage sections (in order)

1. **Hero** — "Fashion That Fits Your Shape." + CTAs: Shop the Collection / Find Your Fit
2. **Your Body. Your Silhouette.** — Fit objective pills (Smooth, Define, Balance, Lengthen, Enhance)
3. **What Do You Want Your Outfit To Do?** — Goal cards with descriptions
4. **Designed Differently** — Construction close-ups, "Not just scaled up" messaging
5. **Looks Expensive. Doesn't Cost Like It.** — Price range callout ₹599–₹1,499
6. **Meet The Silhouettes** — Product card carousel
7. **Find Your Fit** — Fit Finder CTA
8. **Real People. Real Fits.** — Model/customer imagery across sizes
9. **XL–6XL. Every Style.** — Size-inclusive messaging
10. **Social proof** — Instagram feed / UGC

## Shop page filters

Standard: Category, Size, Price, Colour, Occasion

Fit filters (the differentiator):
- **Fit Objective:** Smooth, Define, Balance, Lengthen, Enhance, Skim
- **Body Consideration:** Midsection, Arms, Hips, Thighs, Shoulders, Legs

## Product page structure

1. Product name + price
2. Silhouette badges (fit objectives)
3. "Why we designed it" paragraph
4. "Best suited for" — body shapes + concerns
5. Fit description (per body zone)
6. Model info (size worn, height, usual size)
7. Fabric composition
8. Size selector (XL–6XL)
9. "Find My Fit" link to Fit Finder
10. Size guide link

## Product catalog (Collection 01: The Silhouette Edit)

19 SKUs across 5 categories. All data in `data/products.ts`.

| # | Name | Category | Price | Tier |
|---|---|---|---|---|
| 1 | The Sculpt Tee | tops | ₹599 | everyday |
| 2 | The Drop Shoulder Top | tops | ₹699 | everyday |
| 3 | The Waist-Define Top | tops | ₹799 | everyday |
| 4 | The Relaxed Shirt | tops | ₹899 | signature |
| 5 | The Drape Top | tops | ₹799 | everyday |
| 6 | The Sculpt Midi | dresses | ₹1,299 | signature |
| 7 | The A-Line Midi | dresses | ₹1,199 | signature |
| 8 | The Wrap Dress | dresses | ₹1,299 | signature |
| 9 | The Shirt Dress | dresses | ₹999 | everyday |
| 10 | The Ruched Side Dress | dresses | ₹1,299 | signature |
| 11 | The Wide-Leg Trouser | trousers | ₹999 | signature |
| 12 | The Sculpt Trouser | trousers | ₹1,199 | signature |
| 13 | The Straight-Leg Trouser | trousers | ₹899 | everyday |
| 14 | The High-Rise Flare | trousers | ₹1,299 | signature |
| 15 | The Sculpt Co-ord | co-ords | ₹1,499 | statement |
| 16 | The Relaxed Co-ord | co-ords | ₹1,299 | signature |
| 17 | The Work Co-ord | co-ords | ₹1,499 | statement |
| 18 | The Statement Dress | partywear | ₹1,499 | statement |
| 19 | The Night-Out Top | partywear | ₹999 | everyday |

Each product must have complete fit metadata (body shapes, fit objectives, concerns, fit type) before being added to the catalog.

## Sprint plan

| Sprint | Deliverable | Depends on |
|---|---|---|
| 1 | Design system — tokens, typography, colours, spacing, base components (Button, Badge, Container, Section) | — |
| 2 | Layout — Header, Footer, Navigation (desktop + mobile), page shells | Sprint 1 |
| 3 | Homepage — all 10 sections | Sprint 2 |
| 4 | Product listing — grid, filters (category + fit), sorting | Sprint 2 |
| 5 | Product detail page — full structure with fit metadata display | Sprint 4 |
| 6 | Fit Finder — multi-step form + scoring engine + results | Sprint 5 |
| 7 | Size guide — measurement tables + visual guide | Sprint 2 |
| 8 | Static pages — Our Approach, Contact | Sprint 2 |
| 9 | Mobile optimization pass | Sprint 3–8 |
| 10 | Production deployment on Vercel | Sprint 9 |

## Currency

All prices in INR (₹). Use `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })` for formatting.

## Images

MVP uses placeholder images. Use `next/image` with placeholder blur. Keep a consistent aspect ratio per context:
- Product cards: 3:4
- Hero: 16:9
- Model shots: 2:3

## Size range

Always: `['XL', '2XL', '3XL', '4XL', '5XL', '6XL']`. Never display sizes below XL.

## Things to avoid

- No "plus-size" in customer-facing copy — use "XL–6XL" or "extended sizing"
- No body-positive slogans or apologetic language
- No generic product names like "Plus Size Tummy Hiding Dress"
- No pink/feminine-heavy aesthetics
- No single body-shape model representation — show diversity of proportions
- No "AI-powered" claims for the Fit Finder
- No premature Shopify/Supabase/payment integration — static data first
- No component libraries (shadcn, Chakra, etc.) — custom design system
