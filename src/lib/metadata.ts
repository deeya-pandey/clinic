import type { Metadata } from "next";
import { clinic } from "@/content/clinic";

/** Consistent per-page title, description, canonical URL and Open Graph tags. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${clinic.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: clinic.name,
      locale: "en_NP",
      type: "website",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: clinic.name }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/og.jpg"] },
  };
}
