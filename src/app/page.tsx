import { Compass, MapPin, ShieldCheck, Star, Stethoscope } from "lucide-react";
import type { Metadata } from "next";
import { CallToAction } from "@/components/CallToAction";
import { HeroSection } from "@/components/HeroSection";
import { ClinicJsonLd } from "@/components/JsonLd";
import { LocationSection } from "@/components/LocationSection";
import { ServiceCard, bookingHref } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Container, PendingNote, SectionHeading, SiteImageFrame, TextLink } from "@/components/ui";
import { googleRating, testimonials, verifiedClinicians } from "@/content/clinic";
import { serviceCategories, servicesInCategory } from "@/content/en/services";
import { doctorPage, home, pending } from "@/content/en/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Skin and Hair Clinic in Butwal",
  description:
    "Dermatology consultations and skin and hair care at YETI Skin and Hair Clinic, Puspa Lal Park, Hospital Line, Butwal. Request an appointment online.",
  path: "/",
});

const trustIcons = [MapPin, Stethoscope, ShieldCheck];

export default function HomePage() {
  const clinician = verifiedClinicians()[0];
  return (
    <>
      <ClinicJsonLd />
      <HeroSection />

      <section aria-label="Why patients can trust this information" className="border-y border-line bg-paper">
        <Container>
          <ul className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {home.trust.map((item, index) => {
              const Icon = trustIcons[index] ?? Compass;
              return (
                <li key={item.title} className="flex gap-4 py-6 md:px-7 md:first:pl-0 md:last:pr-0">
                  <Icon aria-hidden className="mt-0.5 size-6 shrink-0 stroke-[1.5] text-forest" />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          {googleRating && (
            <a
              href={googleRating.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border-t border-line py-4 text-sm"
            >
              <Star aria-hidden className="size-4 fill-champagne text-champagne" />
              {googleRating.score} on Google, from {googleRating.reviewCount} reviews
            </a>
          )}
        </Container>
      </section>

      <section aria-labelledby="services-heading" className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <SectionHeading
              id="services-heading"
              eyebrow={home.services.eyebrow}
              title={home.services.title}
              intro={home.services.intro}
            />
            <TextLink href="/services">View all services</TextLink>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {serviceCategories.map((category) => (
              <ServiceCard
                key={category.id}
                title={category.title}
                description={category.description}
                image={category.image}
                href={category.href}
                bookHref={bookingHref(servicesInCategory(category.id)[0].slug)}
              />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-heading" className="bg-sage-soft/60 py-16 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <SiteImageFrame
            image="consultationRoom"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[3/2]"
          />
          <div>
            <SectionHeading id="about-heading" eyebrow={home.about.eyebrow} title={home.about.title} />
            {home.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-lg text-muted">
                {paragraph}
              </p>
            ))}
            <p className="mt-6">
              <TextLink href="/about">{home.about.link}</TextLink>
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="doctor-heading" className="py-16 lg:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading id="doctor-heading" eyebrow={home.doctor.eyebrow} title={home.doctor.title} />
          <div>
            {clinician ? (
              <>
                <p className="font-serif text-3xl">{clinician.name}</p>
                <p className="mt-1 text-muted">{clinician.title}</p>
                {clinician.qualifications.length > 0 && (
                  <p className="mt-3 text-muted">{clinician.qualifications.join(", ")}</p>
                )}
              </>
            ) : (
              <>
                <p className="font-serif text-3xl">{doctorPage.placeholderName}</p>
                <PendingNote className="mt-4">{pending.clinician}</PendingNote>
              </>
            )}
            <p className="mt-6">
              <TextLink href="/doctor">{home.doctor.link}</TextLink>
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="journey-heading" className="on-dark bg-forest py-16 text-ivory lg:py-24">
        <Container>
          <SectionHeading id="journey-heading" light eyebrow={home.journey.eyebrow} title={home.journey.title} />
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {home.journey.steps.map((step, index) => (
              <li key={step.title} className="border-t border-ivory/30 pt-5">
                <span aria-hidden className="font-serif text-4xl text-champagne">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-2xl text-ivory">{step.title}</h3>
                <p className="mt-2 text-ivory/85">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="testimonials-heading" className="pt-16 lg:pt-24">
        <Container>
          <SectionHeading
            id="testimonials-heading"
            eyebrow={home.testimonials.eyebrow}
            title={home.testimonials.title}
          />
          {testimonials.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.quote} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <PendingNote className="mt-6 max-w-2xl">{pending.testimonials}</PendingNote>
          )}
          <p className="mt-6">
            <TextLink href="/testimonials">{home.testimonials.link}</TextLink>
          </p>
        </Container>
      </section>

      <LocationSection />

      <CallToAction title={home.cta.title} copy={home.cta.copy} button={home.cta.button} />
    </>
  );
}
