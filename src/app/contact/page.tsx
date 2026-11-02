import { CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import { ContactInformation } from "@/components/ContactInformation";
import { ClinicJsonLd } from "@/components/JsonLd";
import { LocationMap } from "@/components/LocationMap";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink, Container } from "@/components/ui";
import { contactPage, ui } from "@/content/en/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact Our Clinic in Butwal",
  description:
    "Find the address and directions for YETI Skin and Hair Clinic at Puspa Lal Park, Hospital Line, Butwal, Nepal, and request an appointment.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ClinicJsonLd />
      <PageHeader title={contactPage.title} intro={contactPage.intro} />
      <Container className="grid gap-10 py-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:py-20">
        <ContactInformation />
        <aside className="on-dark self-start rounded-lg bg-forest p-7 text-ivory">
          <CalendarDays aria-hidden className="size-7 stroke-[1.5] text-champagne" />
          <h2 className="mt-4 text-3xl text-ivory">{contactPage.simple.title}</h2>
          <p className="mt-3 text-ivory/85">{contactPage.simple.text}</p>
          <ButtonLink href="/appointments" variant="light" className="mt-6">
            {ui.bookAppointment}
          </ButtonLink>
        </aside>
      </Container>
      <LocationMap />
    </>
  );
}
