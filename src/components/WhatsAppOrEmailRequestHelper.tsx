import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { appointmentCopy } from "@/content/en/appointment";
import { buildEmailUrl, buildWhatsappUrl } from "@/lib/appointment";
import { PendingNote, buttonClass } from "./ui";

export type RequestChannels = { whatsapp: string | null; email: string | null };

export type ClinicDetails = {
  name: string;
  address: string;
  directionsUrl: string;
  phone: { e164: string; display: string } | null;
};

/**
 * Hands the prepared request to the patient's own WhatsApp or email app. Only
 * verified destinations reach this component. With none configured, it tells the
 * patient to contact the clinic directly and never reports success.
 */
export function WhatsAppOrEmailRequestHelper({
  channels,
  clinic,
  message,
  onHandOff,
}: {
  channels: RequestChannels;
  clinic: ClinicDetails;
  message: string;
  onHandOff?: () => void;
}) {
  const { review } = appointmentCopy;

  if (!channels.whatsapp && !channels.email) {
    return (
      <div>
        <h3 className="text-2xl">{review.noChannelTitle}</h3>
        <PendingNote className="mt-3">{clinic.phone ? review.noChannelPhone : review.noChannelVisit}</PendingNote>
        <div className="mt-4 flex flex-wrap gap-3">
          {clinic.phone && (
            <a href={`tel:${clinic.phone.e164}`} className={buttonClass()}>
              <Phone aria-hidden className="size-4" />
              {clinic.phone.display}
            </a>
          )}
          <a href={clinic.directionsUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>
            <MapPin aria-hidden className="size-4" />
            {clinic.address}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl">{review.sendTitle}</h3>
      <p className="mt-1 text-sm text-muted">{review.sendHint}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {channels.whatsapp && (
          <a
            href={buildWhatsappUrl(channels.whatsapp, message)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onHandOff}
            className={buttonClass()}
          >
            <MessageCircle aria-hidden className="size-4" />
            {review.sendWhatsapp}
          </a>
        )}
        {channels.email && (
          <a
            href={buildEmailUrl(channels.email, clinic.name, message)}
            onClick={onHandOff}
            className={buttonClass(channels.whatsapp ? "secondary" : "primary")}
          >
            <Mail aria-hidden className="size-4" />
            {review.sendEmail}
          </a>
        )}
      </div>
    </div>
  );
}
