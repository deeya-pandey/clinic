import { MapPin, Phone, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AppointmentForm } from "@/components/AppointmentForm";
import { PageHeader } from "@/components/PageHeader";
import { Container, PendingNote } from "@/components/ui";
import { clinic, primaryPhone, verifiedClinicians, verifiedEmail, verifiedWhatsapp } from "@/content/clinic";
import { appointmentCopy } from "@/content/en/appointment";
import { appointmentServiceOptions } from "@/content/en/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Request an Appointment in Butwal",
  description:
    "Request a dermatology or skin and hair consultation at YETI Skin and Hair Clinic in Butwal. The clinic responds to confirm your appointment.",
  path: "/appointments",
});

function FormSkeleton() {
  return (
    <div role="status" className="space-y-4">
      <span className="sr-only">{appointmentCopy.loading}</span>
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="h-20 animate-pulse rounded-md bg-sage-soft motion-reduce:animate-none" />
      ))}
    </div>
  );
}

export default function AppointmentsPage() {
  const { page, notActive } = appointmentCopy;
  const whatsapp = verifiedWhatsapp();
  const email = verifiedEmail();
  const phone = primaryPhone();
  const hasChannel = Boolean(whatsapp || email);
  // Only verified values are passed to the client component and its bundle.
  const clinicDetails = {
    name: clinic.name,
    address: clinic.address.full,
    directionsUrl: clinic.directionsUrl,
    phone: phone ? { e164: phone.e164, display: phone.display } : null,
  };

  return (
    <>
      <PageHeader title={page.title} intro={page.intro} />
      <Container className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:gap-14 lg:py-16">
        <div>
          {!hasChannel && (
            <div className="mb-8">
              <PendingNote>
                <strong className="font-semibold">{notActive.title}. </strong>
                {notActive.text}
              </PendingNote>
            </div>
          )}
          <Suspense fallback={<FormSkeleton />}>
            <AppointmentForm
              channels={{ whatsapp, email }}
              clinic={clinicDetails}
              serviceOptions={appointmentServiceOptions}
              clinicianNames={verifiedClinicians().map((person) => person.name)}
            />
          </Suspense>
        </div>

        <aside className="space-y-6 self-start lg:sticky lg:top-24">
          <div className="rounded-lg border border-line bg-paper p-6 shadow-card">
            <h2 className="text-2xl">{page.asideTitle}</h2>
            <ol className="mt-4 space-y-3 text-sm text-muted">
              {page.asideSteps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span aria-hidden className="font-serif text-lg leading-5 text-forest">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-lg border border-line bg-paper p-6">
            <h2 className="flex items-center gap-2 text-2xl">
              <Phone aria-hidden className="size-5 stroke-[1.5] text-forest" />
              {page.callTitle}
            </h2>
            {phone ? (
              <a href={`tel:${phone.e164}`} className="mt-2 inline-block text-lg text-forest underline underline-offset-4">
                {phone.display}
              </a>
            ) : (
              <p className="mt-2 text-sm text-muted">{page.callPending}</p>
            )}
            <p className="mt-3 flex gap-2 text-sm text-muted">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-forest" />
              {clinic.address.full}
            </p>
          </div>
          <div className="rounded-lg border border-line bg-paper p-6">
            <h2 className="flex items-center gap-2 text-2xl">
              <ShieldCheck aria-hidden className="size-5 stroke-[1.5] text-forest" />
              {page.privacyTitle}
            </h2>
            <p className="mt-2 text-sm text-muted">{page.privacyText}</p>
            <Link href="/privacy" className="mt-2 inline-block text-sm text-forest underline underline-offset-4">
              {page.privacyLink}
            </Link>
          </div>
        </aside>
      </Container>
    </>
  );
}
