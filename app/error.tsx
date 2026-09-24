"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container, Heading, Text } from "@/components/ui";
import { copy } from "@/data/copy";

// Error boundaries must be Client Components. A thrown component degrades to
// this quiet, on-palette placeholder within the root layout instead of blanking
// the route. Next 16 passes `retry` (formerly `reset`) to re-render the segment.
const CTA_PRIMARY =
  "inline-flex items-center justify-center border border-black bg-black px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors duration-[250ms] ease-out hover:bg-charcoal focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";
const CTA_SECONDARY =
  "inline-flex items-center justify-center px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-black underline underline-offset-4 transition-colors duration-[250ms] ease-out hover:no-underline focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

export default function ErrorBoundary({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <Heading as="h1" size="2xl">
        {copy.error.heading}
      </Heading>
      <Text variant="secondary" size="lg" className="mt-6 max-w-xl">
        {copy.error.body}
      </Text>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <button type="button" onClick={retry} className={CTA_PRIMARY}>
          {copy.error.retry}
        </button>
        <Link href="/" className={CTA_SECONDARY}>
          {copy.error.ctaHome}
        </Link>
      </div>
    </Container>
  );
}
