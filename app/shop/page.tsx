import type { Metadata } from "next";
import { dresses } from "@/data/dresses";
import { copy } from "@/data/copy";
import { Container, Heading, Text } from "@/components/ui";
import { CollectionGrid } from "@/components/product";

export const metadata: Metadata = {
  title: "Shop All Dresses — Contour",
  description:
    "The full Contour collection — fifteen dresses designed around your proportions. Sizes L–4XL, same price across every size.",
};

export default function ShopPage() {
  return (
    <Container className="py-16 sm:py-20">
      <header className="max-w-2xl">
        <Heading as="h1" size="2xl">
          {copy.home.collection.headline}
        </Heading>
        <Text variant="secondary" size="lg" className="mt-4">
          {copy.brand.supportingProposition}
        </Text>
      </header>
      <div className="mt-12 sm:mt-16">
        <CollectionGrid dresses={dresses} priorityCount={3} />
      </div>
    </Container>
  );
}
