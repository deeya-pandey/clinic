import Link from "next/link";
import { clinic, openingHours, primaryPhone, socialLinks } from "@/content/clinic";
import { navigation, pending, ui } from "@/content/en/site";
import { services } from "@/content/en/services";
import { Logo } from "./Logo";
import { ButtonLink, Container } from "./ui";

const linkClass = "text-ivory/85 underline-offset-4 hover:text-ivory hover:underline";

function FooterHeading({ children }: { children: string }) {
  return <h2 className="mb-3 font-sans text-xs font-semibold tracking-[0.18em] text-champagne-soft uppercase">{children}</h2>;
}

export function SiteFooter() {
  const phone = primaryPhone();
  return (
    <footer className="on-dark bg-forest-deep text-sm text-ivory/85">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs">
            Personalized dermatological care and skin and hair treatment consultations in Butwal, Nepal.
          </p>
          <ButtonLink href="/appointments" variant="light" className="mt-6">
            {ui.bookAppointment}
          </ButtonLink>
        </div>

        <nav aria-label="Footer">
          <FooterHeading>Explore</FooterHeading>
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className={linkClass}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Services">
          <FooterHeading>Services</FooterHeading>
          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <FooterHeading>Contact</FooterHeading>
          <address className="not-italic">
            {clinic.name}
            <br />
            {clinic.address.full}
          </address>
          <p className="mt-3">
            {phone ? (
              <a href={`tel:${phone.e164}`} className={linkClass}>
                {phone.display}
              </a>
            ) : (
              ui.phonePending
            )}
          </p>
          <a href={clinic.directionsUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-3 inline-block underline`}>
            {ui.getDirections}
          </a>
          {openingHours.length > 0 && (
            <ul className="mt-3 space-y-1">
              {openingHours.map((row) => (
                <li key={row.days}>
                  {row.days}: {row.hours}
                </li>
              ))}
            </ul>
          )}
          {socialLinks.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="sr-only">{pending.social}</p>
          )}
        </div>
      </Container>
      <div className="border-t border-ivory/15">
        <Container className="space-y-1 py-5 text-xs text-ivory/70">
          <p>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</p>
          <p>
            Website information is educational and does not replace professional medical advice. Appointment requests
            are not confirmed until the clinic responds. Photographs labelled “Illustrative” are licensed stock images.
          </p>
        </Container>
      </div>
    </footer>
  );
}
