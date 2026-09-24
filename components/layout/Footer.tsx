import Link from "next/link";
import { Container } from "@/components/ui";
import { copy } from "@/data/copy";

const FOOTER_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/shop-by-fit", label: "Shop by Fit" },
  { href: "/fit-finder", label: "Fit Finder" },
  { href: "/our-approach", label: "Our Approach" },
  { href: "/size-guide", label: "Size Guide" },
  { href: "/about", label: "About" },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-ivory">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <p className="font-display text-lg uppercase tracking-widest">{copy.nav.brand}</p>
            <p className="mt-3 text-sm text-gray-500">{copy.footer.tagline}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-2 sm:flex sm:flex-wrap sm:gap-x-6">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-gray-500 transition-colors duration-[250ms] ease-out hover:text-black"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="text-sm">
            <p className="uppercase tracking-wide text-charcoal">{copy.footer.payment.heading}</p>
            <p className="mt-2 text-gray-500">{copy.footer.payment.methods}</p>
          </div>
        </div>

        <p className="mt-10 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} {copy.brand.name}. {copy.brand.philosophy}
        </p>
      </Container>
    </footer>
  );
}
