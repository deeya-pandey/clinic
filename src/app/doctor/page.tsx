import type { Metadata } from "next";
import { CallToAction } from "@/components/CallToAction";
import { DoctorProfile } from "@/components/DoctorProfile";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui";
import { verifiedClinicians } from "@/content/clinic";
import { doctorPage, home } from "@/content/en/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Our Doctor | Dermatologist in Butwal",
  description:
    "Find verified clinician information and what to expect from a dermatology consultation at YETI Skin and Hair Clinic in Butwal, Nepal.",
  path: "/doctor",
});

export default function DoctorPage() {
  const people = verifiedClinicians();
  return (
    <>
      <PageHeader title={doctorPage.title} intro={doctorPage.intro} />
      <Container className="space-y-16 py-14 lg:py-20">
        {people.length > 0 ? (
          people.map((person) => <DoctorProfile key={person.name} person={person} />)
        ) : (
          <DoctorProfile />
        )}
      </Container>
      <section aria-labelledby="consultation-info" className="bg-sage-soft/60 py-14 lg:py-20">
        <Container>
          <h2 id="consultation-info" className="text-3xl sm:text-4xl">
            {doctorPage.consultation.title}
          </h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctorPage.consultation.points.map((point, index) => (
              <li key={point} className="border-t border-forest/30 pt-4">
                <span aria-hidden className="font-serif text-2xl text-forest">
                  {index + 1}
                </span>
                <p className="mt-2 text-muted">{point}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <CallToAction title={home.cta.title} copy={home.cta.copy} button={home.cta.button} />
    </>
  );
}
