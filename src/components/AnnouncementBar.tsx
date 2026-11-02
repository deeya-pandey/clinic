import { MapPin, Phone } from "lucide-react";
import { clinic, primaryPhone } from "@/content/clinic";
import { ui } from "@/content/en/site";
import { Container } from "./ui";

export function AnnouncementBar() {
  const phone = primaryPhone();
  return (
    <div className="on-dark bg-forest-deep text-xs text-ivory/90 sm:text-sm">
      <Container className="flex min-h-9 flex-wrap items-center justify-between gap-x-6 gap-y-0.5 py-1.5">
        <a
          href={clinic.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:underline"
        >
          <MapPin aria-hidden className="size-3.5 shrink-0" />
          {clinic.address.street}, {clinic.address.city}
        </a>
        {phone ? (
          <a href={`tel:${phone.e164}`} className="inline-flex items-center gap-1.5 hover:underline">
            <Phone aria-hidden className="size-3.5 shrink-0" />
            {phone.display}
          </a>
        ) : (
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <Phone aria-hidden className="size-3.5 shrink-0" />
            {ui.phonePending}
          </span>
        )}
      </Container>
    </div>
  );
}
