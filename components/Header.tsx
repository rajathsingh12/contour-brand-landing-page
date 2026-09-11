"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ModeToggle } from "./ModeToggle";

const SHOP_LINKS = [
  { href: "/shop", label: "All" },
  { href: "/shop?category=top", label: "Tops" },
  { href: "/shop?category=dress", label: "Dresses" },
  { href: "/shop?category=trouser", label: "Trousers" },
  { href: "/shop?category=coord", label: "Co-ords" },
  { href: "/shop?category=workwear", label: "Workwear" },
  { href: "/shop?category=partywear", label: "Partywear" },
];

const FIT_LINKS = [
  { href: "/shop?fit=smooth", label: "Smooth" },
  { href: "/shop?fit=define", label: "Define" },
  { href: "/shop?fit=balance", label: "Balance" },
  { href: "/shop?fit=lengthen", label: "Lengthen" },
  { href: "/shop?fit=enhance", label: "Enhance" },
  { href: "/shop?fit=skim", label: "Skim" },
  { href: "/shop?fit=structure", label: "Structure" },
];

const NAV_LINK_CLASS = "text-sm font-medium tracking-wide uppercase hover:text-c-accent transition-colors";

function Dropdown({ label, links }: { label: string; links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className={NAV_LINK_CLASS}>
        {label}
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-2 z-50">
          <div className="bg-c-surface border border-c-border rounded-lg shadow-lg py-2 min-w-[160px]">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block px-4 py-2 text-sm hover:bg-c-accent-light hover:text-c-accent transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-c-surface/95 backdrop-blur border-b border-c-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-heading text-xl font-bold tracking-widest uppercase">
            Contour
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={NAV_LINK_CLASS}>Home</Link>
            <Dropdown label="Shop" links={SHOP_LINKS} />
            <Dropdown label="Shop by Fit" links={FIT_LINKS} />
            <Link href="/fit-finder" className={NAV_LINK_CLASS}>Fit Finder</Link>
            <Link href="/size-guide" className={NAV_LINK_CLASS}>Size Guide</Link>
            <Link href="/about" className={NAV_LINK_CLASS}>Our Approach</Link>
          </nav>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <ThemeSwitcher />
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {mobileOpen ? (
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
                ) : (
                  <>
                    <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.5" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-c-border bg-c-surface px-4 py-4 space-y-3">
          <Link href="/" className="block text-sm font-medium uppercase">Home</Link>
          <div className="text-xs font-bold uppercase text-c-text-secondary mt-3">Shop</div>
          {SHOP_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="block text-sm pl-3">{l.label}</Link>
          ))}
          <div className="text-xs font-bold uppercase text-c-text-secondary mt-3">Shop by Fit</div>
          {FIT_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="block text-sm pl-3">{l.label}</Link>
          ))}
          <Link href="/fit-finder" className="block text-sm font-medium uppercase">Fit Finder</Link>
          <Link href="/size-guide" className="block text-sm font-medium uppercase">Size Guide</Link>
          <Link href="/about" className="block text-sm font-medium uppercase">Our Approach</Link>
        </nav>
      )}
    </header>
  );
}
