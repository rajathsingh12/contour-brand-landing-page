import Link from "next/link";
import { dresses, type Dress } from "@/data/dresses";
import { copy } from "@/data/copy";
import { CATEGORY_LABELS } from "@/lib/shop/categories";
import { Container, Heading, Text, Price, SizeSelector, ImageFrame } from "@/components/ui";
import { CollectionGrid } from "./CollectionGrid";

const c = copy.product;
const RECOMMENDED_COUNT = 3;

// Deterministic recommendations: same-category dresses first (catalogue order),
// then the rest, excluding the current dress. No randomness, no network.
export function recommendedDresses(current: Dress): Dress[] {
  const others = dresses.filter((d) => d.id !== current.id);
  const sameCategory = others.filter((d) => d.fitCategory === current.fitCategory);
  const rest = others.filter((d) => d.fitCategory !== current.fitCategory);
  return [...sameCategory, ...rest].slice(0, RECOMMENDED_COUNT);
}

export interface ProductDetailProps {
  dress: Dress;
}

export function ProductDetail({ dress }: ProductDetailProps) {
  const { name, fitCategory, colour, silhouette, price, whyItWorks, fabric, care, modelSize, image } = dress;
  const recommended = recommendedDresses(dress);

  return (
    <Container className="py-12 sm:py-16">
      <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-gray-500">
        <Link href="/shop" className="transition-colors duration-[250ms] ease-out hover:text-black">
          Shop
        </Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-black">{name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* One editorial crop — the dress's own image, no gallery */}
        <ImageFrame
          src={image}
          alt={`${name} — ${colour}`}
          aspectRatio="portrait"
          className="bg-cream"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />

        <div>
          {/* 1 — name + price */}
          <Heading as="h1" size="xl">{name}</Heading>
          <Price amount={price} size="lg" className="mt-3 block" />
          <Text variant="secondary" size="xs" className="mt-1">{c.priceNote}</Text>

          {/* 2 — fit focus */}
          <div className="mt-6">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              {c.fitFocusLabel}: {CATEGORY_LABELS[fitCategory]}
            </p>
            <Text variant="secondary" size="sm" className="mt-1">{copy.shopByFit[fitCategory]}</Text>
            <Text variant="secondary" size="sm" className="mt-1">{silhouette}</Text>
          </div>

          {/* 3 — Why It Works (the centrepiece) */}
          <section className="mt-8">
            <Heading as="h2" size="sm">{c.whyItWorksHeading}</Heading>
            <ul className="mt-4 space-y-2">
              {whyItWorks.map((point) => (
                <li
                  key={point}
                  className="relative pl-4 text-sm text-gray-600 before:absolute before:left-0 before:font-bold before:text-black before:content-['·']"
                >
                  {point}
                </li>
              ))}
            </ul>
          </section>
          {/* 4, 5 — fabric + care */}
          <section className="mt-8">
            <Heading as="h2" size="sm">{c.detailsHeading}</Heading>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-gray-500">{c.fabricLabel}</dt>
                <dd className="text-gray-600">{fabric}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-gray-500">{c.careLabel}</dt>
                <dd className="text-gray-600">{care}</dd>
              </div>
            </dl>
          </section>

          {/* 6, 7, 8 — size selector, model size, size-guide link */}
          <section className="mt-8">
            <h2 id="size-label" className="font-body text-sm font-medium uppercase tracking-wide">
              {c.sizeLabel}
            </h2>
            <div role="group" aria-labelledby="size-label" className="mt-3">
              <SizeSelector />
            </div>
            <Text variant="secondary" size="xs" className="mt-3">{c.modelLabel} {modelSize}.</Text>
            <Link
              href="/size-guide"
              className="mt-2 inline-block text-xs uppercase tracking-wide text-black underline underline-offset-4 transition-opacity duration-[250ms] ease-out hover:opacity-60"
            >
              {c.sizeGuideLink}
            </Link>
          </section>

          {/* 9, 10, 11 — shipping, returns, payment */}
          <section className="mt-8">
            <dl className="border-y border-gray-200 divide-y divide-gray-200">
              {c.info.map((block) => (
                <div key={block.heading} className="py-4">
                  <dt className="text-sm font-medium uppercase tracking-wide">{block.heading}</dt>
                  <dd className="mt-1 text-sm text-gray-600">{block.body}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
      {/* 12 — reviews */}
      <section className="mt-16 sm:mt-20" aria-labelledby="reviews-heading">
        <div className="flex items-baseline gap-4">
          <Heading as="h2" id="reviews-heading" size="md">{c.reviews.heading}</Heading>
          <span className="text-sm text-gray-600">{c.reviews.rating.toFixed(1)} / 5</span>
        </div>
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {c.reviews.items.map((r) => (
            <li key={r.author} className="border border-gray-200 p-5">
              <Text variant="secondary" size="sm" className="leading-relaxed">{r.quote}</Text>
              <p className="mt-3 text-xs uppercase tracking-wide text-gray-500">{r.author}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 13 — recommended dresses (reuses the shared grid) */}
      <section className="mt-16 sm:mt-20" aria-labelledby="recommended-heading">
        <Heading as="h2" id="recommended-heading" size="md">{c.recommendedHeading}</Heading>
        <div className="mt-8">
          <CollectionGrid dresses={recommended} headingLevel={3} />
        </div>
      </section>
    </Container>
  );
}
