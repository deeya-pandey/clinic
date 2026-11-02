import { Camera, MessageSquareQuote } from "lucide-react";
import type { Metadata } from "next";
import { BeforeAfterCard } from "@/components/BeforeAfterCard";
import { CallToAction } from "@/components/CallToAction";
import { PageHeader } from "@/components/PageHeader";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Container, SectionHeading } from "@/components/ui";
import { publishableResults, testimonials } from "@/content/clinic";
import { home, testimonialsPage } from "@/content/en/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Patient Testimonials and Results",
  description:
    "Read patient testimonials and see before and after results shared with consent by patients of YETI Skin and Hair Clinic in Butwal. Individual results vary.",
  path: "/testimonials",
});

function EmptyState({ icon: Icon, title, text }: { icon: typeof Camera; title: string; text: string }) {
  return (
    <div className="mt-8 flex max-w-3xl gap-4 rounded-lg border border-dashed border-sage bg-paper p-6">
      <Icon aria-hidden className="mt-0.5 size-6 shrink-0 stroke-[1.5] text-forest" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-muted">{text}</p>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const results = publishableResults();
  const { results: resultsCopy, reviews, standards } = testimonialsPage;
  return (
    <>
      <PageHeader title={testimonialsPage.title} intro={testimonialsPage.intro} />

      <section aria-labelledby="results-heading" className="py-14 lg:py-20">
        <Container>
          <SectionHeading id="results-heading" eyebrow={resultsCopy.eyebrow} title={resultsCopy.title} intro={results.length > 0 ? resultsCopy.intro : undefined} />
          {results.length > 0 ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {results.map((result) => (
                <BeforeAfterCard key={result.title} result={result} />
              ))}
            </div>
          ) : (
            <EmptyState icon={Camera} title={resultsCopy.emptyTitle} text={resultsCopy.emptyText} />
          )}
          <p className="mt-8 max-w-3xl rounded-md border border-line bg-paper p-4 text-sm text-muted">
            <strong className="font-semibold text-charcoal">Please note: </strong>
            {resultsCopy.disclaimer}
          </p>
        </Container>
      </section>

      <section aria-labelledby="reviews-heading" className="bg-sage-soft/60 py-14 lg:py-20">
        <Container>
          <SectionHeading id="reviews-heading" eyebrow={reviews.eyebrow} title={reviews.title} />
          {testimonials.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.quote} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <EmptyState icon={MessageSquareQuote} title={reviews.emptyTitle} text={reviews.emptyText} />
          )}
        </Container>
      </section>

      <section aria-labelledby="standards-heading" className="py-14 lg:py-20">
        <Container>
          <SectionHeading id="standards-heading" title={standards.title} />
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {standards.items.map((item) => (
              <li key={item.title} className="border-t border-forest/30 pt-4">
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-2 text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CallToAction title={home.cta.title} copy={home.cta.copy} button={home.cta.button} />
    </>
  );
}
