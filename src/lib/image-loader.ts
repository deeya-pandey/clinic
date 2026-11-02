const WIDTHS = [640, 1080, 1920];

/** Maps a next/image request to the pre-generated WebP width for that photo. */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const match = WIDTHS.find((candidate) => candidate >= width) ?? WIDTHS[WIDTHS.length - 1];
  return src.replace(/\.webp$/, `-${match}.webp`);
}
