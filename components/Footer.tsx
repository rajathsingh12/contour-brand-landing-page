import Link from "next/link";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/fit-finder", label: "Fit Finder" },
  { href: "/size-guide", label: "Size Guide" },
  { href: "/about", label: "Our Approach" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <p className="font-display text-lg font-normal tracking-widest uppercase">CONTOUR</p>
            <p className="mt-2 text-sm text-gray-600 max-w-xs">
              Dresses designed around your proportions.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-gray-600 hover:text-black transition-colors duration-[250ms] ease-out"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-4">
            {["Instagram", "Twitter"].map((s) => (
              <span key={s} className="text-sm text-gray-600">{s}</span>
            ))}
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Contour. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
