// Evidence + colour-audit harness. One command: builds the app, boots it in
// prod mode, walks every route at desktop (1440) and mobile (390), and emits
// screenshots + Lighthouse + axe + console logs + a colour-audit report under
// docs/evidence/. Exits non-zero when any gate fails, so `npm run evidence` is
// the definition-of-done check for every UI ticket.
//
// Uses system Chrome via chrome-launcher (no bundled-browser download).
// Requires Node with native TypeScript execution (the repo runs Node 26).

import { spawn, type ChildProcess } from "node:child_process";
import { mkdir, writeFile, readFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { chromium, type Browser, type Page } from "playwright-core";
import { launch as launchChrome } from "chrome-launcher";
import lighthouse from "lighthouse";
import { loadPalette, buildColorAudit, type Observation, type ColorAudit } from "./evidence-color.mts";

const require = createRequire(import.meta.url);
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const evidenceDir = path.join(repoRoot, "docs", "evidence");
const PORT = Number(process.env.EVIDENCE_PORT ?? 3123);
const BREAKPOINTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "390", width: 390, height: 844 },
];
const LH_MIN = 0.95; // Lighthouse category floor
const CLS_MAX = 0.05;
const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

interface ColorHit { color: string; prop: string; sample: string }
interface RouteGate {
  route: string;
  lighthouse: Record<string, number | null>;
  cls: number | null;
  axeViolations: number;
  consoleErrors: number;
  pass: boolean;
  failures: string[];
}

// Runs in the browser: dedupes the rendered colour of every element across the
// colour-bearing CSS props. Self-contained (no closure) so Playwright can
// serialize it.
function collectColors(): ColorHit[] {
  const props = ["color", "backgroundColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor", "fill", "stroke"];
  const seen = new Map<string, ColorHit>();
  for (const el of Array.from(document.querySelectorAll("*"))) {
    const cs = getComputedStyle(el);
    const tag = el.tagName.toLowerCase();
    const cls = (el.getAttribute("class") ?? "").trim().split(/\s+/).filter(Boolean).slice(0, 2).join(".");
    const sample = cls ? `${tag}.${cls}` : tag;
    for (const p of props) {
      const v = (cs as unknown as Record<string, string>)[p];
      if (!v || v === "none" || v === "transparent" || v === "rgba(0, 0, 0, 0)") continue;
      if (!seen.has(v)) seen.set(v, { color: v, prop: p, sample });
    }
  }
  return Array.from(seen.values());
}

async function discoverRoutes(): Promise<string[]> {
  const appDir = path.join(repoRoot, "app");
  const entries = await readdir(appDir, { recursive: true });
  const routes = entries
    .filter((f) => /(^|\/)page\.(tsx|ts|jsx|js)$/.test(f.replace(/\\/g, "/")))
    .map((f) => {
      const dir = path.dirname(f.replace(/\\/g, "/"));
      return dir === "." ? "/" : `/${dir}`;
    })
    // Skip route groups (…), parallel slots @…, and dynamic segments […] — we
    // can't enumerate params for dynamic routes, so representative concrete
    // paths are added explicitly via EXTRA_ROUTES below.
    .filter((r) => !r.split("/").some((seg) => seg.startsWith("(") || seg.startsWith("@") || seg.includes("[")))
    .sort();
  return Array.from(new Set([...routes, ...EXTRA_ROUTES]));
}

// Concrete paths for dynamic routes the filesystem walk skips. One representative
// per dynamic route is enough for the gate.
// ponytail: hardcoded representative; add a line when a new dynamic route ships.
const EXTRA_ROUTES = ["/shop-by-fit/arms"];

