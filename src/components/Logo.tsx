import Link from "next/link";

/** Temporary typographic wordmark, to be replaced if the clinic supplies an official logo. */
export function Logo({ light }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="YETI Skin and Hair Clinic, home"
      className={`inline-flex flex-col leading-none ${light ? "text-ivory" : "text-forest"}`}
    >
      <span className="font-serif text-[1.7rem] tracking-[0.2em]">YETI</span>
      <span className="mt-1 text-[0.55rem] font-semibold tracking-[0.2em] whitespace-nowrap uppercase opacity-90">
        Skin &amp; Hair Clinic
      </span>
    </Link>
  );
}
