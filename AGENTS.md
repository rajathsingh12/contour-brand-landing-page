# Contour — Landing Page Project

This file is the single source of truth for building the Contour brand landing page. It contains the brand spec, product system, page structure, technical decisions, and implementation roadmap extracted from `idea.txt`.

---

## Brand identity

**Working name:** Contour (placeholder — final name TBD after trademark/domain check)

**Core proposition:** Fashion engineered for your shape. Without the premium price.

**Internal philosophy:** You choose the silhouette. We engineer the fit.

**What the brand is NOT:**
- Not body-positive messaging ("celebrate your curves", "you deserve to feel beautiful")
- Not clinical/medical ("hide your flaws")
- Not apologetic or patronizing

**What the brand IS:**
- Control over styling and silhouette: "We don't tell you what your body should look like. We design clothes around the way you want to look and feel."
- Confident, direct, fashionable, intelligent, slightly provocative tone

**Voice examples:**

| Avoid | Use instead |
|---|---|
| "You deserve to feel beautiful" | "Good clothes should fit properly" |
| "Celebrate your curves!" | "Designed around your proportions" |
| "Hide your flaws" | "Choose what you emphasize" |

---

## The problem being solved

Most mainstream clothing is designed around standardized proportions then simply scaled up. Customers whose proportions differ experience poor fit, awkward silhouettes, limited styling, and higher prices.

The market already has plus-size availability (Myntra, plusS, WOMEN PLUS). Availability alone is not the differentiator. The defensible position is: **better fit + silhouette engineering + fashion + accessible pricing**.

---

## Four-layer differentiation

1. **Extended sizing** — XL to 6XL
2. **Proportion-aware construction** — patterns graded for bust, waist, hip, abdomen, thigh, upper arm, shoulder, torso, rise, length
3. **Silhouette engineering** — each garment has intentional design objectives (minimize/enhance specific areas)
4. **Fashion** — the result looks like something a fashionable 25-year-old wants to wear, not "the plus-size version"

---

## Silhouette Engineering™ system

Every garment is tagged with one or more design objectives:

| Tag | Meaning |
|---|---|
| **SMOOTH** | Smoother visual line around midsection |
| **DEFINE** | Creates waist definition |
| **BALANCE** | Visually balances shoulders and hips |
| **LENGTHEN** | Longer-looking leg/body line |
| **ENHANCE** | Adds visual emphasis where customer wants it |
| **SKIM** | Falls over the body rather than clings |
| **STRUCTURE** | Provides shape rather than simply hanging |

These tags serve as both a design system and a marketing/filtering system on the website.

---

## Body-shape system

Five categories used for recommendations (styling frameworks, not scientific classifications):

| Shape | Description | Recommended styles |
|---|---|---|
| **Apple** | More volume around midsection | A-line, V-neck, longer tops, structured shoulders, straight/wide-leg trousers, vertical details |
| **Pear** | More volume around hips/thighs | Structured tops, interesting necklines, shoulder detailing, A-line, darker lower silhouettes |
| **Hourglass** | Defined waist, balanced bust/hips | Wrap silhouettes, waist-defined dresses, fitted-but-structured, high-rise trousers |
| **Rectangle** | Less natural waist definition | Belted styles, peplum, waist seams, strategic colour blocking |
| **Inverted triangle** | Broader shoulders relative to hips | Softer shoulders, wider-leg trousers, A-line skirts, hip-enhancing silhouettes |

Body shape is never a restriction. Framing: "If you're looking for X effect, these styles are likely to work well for you."

Disclaimer on site: "Your fit profile is a styling recommendation based on your preferences and proportions."

---

## Product catalogue — Collection 01: THE SILHOUETTE EDIT

~19 SKUs at launch. These are conceptual — do not manufacture without pattern/fabric/cost validation.

### Tops (5) — ₹599–₹899
1. The Sculpt Tee
2. The Drop Shoulder Top
3. The Waist-Define Top
4. The Relaxed Shirt
5. The Drape Top

### Dresses (5) — ₹999–₹1,499
6. The Sculpt Midi
7. The A-Line Midi
8. The Wrap Dress
9. The Shirt Dress
10. The Ruched Side Dress

### Trousers (4) — ₹899–₹1,299
11. The Wide-Leg Trouser
12. The Sculpt Trouser
13. The Straight-Leg Trouser
14. The High-Rise Flare

