import type { Metadata } from "next";
import { copy } from "@/data/copy";
import { Container, Heading, Text } from "@/components/ui";
import { FitFinder } from "@/components/fit-finder";

export const metadata: Metadata = {
  title: "Fit Finder — Contour",
  description:
    "Tell us what you'd like your dress to fit better — arms, bust, tummy, waist, hips & thighs — and see the Contour dresses designed around it.",
};

const c = copy.home.fitFinder;

export default function FitFinderPage() {
  return (
    <Container className="py-16 sm:py-20">
      <header className="max-w-2xl">
        <Heading as="h1" size="2xl">
          {c.headline}
        </Heading>
        <Text variant="secondary" size="lg" className="mt-4">
          {c.subheading}
        </Text>
      </header>
      <div className="mt-12 sm:mt-16">
        <FitFinder />
      </div>
    </Container>
  );
}
