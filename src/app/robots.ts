import type { MetadataRoute } from "next";
import { configuredSiteUrl } from "@/content/clinic";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Preview builds without a public URL are not crawled.
  if (!configuredSiteUrl) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${configuredSiteUrl}/sitemap.xml`,
  };
}