### Co-ords (3) — ₹1,299–₹1,499
15. The Sculpt Co-ord
16. The Relaxed Co-ord
17. The Work Co-ord

### Party (2) — ₹999–₹1,499
18. The Statement Dress
19. The Night-Out Top

---

## Product data model

Every product in `data/products.ts` must include:

```ts
interface Product {
  id: string;
  name: string;
  category: "top" | "dress" | "trouser" | "coord" | "party";
  price: number;                          // INR
  sizes: Size[];                          // "XL" | "2XL" | "3XL" | "4XL" | "5XL" | "6XL"
  colors: string[];
  bodyShapes: BodyShape[];                // apple | pear | hourglass | rectangle | inverted-triangle
  fitObjectives: FitObjective[];          // smooth | define | balance | lengthen | enhance | skim | structure
  concernsAddressed: Concern[];           // midsection | upper_arm | hips | thighs | shoulders | legs
  fitType: string;                        // e.g. "structured-relaxed"
  fabric: string;
  stretchLevel: "none" | "low" | "medium" | "high";
  length: string;
  occasions: string[];
  styleTags: string[];
  images: string[];
  modelInfo: { size: string; height: string; };
}
```

---

## Product page structure

Every product page follows this layout:

1. **Product name** + price
2. **Silhouette tags** — e.g. SMOOTH · DEFINE · SKIM
3. **"Why we designed it"** — one paragraph explaining construction intent
4. **"Best suited for"** — body shapes + concerns addressed
5. **Fit description** — e.g. "Relaxed through stomach / Structured at waist / A-line through hip"
6. **Model info** — size worn, height, usual size (not "model wears M")
7. **Fabric** — composition
8. **Size selector** — XL through 6XL
9. **Fit Finder CTA** — "Not sure about your size? Find My Fit"

---

## Fit Finder

Rule-based recommendation engine (no AI claims). Five steps:

1. **Usual size** — XL / 2XL / 3XL / 4XL / 5XL / 6XL
2. **Where do you prefer more room?** — Bust / Stomach / Hips / Thighs / Arms / Overall
3. **What do you want your outfit to do?** — Define / Smooth / Balance / Lengthen / Enhance / Relax
4. **Preferred fit** — Fitted / Structured / Relaxed / Oversized
5. **Body shape** — Apple / Pear / Hourglass / Rectangle / Inverted triangle / Not sure

**Output:** A named fit profile (e.g. "The Balanced Sculpt") with preference summary and 3 product recommendations.

**Scoring logic:**
```
Product score =
  body_shape_match × 30 +
  concern_match × 30 +
  goal_match × 25 +
  fit_preference × 15
```

Implement in `lib/fit-engine.ts`.

---

## Homepage sections (in order)

| # | Section | Content |
|---|---|---|
| 1 | **Hero** | "FASHION THAT FITS YOUR SHAPE." / Trendy silhouettes. Thoughtful construction. XL–6XL. / CTAs: Shop the Collection, Find Your Fit |
| 2 | **Your Body. Your Silhouette.** | Silhouette tag pills: SMOOTH, DEFINE, BALANCE, LENGTHEN, ENHANCE / "Every body has different proportions. Your clothes should account for that." |
| 3 | **What Do You Want Your Outfit To Do?** | Cards: Define my waist / Smooth my midsection / Balance my proportions / Give my arms more coverage / Create longer-looking legs / Add shape |
| 4 | **Designed Differently** | Close-up garment imagery / "We develop our fits around fuller proportions, movement and the way the garment is actually worn." |
| 5 | **Looks Expensive. Doesn't Cost Like It.** | Price range: ₹599–₹1,499 |
| 6 | **Meet The Silhouettes** | Product cards grid |
| 7 | **Find Your Fit** | CTA: "Take the 60-second Fit Finder" |
| 8 | **Real People. Real Fits.** | Customer/model imagery — different sizes wearing same products |
| 9 | **XL–6XL. Every Style.** | Size-inclusive messaging |
| 10 | **Social proof** | Instagram feed / UGC |

---

## Website navigation (MVP)

```
HOME
SHOP
 ├── All
 ├── Tops
 ├── Dresses
 ├── Trousers
 ├── Co-ords
 ├── Workwear
 └── Partywear
SHOP BY FIT
 ├── Smooth
 ├── Define
 ├── Balance
 ├── Lengthen
 ├── Enhance
 └── Skim
FIT FINDER
SIZE GUIDE
NEW DROP
OUR APPROACH
JOURNAL
CONTACT
```

