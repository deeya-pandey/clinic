import { Clock, Mail, MapPin, Phone, Share2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  clinic,
  openingHours,
  primaryPhone,
  secondaryPhone,
  socialLinks,
  verifiedEmail,
} from "@/content/clinic";
import { pending, ui } from "@/content/en/site";

function Row({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 border-t border-line py-5 first:border-t-0 first:pt-0">
      <Icon aria-hidden className="mt-1 size-5 shrink-0 text-forest" />
      <div className="min-w-0">
        <dt className="text-sm font-semibold">{label}</dt>
        <dd className="mt-1 text-muted">{children}</dd>
      </div>
    </div>
  );
}

const linkClass = "text-forest underline underline-offset-4 hover:text-forest-deep";

export function ContactInformation() {
  const phone = primaryPhone();
  const altPhone = secondaryPhone();
  const email = verifiedEmail();
  return (
    <dl>
      <Row icon={MapPin} label="Address">
        <address className="not-italic">
          {clinic.name}
          <br />
          {clinic.address.full}
        </address>
        <a href={clinic.directionsUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-2 inline-block`}>
          {ui.getDirections} (opens Google Maps)
        </a>
      </Row>
      <Row icon={Phone} label="Phone">
        {phone ? (
          <span className="flex flex-col gap-1">
            <a href={`tel:${phone.e164}`} className={linkClass}>
              {phone.display}
            </a>
            {altPhone && (
              <a href={`tel:${altPhone.e164}`} className={linkClass}>
                {altPhone.display}
              </a>
            )}
          </span>
        ) : (
          pending.phone
        )}
      </Row>
      <Row icon={Clock} label="Opening hours">
        {openingHours.length > 0 ? (
          <span className="flex flex-col gap-1">
            {openingHours.map((row) => (
              <span key={row.days}>
                {row.days}: {row.hours}
              </span>
            ))}
            <span className="text-sm">{clinic.timezoneLabel}</span>
          </span>
        ) : (
          pending.hours
        )}
      </Row>
      {email && (
        <Row icon={Mail} label="Email">
          <a href={`mailto:${email}`} className={linkClass}>
            {email}
          </a>
        </Row>
      )}
      <Row icon={Share2} label="Social media">
        {socialLinks.length > 0 ? (
          <span className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {link.label}
              </a>
            ))}
          </span>
        ) : (
          pending.social
        )}
      </Row>
    </dl>
  );
}
