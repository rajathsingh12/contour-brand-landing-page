import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dresses } from "@/data/dresses";
import { copy } from "@/data/copy";
import { Container, Heading, Text } from "@/components/ui";
import { CollectionGrid } from "@/components/product";
import { CATEGORY_LABELS, CATEGORY_SLUGS, slugToCategory } from "@/lib/shop/categories";

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const category = slugToCategory((await params).category);
  if (!category) return { title: "Not found — Contour" };
  return {
    title: `${CATEGORY_LABELS[category]} — Shop by Fit — Contour`,
    description: copy.shopByFit[category],
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const category = slugToCategory((await params).category);
  if (!category) notFound();

  const label = CATEGORY_LABELS[category];
  const items = dresses.filter((d) => d.fitCategory === category);

  return (
    <Container className="py-16 sm:py-20">
      <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-gray-500">
        <Link href="/shop-by-fit" className="transition-colors duration-[250ms] ease-out hover:text-black">
          Shop by Fit
        </Link>
        <span aria-hidden="true" className="mx-2">
          /
        </span>
        <span className="text-black">{label}</span>
      </nav>
      <header className="mt-6 max-w-2xl">
        <Heading as="h1" size="2xl">
          {label}
        </Heading>
        <Text variant="secondary" size="lg" className="mt-4">
          {copy.shopByFit[category]}
        </Text>
      </header>
      <div className="mt-12 sm:mt-16">
        <CollectionGrid dresses={items} priorityCount={3} />
      </div>
    </Container>
  );
}
