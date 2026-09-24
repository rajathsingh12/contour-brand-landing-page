import type { ReactNode } from "react";
import { Container, Heading, Text, Divider } from "@/components/ui";

export interface EditorialPageProps {
  headline: string;
  lede?: string;
  paragraphs?: string[];
  children?: ReactNode;
}

// Shared quiet-editorial shell for the copy-led pages (/about, /our-approach,
// /size-guide): a narrow reading column, generous whitespace, and a hairline
// divider under the header. Pass `paragraphs` for a plain prose body, `children`
// for bespoke content (or both).
export function EditorialPage({ headline, lede, paragraphs, children }: EditorialPageProps) {
  return (
    <Container size="sm" className="py-20 sm:py-28">
      <header>
        <Heading as="h1" size="2xl">
          {headline}
        </Heading>
        {lede && (
          <Text size="lg" variant="secondary" className="mt-6 max-w-prose leading-relaxed">
            {lede}
          </Text>
        )}
      </header>
      <Divider className="mt-10 sm:mt-12" />
      <div className="mt-10 sm:mt-12">
        {paragraphs && (
          <div className="space-y-6">
            {paragraphs.map((para) => (
              <Text key={para} size="lg" className="max-w-prose leading-relaxed">
                {para}
              </Text>
            ))}
          </div>
        )}
        {children}
      </div>
    </Container>
  );
}
