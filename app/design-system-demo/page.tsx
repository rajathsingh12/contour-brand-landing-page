import {
  Button,
  Heading,
  Text,
  Container,
  Divider,
  Price,
  SizeSelector,
  ImageFrame,
} from "@/components/ui";

export default function DesignSystemDemo() {
  return (
    <Container className="py-12 space-y-16">
      <section>
        <Heading as="h1" size="3xl" className="mb-4">
          Design System Demo
        </Heading>
        <Text variant="secondary">
          Testing UI primitives with real and edge-case data
        </Text>
      </section>

      <Divider />

      {/* Typography */}
      <section className="space-y-6">
        <Heading as="h2" size="2xl">
          Typography
        </Heading>
        <div className="space-y-4">
          <Heading as="h1" size="3xl">
            Heading XL — SCULPTED BY DESIGN
          </Heading>
          <Heading as="h2" size="2xl">
            Heading 2XL — The Elongated Sleeve Dress
          </Heading>
          <Heading as="h3" size="xl">
            Heading XL — Dresses designed around your proportions
          </Heading>
          <Text size="lg">
            Body Large — Sophisticated dresses designed around your proportions.
          </Text>
          <Text size="base">
            Body Base — Not sized up. Thought through. Five fit concerns, fifteen dresses, designed for real bodies.
          </Text>
          <Text size="sm" variant="secondary">
            Body Small Secondary — L–4XL · Same price across sizes
          </Text>
        </div>
      </section>

      <Divider />

      {/* Buttons */}
      <section className="space-y-6">
        <Heading as="h2" size="2xl">
          Buttons
        </Heading>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="lg">
            Shop The Collection
          </Button>
          <Button variant="secondary" size="md">
            Find Your Fit
          </Button>
          <Button variant="ghost" size="sm">
            View Size Guide
          </Button>
          <Button variant="primary" size="md" disabled>
            Disabled Button
          </Button>
        </div>
      </section>

      <Divider />

      {/* Price */}
      <section className="space-y-6">
        <Heading as="h2" size="2xl">
          Price
        </Heading>
        <div className="flex gap-6">
          <Price amount={1099} size="sm" />
          <Price amount={1299} size="md" />
          <Price amount={1499} size="lg" />
        </div>
      </section>

      <Divider />

      {/* Size Selector */}
      <section className="space-y-6">
        <Heading as="h2" size="2xl">
          Size Selector
        </Heading>
        <SizeSelector />
      </section>

      <Divider />

      {/* Image Frame */}
      <section className="space-y-6">
        <Heading as="h2" size="2xl">
          Image Frame
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Text size="sm" variant="secondary" className="mb-2">
              Portrait (broken image)
            </Text>
            <ImageFrame
              src="/images/nonexistent.jpg"
              alt="Missing image test"
              aspectRatio="portrait"
            />
          </div>
          <div>
            <Text size="sm" variant="secondary" className="mb-2">
              Square (empty src)
            </Text>
            <ImageFrame src="" alt="Empty src test" aspectRatio="square" />
          </div>
          <div>
            <Text size="sm" variant="secondary" className="mb-2">
              Landscape
            </Text>
            <ImageFrame
              src="/placeholder.jpg"
              alt="Placeholder"
              aspectRatio="landscape"
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* Edge cases */}
      <section className="space-y-6">
        <Heading as="h2" size="2xl">
          Edge Cases
        </Heading>
        <div className="space-y-4 max-w-md">
          <div className="border border-gray-200 p-4">
            <Heading as="h3" size="md" className="mb-2">
              The Super Long Dress Name That Goes On And On And Tests Layout Breaking With Really Excessive Length
            </Heading>
            <Price amount={1499} />
            <Text size="sm" variant="secondary" className="mt-2">
              Testing longest dress name edge case
            </Text>
          </div>
        </div>
      </section>
    </Container>
  );
}
