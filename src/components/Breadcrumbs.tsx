import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { siteUrl } from "@/content/clinic";
import { JsonLd } from "./JsonLd";

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-charcoal">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className="underline-offset-4 hover:text-forest hover:underline">
                      {item.label}
                    </Link>
                    <ChevronRight aria-hidden className="size-3.5" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: `${siteUrl}${item.href}`,
          })),
        }}
      />
    </>
  );
}
