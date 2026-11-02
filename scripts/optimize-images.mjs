// Converts every original in assets/photos into the WebP widths that
// src/lib/image-loader.ts asks for. Run with: npm run images
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "assets/photos";
const OUTPUT_DIR = "public/images";
const WIDTHS = [640, 1080, 1920];

await mkdir(OUTPUT_DIR, { recursive: true });

for (const file of await readdir(SOURCE_DIR)) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const name = path.parse(file).name;
  for (const width of WIDTHS) {
    await sharp(path.join(SOURCE_DIR, file))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 76 })
      .toFile(path.join(OUTPUT_DIR, `${name}-${width}.webp`));
  }
  console.log(`optimized ${name}`);
}
