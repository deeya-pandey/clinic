import { clinic } from "@/content/clinic";
import { contactPage, ui } from "@/content/en/site";
import { Container } from "./ui";

/** Google Maps embed. It only loads as it nears the viewport, and needs no API key. */
export function LocationMap() {
  return (
    <section aria-labelledby="map-heading" className="pb-14 lg:pb-20">
      <Container>
        <h2 id="map-heading" className="text-3xl sm:text-4xl">
          {contactPage.map.title}
        </h2>
        <p className="mt-2 max-w-2xl text-muted">{contactPage.map.note}</p>
        <div className="mt-6 aspect-[4/3] overflow-hidden rounded-lg border border-line bg-sage-soft sm:aspect-[16/7]">
          <iframe
            title={`Map showing ${clinic.address.full}`}
            src={clinic.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full border-0"
          />
        </div>
        <a
          href={clinic.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-forest underline underline-offset-4"
        >
          {ui.getDirections} (opens Google Maps)
        </a>
      </Container>
    </section>
  );
}
