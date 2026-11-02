import type { Testimonial } from "@/content/clinic";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-line bg-paper p-6 shadow-card">
      <blockquote className="font-serif text-xl leading-snug">“{testimonial.quote}”</blockquote>
      <figcaption className="mt-auto pt-5 text-sm text-muted">
        {testimonial.author} · {testimonial.source}
      </figcaption>
    </figure>
  );
}
