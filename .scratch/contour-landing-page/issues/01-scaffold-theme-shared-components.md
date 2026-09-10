# 01 — Scaffold, theme system & shared components

**What to build:** A running Next.js + TypeScript + Tailwind project with the full Contour design system: Google Fonts (Playfair Display headings + DM Sans body), CSS custom property colour system with 4 switchable themes (Burgundy default, Sage, Midnight, Ember), `data-theme` on `<html>` with `localStorage` persistence, and all shared UI components — Header (nav with Shop dropdown, Shop by Fit dropdown, Fit Finder link, Size Guide link, Our Approach link, theme switcher palette icon), Footer (brand tagline, nav links, social placeholder), ProductCard (image, name, price, silhouette tag badges, link), and SilhouetteBadge (styled pill for each of the 7 tags). `npm run dev` serves the shell with working nav and theme switching.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] `npx create-next-app` with TypeScript + Tailwind + App Router
- [ ] Vitest configured and runnable (`npm test` works with zero tests)
- [ ] Playfair Display + DM Sans loaded via `next/font/google`, applied globally
- [ ] CSS custom properties for 4 themes defined; `data-theme` attribute switches them
- [ ] Theme persisted to `localStorage`, default is Burgundy
- [ ] Theme switcher in header: palette icon → 4-swatch dropdown → one click recolours entire site
- [ ] Tailwind config extended with custom colours referencing CSS vars
- [ ] Header component with full nav structure per AGENTS.md (Home, Shop dropdown, Shop by Fit dropdown, Fit Finder, Size Guide, Our Approach)
- [ ] Footer component with brand name, tagline, nav links, placeholder social
- [ ] ProductCard component: image, name, price, SilhouetteBadge pills, clickable
- [ ] SilhouetteBadge component: styled pill for SMOOTH / DEFINE / BALANCE / LENGTHEN / ENHANCE / SKIM / STRUCTURE
- [ ] Desktop-first layout with basic responsive (doesn't break on mobile)
