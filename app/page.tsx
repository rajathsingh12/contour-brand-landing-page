import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { dresses, FIT_CATEGORIES } from "@/data/dresses";
import { copy } from "@/data/copy";
import { Container, Heading, Text } from "@/components/ui";
import { CategoryCard } from "@/components/shop";
import { CollectionGrid } from "@/components/product";
import { FitFinder } from "@/components/fit-finder";

export const metadata: Metadata = {
  title: "Contour — Sculpted by Design",
  description:
    "Sophisticated dresses designed around your proportions. Fifteen dresses, sizes L–4XL, one price across every size.",
};

const ctaBase =
  "inline-flex items-center justify-center px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-[250ms] ease-out focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory";

export default function HomePage() {
  return (
    <>
      {/* Section 1 — Hero */}
      <section className="bg-black text-ivory">
        <div className="grid lg:min-h-[80vh] lg:grid-cols-2">
          <div className="relative order-1 min-h-[48vh] lg:order-2 lg:min-h-full">
            <Image
              src="/images/hero/hero-section-image.png"
              alt="Contour editorial — sculpted by design"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="order-2 flex flex-col justify-center px-6 py-16 sm:px-10 lg:order-1 lg:px-16 lg:py-24">
            <p className="text-xs uppercase tracking-[0.25em] text-stone">{copy.brand.lockup}</p>
            <Heading
              as="h1"
              size="2xl"
              className="mt-6 leading-[1.05] text-ivory sm:text-6xl lg:text-7xl"
            >
              {copy.hero.headline}
            </Heading>
            <div className="mt-8 space-y-1">
              {copy.brand.statement.map((line) => (
                <p key={line} className="font-display text-lg tracking-wide text-ivory sm:text-xl">
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/shop" className={`${ctaBase} bg-ivory text-black hover:bg-warm-white`}>
                {copy.hero.ctaPrimary}
              </Link>
              <Link
                href="/fit-finder"
                className={`${ctaBase} border border-ivory text-ivory hover:bg-ivory hover:text-black`}
              >
                {copy.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Dresses Designed Differently */}
      <section className="bg-ivory">
        <Container className="py-16 sm:py-24">
          <Heading as="h2" size="2xl" className="max-w-3xl">
            {copy.home.designedDifferently.headline}
          </Heading>
          <Text variant="secondary" size="lg" className="mt-6 max-w-2xl">
            {copy.home.designedDifferently.body}
          </Text>
          <p className="mt-10 text-xs uppercase tracking-[0.25em] text-gray-500">
            {copy.home.designedDifferently.display}
          </p>
        </Container>
      </section>

      {/* Section 3 — Shop by Fit */}
      <section className="bg-cream">
        <Container className="py-16 sm:py-24">
          <Heading as="h2" size="2xl">
            {copy.home.shopByFit.headline}
          </Heading>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-5">
            {FIT_CATEGORIES.map((category) => (
              <CategoryCard key={category} category={category} headingLevel={3} />
            ))}
          </div>
        </Container>
      </section>

      {/* Section 4 — The Contour Collection */}
      <section className="bg-ivory">
        <Container className="py-16 sm:py-24">
          <Heading as="h2" size="2xl">
            {copy.home.collection.headline}
          </Heading>
          <div className="mt-10 sm:mt-14">
            <CollectionGrid dresses={dresses} headingLevel={3} />
          </div>
        </Container>
      </section>

      {/* Section 5 — Not Sized Up. Thought Through. */}
      <section className="bg-black text-ivory">
        <Container className="py-20 sm:py-28">
          <Heading as="h2" size="2xl" className="text-ivory">
            {copy.home.thoughtThrough.headline}
          </Heading>
          <div className="mt-8 max-w-2xl space-y-5">
            {copy.home.thoughtThrough.body.map((line) => (
              <p key={line} className="font-body text-lg leading-relaxed text-ivory">
                {line}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 6 — Fit Finder */}
      <section id="fit-finder" className="bg-warm-white">
        <Container className="py-16 sm:py-24">
          <Heading as="h2" size="2xl">
            {copy.home.fitFinder.headline}
          </Heading>
          <Text variant="secondary" size="lg" className="mt-4 max-w-2xl">
            {copy.home.fitFinder.subheading}
          </Text>
          <div className="mt-10">
            <FitFinder />
          </div>
        </Container>
      </section>

      {/* Section 7 — Your Size. Your Price. */}
      <section className="bg-cream">
        <Container className="py-16 sm:py-24">
          <Heading as="h2" size="2xl">
            {copy.home.sizePrice.headline}
          </Heading>
          <Text variant="secondary" size="lg" className="mt-6 max-w-2xl">
            {copy.home.sizePrice.body}
          </Text>
          <Link
            href="/size-guide"
            className="mt-8 inline-block text-xs uppercase tracking-[0.2em] text-black underline underline-offset-4 hover:no-underline"
          >
            {copy.home.sizePrice.cta}
          </Link>
        </Container>
      </section>

      {/* Section 8 — Why Contour */}
      <section className="bg-ivory">
        <Container className="py-16 sm:py-24">
          <Heading as="h2" size="2xl">
            {copy.home.about.headline}
          </Heading>
          <div className="mt-8 max-w-2xl space-y-5">
            {copy.home.about.body.map((line) => (
              <Text key={line} as="p" variant="secondary" size="lg">
                {line}
              </Text>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
