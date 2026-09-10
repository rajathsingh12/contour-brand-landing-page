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
    <footer className="border-t border-c-border bg-c-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <p className="font-heading text-lg font-bold tracking-widest uppercase">Contour</p>
            <p className="mt-2 text-sm text-c-text-secondary max-w-xs">
              Fashion engineered for your shape. Without the premium price.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-c-text-secondary hover:text-c-accent transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-4">
            {["Instagram", "Twitter"].map((s) => (
              <span key={s} className="text-sm text-c-text-secondary">{s}</span>
            ))}
          </div>
        </div>
        <p className="mt-8 text-xs text-c-text-secondary">
          &copy; {new Date().getFullYear()} Contour. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
