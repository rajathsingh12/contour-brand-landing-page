import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { SilhouetteBadge } from "@/components/SilhouetteBadge";
import { products } from "@/data/products";
import type { FitObjective } from "@/lib/types";

const TAGS: FitObjective[] = ["smooth", "define", "balance", "lengthen", "enhance", "skim", "structure"];

const OUTFIT_CARDS: { label: string; fit: FitObjective; desc: string }[] = [
  { label: "Define my waist", fit: "define", desc: "Structured seams and strategic shaping create waist definition." },
  { label: "Smooth my midsection", fit: "smooth", desc: "Panels and fabrics that create a smoother visual line." },
  { label: "Balance my proportions", fit: "balance", desc: "Design lines that visually balance shoulders and hips." },
  { label: "Give my arms more coverage", fit: "skim", desc: "Relaxed sleeves that fall over rather than cling." },
  { label: "Create longer-looking legs", fit: "lengthen", desc: "High rises and vertical lines that elongate your silhouette." },
  { label: "Add shape", fit: "structure", desc: "Structured fabrics and construction that provide shape." },
];

const FEATURED_IDS = [
  "sculpt-tee", "wrap-dress", "wide-leg-trouser", "sculpt-midi",
  "sculpt-coord", "statement-dress", "a-line-midi", "drape-top",
];
const featured = products.filter((p) => FEATURED_IDS.includes(p.id));

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-c-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[1.1]">
              Fashion That Fits Your Shape.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-c-text-secondary">
              Trendy silhouettes. Thoughtful construction. XL&ndash;6XL.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center px-8 py-3.5 bg-c-accent text-white font-medium text-sm uppercase tracking-wider rounded-full hover:bg-c-accent-hover transition-colors"
              >
                Shop the Collection
              </Link>
              <Link
                href="/fit-finder"
                className="inline-flex items-center px-8 py-3.5 border border-c-accent text-c-accent font-medium text-sm uppercase tracking-wider rounded-full hover:bg-c-accent-light transition-colors"
              >
                Find Your Fit
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-c-bg via-c-accent-light/30 to-c-bg" />
      </section>

      {/* 2 — Your Body. Your Silhouette. */}
      <section className="py-20 md:py-28 bg-c-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight">
            Your Body. Your Silhouette.
          </h2>
          <p className="mt-4 text-lg text-c-text-secondary max-w-2xl mx-auto">
            Every body has different proportions. Your clothes should account for that.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {TAGS.map((tag) => (
              <SilhouetteBadge key={tag} tag={tag} href={`/shop?fit=${tag}`} size="md" />
            ))}
          </div>
        </div>
      </section>

      {/* 3 — What Do You Want Your Outfit To Do? */}
      <section className="py-20 md:py-28 bg-c-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight text-center">
            What Do You Want Your Outfit To Do?
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OUTFIT_CARDS.map((card) => (
              <Link
                key={card.fit}
                href={`/shop?fit=${card.fit}`}
                className="group p-8 bg-c-surface rounded-lg border border-c-border hover:border-c-accent hover:shadow-md transition-all"
              >
                <h3 className="font-heading text-xl font-semibold group-hover:text-c-accent transition-colors">
                  {card.label}
                </h3>
                <p className="mt-2 text-sm text-c-text-secondary">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Designed Differently */}
      <section className="py-20 md:py-28 bg-c-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] rounded-lg overflow-hidden relative">
              <Image
                src="/images/editorial/editorial-main.jpg"
                alt="Fashion editorial — woman in a fitted dress"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight">
                Designed Differently
              </h2>
              <p className="mt-6 text-lg text-c-text-secondary leading-relaxed">
                We develop our fits around fuller proportions, movement and the
                way the garment is actually worn.
              </p>
              <p className="mt-4 text-lg text-c-text-secondary leading-relaxed">
                Every pattern is graded for bust, waist, hip, abdomen, thigh,
                upper arm, shoulder, torso, rise and length &mdash; not just
                scaled up from a standard size.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Looks Expensive. Doesn't Cost Like It. */}
      <section className="py-20 md:py-28 bg-c-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight">
            Looks Expensive. Doesn&rsquo;t Cost Like It.
          </h2>
          <p className="mt-8 font-heading text-6xl md:text-7xl lg:text-8xl font-bold text-c-accent">
            &#8377;599&ndash;&#8377;1,499
          </p>
          <p className="mt-6 text-lg text-c-text-secondary max-w-lg mx-auto">
            Silhouette-engineered fashion. Thoughtful construction. Accessible
            pricing.
          </p>
        </div>
      </section>

      {/* 6 — Meet The Silhouettes */}
      <section className="py-20 md:py-28 bg-c-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight text-center">
            Meet The Silhouettes
          </h2>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center px-8 py-3.5 border border-c-accent text-c-accent font-medium text-sm uppercase tracking-wider rounded-full hover:bg-c-accent-light transition-colors"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* 7 — Find Your Fit */}
      <section className="py-20 md:py-28 bg-c-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight">
            Find Your Fit
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">
            Answer a few questions about your preferences and proportions.
            We&rsquo;ll recommend the styles most likely to work for you.
          </p>
          <Link
            href="/fit-finder"
            className="mt-10 inline-flex items-center px-10 py-4 bg-c-surface text-c-accent font-medium text-sm uppercase tracking-wider rounded-full hover:bg-c-bg transition-colors"
          >
            Take the 60-Second Fit Finder
          </Link>
        </div>
      </section>

      {/* 8 — Real People. Real Fits. */}
      <section className="py-20 md:py-28 bg-c-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight text-center">
            Real People. Real Fits.
          </h2>
          <p className="mt-4 text-center text-lg text-c-text-secondary max-w-2xl mx-auto">
            Different sizes. Same style. See how our silhouettes look across
            XL&ndash;6XL.
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/images/editorial/real-1.jpg", alt: "Casual everyday look" },
              { src: "/images/editorial/real-2.jpg", alt: "Professional workwear" },
              { src: "/images/editorial/real-3.jpg", alt: "Evening party outfit" },
              { src: "/images/editorial/real-4.jpg", alt: "Relaxed weekend style" },
            ].map((img) => (
              <div key={img.src} className="aspect-[3/4] rounded-lg overflow-hidden relative">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — XL–6XL. Every Style. */}
      <section className="py-20 md:py-28 bg-c-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
            XL&ndash;6XL. Every Style.
          </h2>
          <p className="mt-6 text-lg text-c-text-secondary max-w-2xl mx-auto">
            Not a capsule. Not a &ldquo;plus-size line.&rdquo; A full collection
            engineered around your proportions &mdash; from workwear to
            partywear.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {(["XL", "2XL", "3XL", "4XL", "5XL", "6XL"] as const).map((size) => (
              <span
                key={size}
                className="px-5 py-2 text-sm font-semibold tracking-wider uppercase border border-c-border rounded-full"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Social Proof */}
      <section className="py-20 md:py-28 bg-c-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight">
            @contour
          </h2>
          <p className="mt-4 text-lg text-c-text-secondary">
            Follow us for styling ideas and new drops.
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/images/social/insta-1.jpg", alt: "Fashion styling" },
              { src: "/images/social/insta-2.jpg", alt: "Street style" },
              { src: "/images/social/insta-3.jpg", alt: "Accessories" },
              { src: "/images/social/insta-4.jpg", alt: "Lifestyle" },
            ].map((img) => (
              <div key={img.src} className="aspect-square rounded-lg overflow-hidden relative">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
