import { CalendarDays, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { clinic, primaryPhone } from "@/content/clinic";

/** Fixed action bar on phones. Falls back to directions until a phone number is verified. */
export function MobileActionBar() {
  const phone = primaryPhone();
  const itemClass = "flex min-h-14 flex-1 items-center justify-center gap-2 text-sm font-medium";
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-paper sm:hidden">
      {phone ? (
        <a href={`tel:${phone.e164}`} className={`${itemClass} text-forest`}>
          <Phone aria-hidden className="size-4" /> Call
        </a>
      ) : (
        <a href={clinic.directionsUrl} target="_blank" rel="noopener noreferrer" className={`${itemClass} text-forest`}>
          <MapPin aria-hidden className="size-4" /> Directions
        </a>
      )}
      <Link href="/appointments" className={`${itemClass} bg-forest text-ivory`}>
        <CalendarDays aria-hidden className="size-4" /> Book Appointment
      </Link>
    </div>
  );
}
