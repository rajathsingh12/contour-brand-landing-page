"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Container } from "@/components/ui";
import { copy } from "@/data/copy";
import { CartDrawer } from "./CartDrawer";

// Labels are verbatim from data/copy.ts; routes are structural (AGENTS.md route map).
const NAV_HREFS: Record<string, string> = {
  SHOP: "/shop",
  "SHOP BY FIT": "/shop-by-fit",
  "FIT FINDER": "/fit-finder",
  "OUR APPROACH": "/our-approach",
  "SIZE GUIDE": "/size-guide",
  ABOUT: "/about",
};
const navItems = copy.nav.primary.map((label) => ({ label, href: NAV_HREFS[label] }));

const NAV_LINK = "text-sm uppercase tracking-wide text-charcoal transition-colors duration-[250ms] ease-out hover:text-black";
const ICON_BTN = "p-2 text-charcoal transition-colors duration-[250ms] ease-out hover:text-black";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartBtnRef = useRef<HTMLButtonElement>(null);

  const closeCart = () => {
    setCartOpen(false);
    cartBtnRef.current?.focus();
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-ivory">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="font-display text-xl uppercase tracking-widest">
              {copy.nav.brand}
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
              {navItems.map((i) => (
                <Link key={i.href} href={i.href} className={NAV_LINK}>
                  {i.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              {/* ponytail: search + account are present affordances (spec-required);
                  wire destinations when search / accounts ship (post-MVP). */}
              <button type="button" aria-label={copy.nav.utility.search} className={ICON_BTN}>
                <Icon>
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M13.5 13.5L18 18" stroke="currentColor" strokeWidth="1.5" />
                </Icon>
              </button>
              <button type="button" aria-label={copy.nav.utility.account} className={ICON_BTN}>
                <Icon>
                  <circle cx="10" cy="6.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3.5 17c0-3.5 2.9-5.5 6.5-5.5s6.5 2 6.5 5.5" stroke="currentColor" strokeWidth="1.5" />
                </Icon>
              </button>
              <button
                ref={cartBtnRef}
                type="button"
                aria-label={copy.nav.utility.cart}
                aria-haspopup="dialog"
                aria-expanded={cartOpen}
                onClick={() => setCartOpen(true)}
                className={ICON_BTN}
              >
                <Icon>
                  <path d="M5.5 6.5h9l-1 9h-7l-1-9z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M7.5 6.5a2.5 2.5 0 015 0" stroke="currentColor" strokeWidth="1.5" />
                </Icon>
              </button>
              <button
                type="button"
                aria-label="Menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}
                className={`${ICON_BTN} md:hidden`}
              >
                <Icon>
                  {mobileOpen ? (
                    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" />
                  ) : (
                    <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" />
                  )}
                </Icon>
              </button>
            </div>
          </div>
        </Container>

        {mobileOpen && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-gray-200 bg-ivory md:hidden">
            <Container>
              <ul className="flex flex-col py-2">
                {navItems.map((i) => (
                  <li key={i.href}>
                    <Link
                      href={i.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-2 ${NAV_LINK}`}
                    >
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </nav>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={closeCart} />
    </>
  );
}
