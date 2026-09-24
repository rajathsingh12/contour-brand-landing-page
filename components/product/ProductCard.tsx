import Link from "next/link";
import type { Dress } from "@/data/dresses";
import { CATEGORY_LABELS } from "@/lib/shop/categories";
import { ImageFrame, Price, Text } from "@/components/ui";

export interface ProductCardProps {
  dress: Dress;
  priority?: boolean;
  headingLevel?: 2 | 3;
}

// One editorial crop per dress — no hover gallery, no multi-view. The whole card
// is a single link to the PDP, keeping one accessible link per card. headingLevel
// keeps the card subordinate to whatever heading precedes the grid (h1 on the
// listing pages, an h2 section title on the homepage). prefetch is off so a grid
// of 15+ cards doesn't prefetch 15+ PDPs into the network on view.
export function ProductCard({ dress, priority, headingLevel = 2 }: ProductCardProps) {
  const { id, name, fitCategory, colour, price, sizes, cardCopy, image } = dress;
  const sizeRange = `${sizes[0]}–${sizes[sizes.length - 1]}`;
  const NameTag = `h${headingLevel}` as "h2" | "h3";

  return (
    <article className="group">
      <Link
        href={`/products/${id}`}
        prefetch={false}
        className="block focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        <ImageFrame
          src={image}
          alt={`${name} — ${colour}`}
          aspectRatio="portrait"
          className="bg-cream"
          sizes="(min-width: 1024px) 33vw, 50vw"
          priority={priority}
        />
        <div className="mt-4">
          <p className="text-xs uppercase tracking-widest text-gray-500">
            {CATEGORY_LABELS[fitCategory]}
          </p>
          <NameTag className="mt-1 font-display text-lg leading-snug">{name}</NameTag>
          <Text variant="secondary" size="sm" className="mt-1">{cardCopy}</Text>
          <div className="mt-3 flex items-baseline justify-between">
            <Price amount={price} />
            <span className="text-xs uppercase tracking-wide text-gray-500">{sizeRange}</span>
          </div>
          <span className="mt-3 inline-block text-sm uppercase tracking-wide text-black underline underline-offset-4 transition-opacity duration-[250ms] ease-out group-hover:opacity-60">
            View Dress
          </span>
        </div>
      </Link>
    </article>
  );
}
