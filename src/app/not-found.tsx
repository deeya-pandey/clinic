import type { Metadata } from "next";
import { ButtonLink, Container } from "@/components/ui";
import { notFound } from "@/content/en/site";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <Container className="py-24 lg:py-36">
      <p className="font-serif text-2xl text-forest-soft">404</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">{notFound.title}</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{notFound.copy}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">{notFound.home}</ButtonLink>
        <ButtonLink href="/services" variant="secondary">
          {notFound.services}
        </ButtonLink>
      </div>
    </Container>
  );
}
