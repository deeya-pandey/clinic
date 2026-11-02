import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Container, PendingNote } from "@/components/ui";
import { privacyPolicyApproved } from "@/content/clinic";
import { privacyPolicy } from "@/content/en/privacy";
import { pending } from "@/content/en/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How appointment request information submitted through the YETI Skin and Hair Clinic website is collected, sent and handled.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title={privacyPolicy.title} intro={privacyPolicy.intro} />
      <Container className="py-14 lg:py-20">
        <div className="max-w-3xl">
          {!privacyPolicyApproved && <PendingNote className="mb-10">{pending.privacy}</PendingNote>}
          <div className="space-y-10">
            {privacyPolicy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-3xl">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-muted">
                    {paragraph}
                  </p>
                ))}
                {!privacyPolicyApproved && section.needsApproval && (
                  <p className="mt-3 text-sm italic text-muted">[Requires clinic approval: {section.needsApproval}]</p>
                )}
              </section>
            ))}
          </div>
          <p className="mt-10">
            <Link href="/contact" className="text-forest underline underline-offset-4">
              Contact the clinic
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
}
