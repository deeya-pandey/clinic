import { CheckCircle2, CircleHelp, Stethoscope } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallToAction } from "@/components/CallToAction";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ServiceGrid, bookingHref } from "@/components/ServiceCard";
import { ButtonLink, Container, PendingNote, SiteImageFrame } from "@/components/ui";
import { getService, services } from "@/content/en/services";
import { medicalDisclaimer, pending, serviceDetail, ui } from "@/content/en/site";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({ ...service.seo, path: `/services/${service.slug}` });
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const confirmedOptions = service.options.filter((option) => option.confirmed);
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const book = bookingHref(service.slug);

  return (
    <>
      <div className="border-b border-line bg-sage-soft/60">
        <Container className="grid items-center gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14">
          <div>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: service.title, href: `/services/${service.slug}` },
              ]}
            />
            <h1 className="mt-5 text-4xl sm:text-5xl">{service.title}</h1>
            <p className="mt-4 text-lg text-muted">{service.intro}</p>
            <ButtonLink href={book} className="mt-7">
              {ui.bookConsultation}
            </ButtonLink>
          </div>
          <SiteImageFrame image={service.image} priority sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[3/2]" />
        </Container>
      </div>

      {service.availabilityNote && (
        <Container className="pt-8">
          <PendingNote>{service.availabilityNote}</PendingNote>
        </Container>
      )}

      <Container className="grid gap-12 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <section aria-labelledby="reasons-heading">
          <h2 id="reasons-heading" className="flex items-center gap-3 text-3xl">
            <CircleHelp aria-hidden className="size-6 shrink-0 stroke-[1.5] text-forest" />
            {serviceDetail.reasonsTitle}
          </h2>
          <ul className="mt-6 space-y-3">
            {service.reasons.map((reason) => (
              <li key={reason} className="flex gap-3 text-muted">
                <CheckCircle2 aria-hidden className="mt-1 size-4 shrink-0 text-forest-soft" />
                {reason}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="consultation-heading">
          <h2 id="consultation-heading" className="flex items-center gap-3 text-3xl">
            <Stethoscope aria-hidden className="size-6 shrink-0 stroke-[1.5] text-forest" />
            {serviceDetail.consultationTitle}
          </h2>
          <ol className="mt-6 space-y-3">
            {service.consultation.map((step, index) => (
              <li key={step} className="flex gap-3 text-muted">
                <span aria-hidden className="w-5 shrink-0 font-serif text-lg leading-6 text-forest">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>
      </Container>

      <section aria-labelledby="options-heading" className="bg-sage-soft/60 py-14">
        <Container>
          <h2 id="options-heading" className="text-3xl">
            {serviceDetail.optionsTitle}
          </h2>
          {confirmedOptions.length > 0 ? (
            <>
              <p className="mt-2 text-muted">{serviceDetail.optionsNote}</p>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {confirmedOptions.map((option) => (
                  <li key={option.name} className="rounded-lg border border-line bg-paper p-5">
                    <h3 className="text-xl">{option.name}</h3>
                    <p className="mt-1 text-sm text-muted">{option.description}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <PendingNote className="mt-5 max-w-3xl">{pending.options}</PendingNote>
          )}
        </Container>
      </section>

      <section aria-labelledby="faq-heading" className="py-14 lg:py-20">
        <Container>
          <h2 id="faq-heading" className="mb-6 text-3xl">
            {serviceDetail.faqTitle}
          </h2>
          <FAQAccordion items={service.faqs} />
          <p className="mt-8 max-w-3xl rounded-md border border-line bg-paper p-4 text-sm text-muted">
            <strong className="font-semibold text-charcoal">Medical disclaimer: </strong>
            {medicalDisclaimer}
          </p>
        </Container>
      </section>

      <section aria-labelledby="related-heading" className="pb-16">
        <Container>
          <h2 id="related-heading" className="mb-6 text-3xl">
            Other services
          </h2>
          <ServiceGrid items={related} />
        </Container>
      </section>

      <CallToAction title={serviceDetail.ctaTitle} copy={serviceDetail.ctaCopy} button={ui.bookConsultation} href={book} />
    </>
  );
}