Secondary navigation system: "SHOP BY WHAT YOU WANT" / "I WANT TO…" cards linking to fit-filtered product lists.

---

## Website filters

**Standard:** Category, Size, Price, Colour, Occasion

**Fit filters (differentiator):**
- Fit objective: Smooth / Define / Balance / Lengthen / Enhance / Skim
- Body consideration: Midsection / Arms / Hips / Thighs / Shoulders / Legs

---

## Size guide

Must show per-size measurements for: Bust, Waist, Hip, Upper arm. Plus garment-specific fit notes ("This style has extra room through the midsection"). Include visual measurement guide.

---

## Visual identity

**Direction:** Minimal fashion editorial — the brand should look more expensive than it is.

| Use | Avoid |
|---|---|
| Clean typography | Pink-heavy "curvy girl" aesthetics |
| Neutral base palette | Excessive body-positive slogans |
| Strong photography | Overly feminine graphics |
| One accent colour | Cartoon bodies |
| Large product imagery | Cliché measuring tapes |
| Editorial layouts | "Love yourself" messaging |
| Sophisticated packaging feel | All-black product range |

---

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js + TypeScript | App router |
| Styling | Tailwind CSS | |
| Backend (MVP) | Supabase | Auth, DB, customer profiles, Fit Finder results, product data |
| Commerce (recommended) | Shopify backend + custom Next.js storefront | Handles products, inventory, orders, payments, discounts |
| Payments | Razorpay (when ready) | Indian payment provider |

---

## Repository structure

```
contour-brand/
├── app/
│   ├── page.tsx              # Homepage
│   ├── shop/                 # Product listing + filters
│   ├── products/             # Product detail pages
│   ├── fit-finder/           # Fit Finder flow
│   ├── collections/          # Collection pages
│   ├── about/                # Our Approach
│   ├── size-guide/
│   ├── journal/
│   └── cart/
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   ├── FitFinder.tsx
│   ├── FitProfile.tsx
│   ├── ProductFilters.tsx
│   ├── SizeGuide.tsx
│   ├── SilhouetteBadge.tsx
│   └── ReviewSection.tsx
├── data/
│   ├── products.ts
│   ├── bodyShapes.ts
│   ├── fitProfiles.ts
│   └── collections.ts
├── lib/
│   ├── shopify.ts
│   ├── fit-engine.ts
│   └── analytics.ts
├── public/
│   ├── images/
│   └── icons/
├── styles/
├── CLAUDE.md
├── AGENTS.md
└── package.json
```

---

## Implementation roadmap

| Sprint | Deliverable |
|---|---|
| 1 | **Design system** — brand name (temp), typography, colour system, buttons, cards, nav, spacing, responsive layout |
| 2 | **Homepage** — all 10 sections |
| 3 | **Product listing** — shop page with standard + fit filters |
| 4 | **Product page** — full layout per spec above |
| 5 | **Fit Finder** — 5-step flow + scoring engine + profile output |
| 6 | **Size guide** — measurement table + visual guide + per-product fit notes |
| 7 | **Cart + checkout** — Shopify integration |
| 8 | **Analytics** — event tracking |
| 9 | **Mobile optimization** — responsive pass |
| 10 | **Production deployment** |

This is a landing-page-first project. Start with Sprints 1–2 to prove the brand experience before building commerce.

---

## MVP pages (must-have)

Homepage, Shop, Product pages, Size guide, Fit Finder, Cart, Checkout, About/Our Approach, Shipping, Returns, Contact

## Post-MVP (later)

Loyalty, AI stylist, deep personalisation, reviews with body profile, user accounts, wishlist, virtual styling, subscription/wardrobe features

---

## Campaign headline

**Primary:** "YOUR BODY ISN'T DIFFICULT. THE FIT WAS."

**Secondary:** "DESIGNED AROUND YOU."

---

## Target customer

Fashion-conscious, price-conscious Indian women, XL–6XL. Ages 18–45, digitally active. Primary launch segment: 25–34.

---

## Pricing architecture

| Category | Price range (INR) |
|---|---|
| Basic tops | ₹599–₹799 |
| Fashion tops | ₹799–₹999 |
| Trousers | ₹899–₹1,299 |
| Dresses | ₹999–₹1,499 |
| Co-ords | ₹1,299–₹1,499 |
| Partywear | ₹1,199–₹1,499 |

---

## Agent skills

### Issue tracker

Local markdown under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
