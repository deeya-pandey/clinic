import { home } from "@/content/en/site";
import { ButtonLink, Container, Eyebrow, SiteImageFrame } from "./ui";

export function HeroSection() {
  const { hero } = home;
  return (
    <section className="overflow-hidden">
      <Container className="grid items-center gap-10 py-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:py-16">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="text-5xl sm:text-6xl xl:text-7xl">{hero.title}</h1>
          <p className="mt-6 max-w-lg text-lg text-muted sm:text-xl">{hero.copy}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/appointments">{hero.primary}</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              {hero.secondary}
            </ButtonLink>
          </div>
        </div>
        <SiteImageFrame
          image="consultationNotes"
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="aspect-[4/3] lg:aspect-[5/4]"
        />
      </Container>
    </section>
  );
}
