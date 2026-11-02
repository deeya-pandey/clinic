import { Phone } from "lucide-react";
import { primaryPhone } from "@/content/clinic";
import { ui } from "@/content/en/site";
import { ButtonLink, Container, buttonClass } from "./ui";

export function CallToAction({
  title,
  copy,
  button,
  href = "/appointments",
}: {
  title: string;
  copy: string;
  button: string;
  href?: string;
}) {
  const phone = primaryPhone();
  return (
    <section className="on-dark bg-forest text-ivory">
      <Container className="flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl text-ivory sm:text-4xl">{title}</h2>
          <p className="mt-3 text-ivory/85">{copy}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <ButtonLink href={href} variant="light">
            {button}
          </ButtonLink>
          {phone && (
            <a href={`tel:${phone.e164}`} className={buttonClass("ghostLight")}>
              <Phone aria-hidden className="size-4" />
              {ui.callClinic}
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}
