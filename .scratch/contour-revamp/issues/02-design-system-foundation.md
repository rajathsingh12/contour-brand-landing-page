# 02 — Design system foundation + shared UI primitives

**What to build:** The visual foundation and the reusable primitives every page is built from — design tokens (palette, type scale, spacing, motion) wired into Tailwind v4, self-hosted fonts, and a small set of shared components with no business logic. Verifiable by rendering the primitives in isolation with real and edge-case data.

**Blocked by:** 01 (Price and SizeSelector consume the dress / price / size types).

**Status:** ready-for-agent

**Hard constraints:** Disciplined palette of black + warm neutrals (ivory, charcoal, taupe, stone, cream) with muted accents only — every colour a named token, zero saturated or neon colour anywhere (saturation ≤ 40%). Zero rounded-corner drop-shadow cards; hairline (1px) borders and restrained UI only. Motion ≤ 400ms, ease-out, `prefers-reduced-motion` honoured; no parallax, no autoplay carousels, no flashy animation. SizeSelector offers exactly L–4XL.

- [ ] `lib/design/`: approved palette as named hex tokens covering every colour family in the brief; type scale (editorial serif display + grotesk sans body via `next/font`, self-hosted + preloaded; default Fraunces + Inter); spacing scale; motion spec.
- [ ] Tailwind v4 `@theme` consumes the tokens so no raw hex appears in components.
- [ ] `components/ui/`: Button, Heading/Text, Container, Divider, Price (renders ₹, one price), SizeSelector (L–4XL), ImageFrame (fixed aspect ratio + quiet placeholder on broken/missing image).
- [ ] Legacy theme scaffolding (ModeToggle, ThemeSwitcher, ThemeScript, use-theme) removed — single palette only, no day/night toggle.
- [ ] Primitives render correctly with edge-case data (longest dress name, missing image) without layout break.
