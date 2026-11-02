import { clinic, googleRating, openingHours, primaryPhone, siteUrl, socialLinks } from "@/content/clinic";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** MedicalClinic structured data, containing verified facts only. */
export function ClinicJsonLd() {
  const phone = primaryPhone();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        name: clinic.name,
        url: siteUrl,
        medicalSpecialty: "Dermatology",
        address: {
          "@type": "PostalAddress",
          streetAddress: clinic.address.street,
          addressLocality: clinic.address.city,
          addressCountry: clinic.address.countryCode,
        },
        ...(phone && { telephone: phone.e164 }),
        ...(socialLinks.length > 0 && { sameAs: socialLinks.map((link) => link.href) }),
        ...(openingHours.length > 0 && {
          openingHours: openingHours.map((row) => `${row.days} ${row.hours}`),
        }),
        ...(googleRating && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: googleRating.score,
            reviewCount: googleRating.reviewCount,
          },
        }),
      }}
    />
  );
}
