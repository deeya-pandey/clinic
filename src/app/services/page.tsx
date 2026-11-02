import type { Metadata } from "next";
import { CallToAction } from "@/components/CallToAction";
import { PageHeader } from "@/components/PageHeader";
import { ServiceGrid } from "@/components/ServiceCard";
import { Container, PendingNote, SectionHeading, TextLink } from "@/components/ui";
import { serviceListConfirmed } from "@/content/clinic";
import { serviceCategories, servicesInCategory } from "@/content/en/services";
import { home, pending, servicesPage, ui } from "@/content/en/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Skin and Hair Services in Butwal",
  description:
    "Explore medical dermatology, hair restoration, aesthetic dermatology and laser consultations at YETI Skin and Hair Clinic in Butwal, Nepal.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title={servicesPage.title}
        intro={servicesPage.intro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />
      <Container className="pt-8">
        {!serviceListConfirmed && <PendingNote>{pending.services}</PendingNote>}
      </Container>

      {serviceCategories.map((category) => (
        <section
          key={category.id}
          aria-labelledby={`category-${category.id}`}
          className="border-b border-line py-14 last-of-type:border-b-0"
        >
          <Container>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
              <div>
                <SectionHeading id={`category-${category.id}`} title={category.title} intro={category.description} />
                <p className="mt-4">
                  <TextLink href={category.href}>{`${ui.learnMore} about ${category.title}`}</TextLink>
                </p>
              </div>
              {category.topics.length > 0 ? (
                <ul className="divide-y divide-line self-start border-y border-line">
                  {category.topics.map((topic) => (
                    <li key={topic.label} className="flex flex-wrap items-baseline justify-between gap-x-4 py-2.5">
                      <span>{topic.label}</span>
                      {topic.whereAvailable && <span className="text-sm text-muted">{ui.whereAvailable}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <PendingNote className="self-start">{category.emptyTopicsMessage}</PendingNote>
              )}
            </div>
            <div className="mt-8">
              <ServiceGrid items={servicesInCategory(category.id)} />
            </div>
          </Container>
        </section>
      ))}

      <CallToAction title={home.cta.title} copy={home.cta.copy} button={home.cta.button} />
    </>
  );
}
