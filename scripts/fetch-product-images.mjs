import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const OUT = path.resolve("public/images/products");
const W = 800;
const H = 1000;

// Each entry: [filename (without ext), picsum seed]
// picsum.photos serves real photographs with deterministic seeds, no auth needed
const PHOTOS = [
  ["sculpt-tee",          101],
  ["drop-shoulder-top",   102],
  ["waist-define-top",    103],
  ["relaxed-shirt",       104],
  ["drape-top",           105],
  ["sculpt-midi",         201],
  ["a-line-midi",         202],
  ["wrap-dress",          203],
  ["shirt-dress",         204],
  ["ruched-side-dress",   205],
  ["wide-leg-trouser",    301],
  ["sculpt-trouser",      302],
  ["straight-leg-trouser",303],
  ["high-rise-flare",     304],
  ["sculpt-coord",        401],
  ["relaxed-coord",       402],
  ["work-coord",          403],
  ["statement-dress",     501],
  ["night-out-top",       502],
];

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function processOne([name, photoId]) {
  const outPath = path.join(OUT, `${name}.jpg`);
  if (existsSync(outPath)) {
    console.log(`  skip ${name} (exists)`);
    return;
  }

  const url = `https://picsum.photos/seed/${photoId}/${W}/${H}`;
  console.log(`  fetch ${name}...`);

  try {
    const buf = await download(url);
    await sharp(buf)
      .resize(W, H, { fit: "cover", position: "center" })
      .jpeg({ quality: 82, progressive: true })
      .toFile(outPath);
    console.log(`  done  ${name}`);
  } catch (e) {
    console.error(`  FAIL  ${name}: ${e.message}`);
    // Generate a solid-color placeholder instead
    await sharp({
      create: { width: W, height: H, channels: 3, background: { r: 245, g: 240, b: 235 } },
    })
      .jpeg({ quality: 80 })
      .toFile(outPath);
    console.log(`  placeholder created for ${name}`);
  }
}

await mkdir(OUT, { recursive: true });
console.log(`Downloading ${PHOTOS.length} product images to ${OUT}...\n`);

// Process in batches of 4 to avoid hammering the server
for (let i = 0; i < PHOTOS.length; i += 4) {
  await Promise.all(PHOTOS.slice(i, i + 4).map(processOne));
}

console.log(`\nDone. ${PHOTOS.length} images processed.`);
