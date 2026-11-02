import { UserRound } from "lucide-react";
import type { Clinician } from "@/content/clinic";
import { doctorPage, pending } from "@/content/en/site";
import type { ImageKey } from "@/content/images";
import { PendingNote, SiteImageFrame } from "./ui";

function Portrait({ portrait }: { portrait: string | null }) {
  if (portrait) {
    return (
      <SiteImageFrame
        image={portrait as ImageKey}
        sizes="(min-width: 1024px) 28vw, 100vw"
        className="aspect-[4/5]"
      />
    );
  }
  return (
    <div className="flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-lg border border-line bg-sage-soft px-6 text-center text-forest">
      <UserRound aria-hidden className="size-14 stroke-1" />
      <p className="text-sm">Portrait to be supplied by the clinic</p>
    </div>
  );
}

function ProfileRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-line py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
      <dt className="text-sm font-semibold text-charcoal">{label}</dt>
      <dd className="text-muted">{children}</dd>
    </div>
  );
}

const Placeholder = ({ text }: { text: string }) => <span className="italic">[{text}]</span>;

/**
 * Renders a verified clinician, or clearly marked placeholders when `person` is
 * undefined. Unverified records must never be passed to this component.
 */
export function DoctorProfile({ person, headingLevel = 2 }: { person?: Clinician; headingLevel?: 1 | 2 }) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  const { rows, placeholders } = doctorPage;
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14">
      <Portrait portrait={person?.portrait ?? null} />
      <div>
        <Heading className="text-3xl sm:text-4xl">{person?.name ?? doctorPage.placeholderName}</Heading>
        <p className="mt-2 text-lg text-muted">{person?.title || doctorPage.placeholderTitle}</p>
        {!person && <PendingNote className="mt-5">{pending.clinician}</PendingNote>}
        <dl className="mt-6 border-b border-line">
          <ProfileRow label={rows.qualifications}>
            {person?.qualifications.length ? person.qualifications.join(", ") : <Placeholder text={placeholders.qualifications} />}
          </ProfileRow>
          <ProfileRow label={rows.registration}>
            {person?.registration || <Placeholder text={placeholders.registration} />}
          </ProfileRow>
          <ProfileRow label={rows.interests}>
            {person?.interests.length ? person.interests.join(", ") : <Placeholder text={placeholders.interests} />}
          </ProfileRow>
          <ProfileRow label={rows.biography}>
            {person?.biography.length ? (
              <div className="space-y-3">
                {person.biography.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <Placeholder text={placeholders.biography} />
            )}
          </ProfileRow>
        </dl>
      </div>
    </div>
  );
}
