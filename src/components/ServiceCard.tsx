import Link from "next/link";
import type { ImageKey } from "@/content/images";
import { ui } from "@/content/en/site";
import { type Service, services } from "@/content/en/services";
import { SiteImageFrame, TextLink, buttonClass } from "./ui";

export function ServiceCard({
  title,
  description,
  image,
  href,
  bookHref,
  children,
}: {
  title: string;
  description: string;
  image: ImageKey;
  href: string;
  bookHref: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-paper shadow-card">
      <SiteImageFrame
        image={image}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        className="aspect-[3/2]"
        flush
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl">
          <Link href={href} className="hover:text-forest">
            {title}
          </Link>
        </h3>
        <p className="mt-2 text-[0.95rem] text-muted">{description}</p>
        {children}
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-5">
          <TextLink href={href} aria-label={`${ui.learnMore} about ${title}`}>
            {ui.learnMore}
          </TextLink>
          <Link
            href={bookHref}
            aria-label={`${ui.bookConsultation} for ${title}`}
            className={buttonClass("secondary")}
          >
            {ui.bookConsultation}
          </Link>
        </div>
      </div>
    </article>
  );
}

export const bookingHref = (slug: string) => `/appointments?service=${slug}`;

export function ServiceGrid({ items = services }: { items?: Service[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service) => (
        <ServiceCard
          key={service.slug}
          title={service.title}
          description={service.cardDescription}
          image={service.image}
          href={`/services/${service.slug}`}
          bookHref={bookingHref(service.slug)}
        />
      ))}
    </div>
  );
}
