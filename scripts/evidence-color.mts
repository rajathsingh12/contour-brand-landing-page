// Load-bearing brand gate: the colour auditor. Pure functions only — the
// orchestrator (scripts/evidence.mts) crawls computed colours from every route
// and feeds them here. Fails on any colour with HSL saturation > 40% (the
// "no neon / no saturated colour" rule) or any colour that isn't within
// tolerance of a palette token from lib/design/tokens.ts.

export const SATURATION_MAX = 0.4; // HSL saturation ceiling (ticket 02 constraint)
// ponytail: RGB Euclidean tolerance for token match. Components render exact
// token hexes via the @theme vars, so matches are normally Δ0; 8 absorbs
// sub-integer rounding without letting a real off-brand colour slip through.
export const TOKEN_TOLERANCE = 8;

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface PaletteToken {
  name: string;
  hex: string;
  rgb: Rgb;
}

export interface Observation {
  color: string; // raw computed value, e.g. "rgb(0, 0, 0)" / "rgba(97, 46, 59, 0.5)"
  route: string;
  prop: string; // which CSS property it came from
  sample: string; // a selector-ish hint at the source element
}

export interface Offender {
  color: string;
  rgb: Rgb;
  hsl: { h: number; s: number; l: number };
  reasons: string[];
  routes: string[];
  props: string[];
  samples: string[];
}

export interface ColorAudit {
  pass: boolean;
  saturationMax: number;
  tolerance: number;
  checkedColors: number;
  paletteSize: number;
  offenders: Offender[];
}

export function hexToRgb(hex: string): Rgb {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

// Parses whatever getComputedStyle returns (legacy `rgba(r, g, b, a)` and
// modern `rgb(r g b / a)`). Returns null for transparent / none / unparseable
// so the caller skips them.
export function parseCssColor(input: string): (Rgb & { a: number }) | null {
  const s = input.trim().toLowerCase();
  if (!s || s === "transparent" || s === "none" || s === "currentcolor") return null;
  const nums = s.replace(/^rgba?\(/, "").replace(/\)$/, "").split(/[,/\s]+/).filter(Boolean);
  if (nums.length < 3) return null;
  const toChannel = (v: string) => (v.endsWith("%") ? Math.round((parseFloat(v) / 100) * 255) : Math.round(parseFloat(v)));
  const r = toChannel(nums[0]);
  const g = toChannel(nums[1]);
  const b = toChannel(nums[2]);
  const a = nums[3] === undefined ? 1 : nums[3].endsWith("%") ? parseFloat(nums[3]) / 100 : parseFloat(nums[3]);
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  if (a === 0) return null; // fully transparent → nothing rendered
  return { r, g, b, a };
}

export function rgbToHsl({ r, g, b }: Rgb): { h: number; s: number; l: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === rn) h = ((gn - bn) / d) % 6;
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  return { h, s, l };
}

function distance(a: Rgb, b: Rgb): number {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

export function nearestToken(rgb: Rgb, palette: PaletteToken[]): { token: PaletteToken; distance: number } {
  let best = palette[0];
  let bestD = Infinity;
  for (const t of palette) {
    const d = distance(rgb, t.rgb);
    if (d < bestD) { bestD = d; best = t; }
  }
  return { token: best, distance: bestD };
}

// Regex-parses the flat `name: "#hex"` map in lib/design/tokens.ts. Reading the
// source of truth as text sidesteps Node's TS-ESM import quirks; the sanity
// assert fails loudly if the token file ever stops being a flat hex map.
export function loadPalette(tokensSource: string): PaletteToken[] {
  const out: PaletteToken[] = [];
  const seen = new Set<string>();
  for (const m of tokensSource.matchAll(/(\w+)\s*:\s*"(#[0-9a-fA-F]{6})"/g)) {
    if (seen.has(m[1])) continue;
    seen.add(m[1]);
    out.push({ name: m[1], hex: m[2].toLowerCase(), rgb: hexToRgb(m[2]) });
  }
  if (out.length < 10) throw new Error(`loadPalette: only ${out.length} tokens parsed — tokens.ts format changed?`);
  return out;
}

export function buildColorAudit(observations: Observation[], palette: PaletteToken[]): ColorAudit {
  const byColor = new Map<string, Offender>();
  let checked = 0;
  for (const o of observations) {
    const parsed = parseCssColor(o.color);
    if (!parsed) continue;
    const rgb = { r: parsed.r, g: parsed.g, b: parsed.b };
    const key = `${rgb.r},${rgb.g},${rgb.b}`;
    let entry = byColor.get(key);
    if (!entry) {
      checked++;
      const hsl = rgbToHsl(rgb);
      const near = nearestToken(rgb, palette);
      const reasons: string[] = [];
      if (hsl.s > SATURATION_MAX) reasons.push(`saturation ${(hsl.s * 100).toFixed(1)}% > ${SATURATION_MAX * 100}%`);
      if (near.distance > TOKEN_TOLERANCE) reasons.push(`off-token (nearest ${near.token.name} ${near.token.hex}, Δ${near.distance.toFixed(1)})`);
      entry = { color: o.color, rgb, hsl, reasons, routes: [], props: [], samples: [] };
      byColor.set(key, entry);
    }
    if (!entry.routes.includes(o.route)) entry.routes.push(o.route);
    if (!entry.props.includes(o.prop)) entry.props.push(o.prop);
    if (entry.samples.length < 3 && !entry.samples.includes(o.sample)) entry.samples.push(o.sample);
  }
  const offenders: Offender[] = [];
  for (const e of byColor.values()) {
    if (e.reasons.length > 0) offenders.push(e);
  }
  return {
    pass: offenders.length === 0,
    saturationMax: SATURATION_MAX,
    tolerance: TOKEN_TOLERANCE,
    checkedColors: checked,
    paletteSize: palette.length,
    offenders,
  };
}
