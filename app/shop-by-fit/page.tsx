import type { Metadata } from "next";
import { FIT_CATEGORIES } from "@/data/dresses";
import { copy } from "@/data/copy";
import { Container, Heading, Text } from "@/components/ui";
import { CategoryCard } from "@/components/shop";

export const metadata: Metadata = {
  title: "Shop by Fit — Contour",
  description:
    "Five fit concerns — arms, bust, tummy, waist, hips & thighs. Find dresses designed around what you'd like to fit better.",
};

export default function ShopByFitPage() {
  return (
    <Container className="py-16 sm:py-20">
      <header className="max-w-2xl">
        <Heading as="h1" size="2xl">
          {copy.home.shopByFit.headline}
        </Heading>
        <Text variant="secondary" size="lg" className="mt-4">
          {copy.brand.supportingProposition}
        </Text>
      </header>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {FIT_CATEGORIES.map((category) => (
          <CategoryCard key={category} category={category} />
        ))}
      </div>
    </Container>
  );
}
