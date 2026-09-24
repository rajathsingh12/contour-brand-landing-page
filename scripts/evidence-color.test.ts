import { describe, it, expect } from "vitest";
import {
  parseCssColor,
  rgbToHsl,
  loadPalette,
  buildColorAudit,
  SATURATION_MAX,
  type Observation,
} from "./evidence-color.mts";

// A minimal palette standing in for lib/design/tokens.ts.
const PALETTE = loadPalette(`
  black: "#000000",
  warmWhite: "#ffffff",
  ivory: "#faf8f6",
  taupe: "#9b8b7e",
  burgundy: "#612e3b",
  gray500: "#666666",
  gray300: "#b3b3b3",
  gray100: "#ececec",
  cream: "#f5f0eb",
  deepNavy: "#223049",
`);

const obs = (color: string, route = "/x", prop = "color", sample = "div"): Observation => ({ color, route, prop, sample });

describe("parseCssColor", () => {
  it("parses legacy rgb / rgba", () => {
    expect(parseCssColor("rgb(0, 0, 0)")).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    expect(parseCssColor("rgba(97, 46, 59, 0.5)")).toEqual({ r: 97, g: 46, b: 59, a: 0.5 });
  });
  it("parses modern slash syntax", () => {
    expect(parseCssColor("rgb(34 48 73 / 50%)")).toEqual({ r: 34, g: 48, b: 73, a: 0.5 });
  });
  it("skips transparent / none / fully-transparent", () => {
    expect(parseCssColor("transparent")).toBeNull();
    expect(parseCssColor("none")).toBeNull();
    expect(parseCssColor("rgba(255, 0, 0, 0)")).toBeNull();
  });
});

describe("rgbToHsl", () => {
  it("reports zero saturation for greys/black/white", () => {
    expect(rgbToHsl({ r: 0, g: 0, b: 0 }).s).toBe(0);
    expect(rgbToHsl({ r: 255, g: 255, b: 255 }).s).toBe(0);
    expect(rgbToHsl({ r: 102, g: 102, b: 102 }).s).toBe(0);
  });
  it("reports full saturation for pure red", () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 0 }).s).toBe(1);
  });
});

describe("loadPalette", () => {
  it("parses the flat hex map and throws on a degenerate file", () => {
    expect(PALETTE.find((t) => t.name === "burgundy")?.hex).toBe("#612e3b");
    expect(() => loadPalette("export const motion = { duration: 250 }")).toThrow();
  });
});

describe("buildColorAudit", () => {
  it("passes token colours, black, white and transparent", () => {
    const audit = buildColorAudit(
      [obs("rgb(0, 0, 0)"), obs("rgb(255, 255, 255)"), obs("rgb(97, 46, 59)"), obs("transparent"), obs("rgb(155, 139, 126)")],
      PALETTE,
    );
    expect(audit.pass).toBe(true);
    expect(audit.offenders).toHaveLength(0);
    expect(audit.checkedColors).toBe(4); // transparent skipped
  });

  it("fails a saturated colour on the saturation rule", () => {
    const audit = buildColorAudit([obs("rgb(255, 0, 0)")], PALETTE);
    expect(audit.pass).toBe(false);
    expect(audit.offenders[0].reasons.some((r) => r.includes("saturation"))).toBe(true);
  });

  it("fails an off-token muted colour on the tolerance rule", () => {
    // Desaturated slate (s below the ceiling) but far from every token.
    const audit = buildColorAudit([obs("rgb(120, 140, 120)")], PALETTE);
    expect(audit.pass).toBe(false);
    expect(audit.offenders[0].reasons.some((r) => r.includes("off-token"))).toBe(true);
    expect(audit.offenders[0].reasons.some((r) => r.includes("saturation"))).toBe(false);
  });

  it("dedupes a colour across routes and records where it appeared", () => {
    const audit = buildColorAudit(
      [obs("rgb(255, 0, 0)", "/a", "color", "h1"), obs("rgb(255, 0, 0)", "/b", "background-color", "button")],
      PALETTE,
    );
    expect(audit.offenders).toHaveLength(1);
    expect(audit.offenders[0].routes.sort()).toEqual(["/a", "/b"]);
    expect(audit.offenders[0].props.sort()).toEqual(["background-color", "color"]);
  });

  it("respects the documented saturation ceiling", () => {
    expect(SATURATION_MAX).toBe(0.4);
  });
});
