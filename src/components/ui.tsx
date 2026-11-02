import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { images, type ImageKey } from "@/content/images";
import { ui } from "@/content/en/site";

const buttonStyles = {
  primary: "bg-forest text-ivory hover:bg-forest-deep",
  secondary: "border border-forest/40 bg-transparent text-forest hover:border-forest hover:bg-forest/5",
  light: "bg-ivory text-forest hover:bg-champagne-soft",
  ghostLight: "border border-ivory/50 text-ivory hover:border-ivory hover:bg-ivory/10",
};

export const buttonClass = (variant: keyof typeof buttonStyles = "primary") =>
  `inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-center text-[0.95rem] font-medium transition-colors ${buttonStyles[variant]}`;

export function ButtonLink({
  variant,
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof buttonStyles }) {
  return <Link {...props} className={`${buttonClass(variant)} ${className}`} />;
}

export function TextLink({ children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className="group inline-flex min-h-6 items-center gap-1.5 font-medium text-forest underline decoration-sage underline-offset-4 transition-colors hover:decoration-forest"
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`mb-3 text-xs font-semibold tracking-[0.18em] uppercase ${light ? "text-champagne-soft" : "text-forest-soft"}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light,
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  light?: boolean;
  id?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`text-3xl sm:text-4xl ${light ? "text-ivory" : "text-charcoal"}`}>
        {title}
      </h2>
      {intro && <p className={`mt-4 text-lg ${light ? "text-ivory/85" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

/** A clearly identified placeholder for details the clinic has not yet confirmed. */
export function PendingNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`flex gap-2.5 rounded-md border border-champagne/60 bg-champagne-soft px-4 py-3 text-sm text-charcoal ${className}`}
    >
      <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-forest" />
      <span>{children}</span>
    </p>
  );
}

/** Photo in a sized frame. Stock photos always carry a visible "Illustrative" label. */
export function SiteImageFrame({
  image,
  sizes,
  className = "aspect-[4/3]",
  priority,
  flush,
}: {
  image: ImageKey;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Square corners, for a photo that sits edge to edge inside a card. */
  flush?: boolean;
}) {
  const { src, alt, illustrative } = images[image];
  return (
    <figure className={`relative overflow-hidden bg-sage-soft ${flush ? "" : "rounded-lg"} ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      {illustrative && (
        <figcaption className="absolute bottom-2 left-2 rounded-sm bg-charcoal/75 px-2 py-0.5 text-[0.7rem] font-medium text-white">
          {ui.illustrative}
        </figcaption>
      )}
    </figure>
  );
}
