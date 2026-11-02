import type { Metadata } from "next";
import { CallToAction } from "@/components/CallToAction";
import { PageHeader } from "@/components/PageHeader";
import { Container, SectionHeading, SiteImageFrame, TextLink } from "@/components/ui";
import { about } from "@/content/en/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About Our Skin Clinic in Butwal",
  description:
    "Learn about YETI Skin and Hair Clinic in Butwal and its approach to individual consultations, medical professionalism and patient comfort.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader title={about.title} intro={about.intro} />

      <section className="py-16 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow={about.story.eyebrow} title={about.story.title} />
            {about.story.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-lg text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <SiteImageFrame image="treatmentRoom" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[3/2]" />
        </Container>
      </section>

      <section className="bg-sage-soft/60 py-16 lg:py-24">
        <Container>
          <SectionHeading eyebrow={about.mission.eyebrow} title={about.mission.title} intro={about.mission.text} />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {about.values.map((value) => (
              <li key={value.title} className="rounded-lg border border-line bg-paper p-6 shadow-card">
                <h3 className="text-2xl">{value.title}</h3>
                <p className="mt-2 text-muted">{value.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <SiteImageFrame image="clinicalTeam" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[3/2]" />
          <div>
            <SectionHeading eyebrow={about.team.eyebrow} title={about.team.title} intro={about.team.text} />
            <p className="mt-6">
              <TextLink href="/doctor">{about.team.link}</TextLink>
            </p>
          </div>
        </Container>
      </section>

      <CallToAction title={about.cta.title} copy={about.cta.copy} button={about.cta.button} />
    </>
  );
}
