import { ChevronDown } from "lucide-react";
import type { Faq } from "@/content/en/services";

/** Built on native details elements, so it is keyboard accessible with no JavaScript. */
export function FAQAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-lg font-medium [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown aria-hidden className="size-5 shrink-0 text-forest transition-transform group-open:rotate-180" />
          </summary>
          <p className="max-w-3xl pb-5 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