function routeSlug(route: string): string {
  return route === "/" ? "home" : route.replace(/^\//, "");
}

function run(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: repoRoot, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(" ")} exited ${code}`))));
  });
}

async function waitForServer(url: string, tries = 120): Promise<void> {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return;
    } catch {
      // server not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`server did not become ready at ${url}`);
}

async function gotoSettled(page: Page, url: string): Promise<void> {
  await page.goto(url, { waitUntil: "load", timeout: 30_000 });
  // Best-effort network-idle: some Next prod responses keep a connection warm
  // and never fully idle, so bound the wait rather than hang the whole run.
  await page.waitForLoadState("networkidle", { timeout: 8_000 }).catch(() => {});
}

async function runLighthouse(url: string, port: number) {
  // Prefer the official desktop preset; fall back to defaults if the internal
  // path moves between lighthouse versions.
  let desktopConfig: unknown;
  try {
    desktopConfig = (await import("lighthouse/core/config/desktop-config.js")).default;
  } catch {
    desktopConfig = undefined;
  }
  const result = await lighthouse(
    url,
    { port, output: "json", logLevel: "error", onlyCategories: CATEGORIES },
    desktopConfig as never,
  );
  return result?.lhr;
}

async function main(): Promise<void> {
  const routes = await discoverRoutes();
  if (routes.length === 0) throw new Error("no static routes found under app/");
  const palette = loadPalette(await readFile(path.join(repoRoot, "lib", "design", "tokens.ts"), "utf8"));
  const axePath = require.resolve("axe-core/axe.min.js");
  console.log(`evidence: ${routes.length} route(s) → ${routes.join(", ")}`);

  await rm(evidenceDir, { recursive: true, force: true });
  await mkdir(evidenceDir, { recursive: true });

  console.log("evidence: next build");
  await run(path.join("node_modules", ".bin", "next"), ["build"]);

  const server: ChildProcess = spawn(path.join("node_modules", ".bin", "next"), ["start", "-p", String(PORT)], { cwd: repoRoot, stdio: "inherit" });
  const chrome = await launchChrome({ chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox"] });
  let browser: Browser | undefined;
  const observations: Observation[] = [];
  const gates: RouteGate[] = [];

  try {
    await waitForServer(`http://localhost:${PORT}${routes[0]}`);
    browser = await chromium.connectOverCDP(`http://localhost:${chrome.port}`);
    if (!browser) throw new Error("browser failed to connect over CDP");

    for (const route of routes) {
      const slug = routeSlug(route);
      const dir = path.join(evidenceDir, slug);
      await mkdir(dir, { recursive: true });
      const url = `http://localhost:${PORT}${route}`;
      const consoleMsgs: string[] = [];

      for (const bp of BREAKPOINTS) {
        const context = await browser.newContext({ viewport: { width: bp.width, height: bp.height } });
        const page = await context.newPage();
        page.on("console", (m) => {
          const t = m.type();
          if (t === "error" || t === "warning") consoleMsgs.push(`[${bp.name}][${t}] ${m.text()}`);
        });
        page.on("pageerror", (e) => consoleMsgs.push(`[${bp.name}][pageerror] ${e.message}`));
        await gotoSettled(page, url);
        await page.screenshot({ path: path.join(dir, `${bp.name}.png`), fullPage: true });
        const sections = await page.$$("main section");
        for (let i = 0; i < sections.length; i++) {
          await sections[i].screenshot({ path: path.join(dir, `${bp.name}-section-${i}.png`) });
        }
        for (const hit of await page.evaluate(collectColors)) observations.push({ ...hit, route });
        await context.close();
      }
      // axe + Lighthouse run once per route at desktop (1440). Mobile-specific
      // a11y / layout-shift is a known gate gap — screenshots cover 390 visually
      // but axe/Lighthouse/CLS are asserted at desktop only.
      const auditCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const auditPage = await auditCtx.newPage();
      await gotoSettled(auditPage, url);
      await auditPage.addScriptTag({ path: axePath });
      const axe = await auditPage.evaluate(
        async () => await (window as unknown as { axe: { run: () => Promise<{ violations: unknown[] }> } }).axe.run(),
      );
      await auditCtx.close();
      await writeFile(path.join(dir, "a11y.json"), JSON.stringify(axe, null, 2));
      await writeFile(path.join(dir, "console.log"), `${consoleMsgs.join("\n")}\n`);

      const lhr = await runLighthouse(url, chrome.port);
      if (lhr) await writeFile(path.join(dir, "lighthouse.json"), JSON.stringify(lhr, null, 2));

      const scores: Record<string, number | null> = {};
      for (const c of CATEGORIES) {
        scores[c] = lhr?.categories?.[c]?.score ?? null;
      }
      const cls = (lhr?.audits?.["cumulative-layout-shift"]?.numericValue as number | undefined) ?? null;
      const axeViolations = axe.violations.length;
      const consoleErrors = consoleMsgs.filter((m) => m.includes("[error]") || m.includes("[pageerror]")).length;

      const failures: string[] = [];
      for (const [c, s] of Object.entries(scores)) {
        if (s === null) failures.push(`lighthouse ${c} missing`);
        else if (s < LH_MIN) failures.push(`lighthouse ${c} ${(s * 100).toFixed(0)} < ${LH_MIN * 100}`);
      }
      if (cls === null) failures.push("CLS missing");
      else if (cls >= CLS_MAX) failures.push(`CLS ${cls.toFixed(3)} >= ${CLS_MAX}`);
      if (axeViolations > 0) failures.push(`axe ${axeViolations} violation(s)`);
      if (consoleErrors > 0) failures.push(`${consoleErrors} console error(s)`);
      gates.push({ route, lighthouse: scores, cls, axeViolations, consoleErrors, pass: failures.length === 0, failures });
    }
    const colorAudit: ColorAudit = buildColorAudit(observations, palette);
    await writeFile(path.join(evidenceDir, "color-audit.json"), JSON.stringify(colorAudit, null, 2));

    const allPass = gates.every((g) => g.pass) && colorAudit.pass;
    await writeFile(
      path.join(evidenceDir, "summary.json"),
      JSON.stringify({ pass: allPass, gates, colorAudit: { pass: colorAudit.pass, offenders: colorAudit.offenders.length } }, null, 2),
    );

    console.log("\n=== evidence summary ===");
    for (const g of gates) {
      const lh = CATEGORIES.map((c) => `${c[0].toUpperCase()}${((g.lighthouse[c] ?? 0) * 100) | 0}`).join(" ");
      console.log(`${g.pass ? "PASS" : "FAIL"} ${g.route}  ${lh} CLS=${g.cls ?? "?"}${g.failures.length ? `  → ${g.failures.join("; ")}` : ""}`);
    }
    console.log(`${colorAudit.pass ? "PASS" : "FAIL"} colour-audit  ${colorAudit.checkedColors} colours vs ${colorAudit.paletteSize} tokens, ${colorAudit.offenders.length} offender(s)`);
    for (const o of colorAudit.offenders) {
      console.log(`     ${o.color} [${o.props.join(",")}] ${o.routes.join(",")} — ${o.reasons.join("; ")}`);
    }
    console.log(`\nevidence: ${allPass ? "PASS" : "FAIL"} → docs/evidence/`);
    if (!allPass) process.exitCode = 1;
  } finally {
    await browser?.close().catch(() => {});
    chrome.kill();
    server.kill("SIGTERM");
  }
}

main()
  .then(() => process.exit(process.exitCode ?? 0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

