import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/clinic";
import { services } from "@/content/en/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/services", "/doctor", "/testimonials", "/appointments", "/contact", "/privacy"];
  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  return [...staticRoutes, ...serviceRoutes].map((route) => ({ url: `${siteUrl}${route}/` }));
}
