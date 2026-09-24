import Link from "next/link";
import { Container, Heading, Text } from "@/components/ui";
import { copy } from "@/data/copy";

// Renders inside the root layout (Header + Footer stay), so an unknown dress or
// category — from notFound() in the dynamic routes — degrades to a quiet,
// on-palette placeholder instead of the stark default 404 or a blank route.
const CTA_PRIMARY =
  "inline-flex items-center justify-center border border-black bg-black px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors duration-[250ms] ease-out hover:bg-charcoal focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";
const CTA_SECONDARY =
  "inline-flex items-center justify-center px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-black underline underline-offset-4 transition-colors duration-[250ms] ease-out hover:no-underline focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <Heading as="h1" size="2xl">
        {copy.notFound.heading}
      </Heading>
      <Text variant="secondary" size="lg" className="mt-6 max-w-xl">
        {copy.notFound.body}
      </Text>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link href="/" className={CTA_PRIMARY}>
          {copy.notFound.ctaHome}
        </Link>
        <Link href="/shop" className={CTA_SECONDARY}>
          {copy.notFound.ctaShop}
        </Link>
      </div>
    </Container>
  );
}
