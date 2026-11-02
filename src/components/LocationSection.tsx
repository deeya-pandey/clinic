import { MapPin, Navigation, Phone } from "lucide-react";
import { clinic, primaryPhone } from "@/content/clinic";
import { home, pending, ui } from "@/content/en/site";
import { Container, SectionHeading, SiteImageFrame, buttonClass } from "./ui";

export function LocationSection() {
  const phone = primaryPhone();
  return (
    <section aria-labelledby="location-heading" className="py-16 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading id="location-heading" eyebrow={home.location.eyebrow} title={home.location.title} />
          <ul className="mt-7 space-y-4">
            <li className="flex gap-3">
              <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-forest" />
              <span>{clinic.address.full}</span>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden className="mt-1 size-5 shrink-0 text-forest" />
              {phone ? (
                <a href={`tel:${phone.e164}`} className="text-forest underline underline-offset-4">
                  {phone.display}
                </a>
              ) : (
                <span className="text-muted">{pending.phone}</span>
              )}
            </li>
          </ul>
          <a
            href={clinic.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClass("secondary")} mt-7`}
          >
            <Navigation aria-hidden className="size-4" />
            {ui.getDirections}
          </a>
        </div>
        <SiteImageFrame image="waitingArea" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[3/2]" />
      </Container>
    </section>
  );
}
