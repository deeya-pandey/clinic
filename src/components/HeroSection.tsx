import { home } from "@/content/en/site";
import { ButtonLink, Container, Eyebrow, SiteImageFrame } from "./ui";

export function HeroSection() {
  const { hero } = home;
  return (
    <section className="overflow-hidden">
      <Container className="grid items-center gap-10 py-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14 lg:py-16">
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
          image="doctorPortrait"
          priority
          sizes="(min-width: 640px) 28rem, 100vw"
          className="mx-auto aspect-[4/5] w-full max-w-md"
        />
      </Container>
    </section>
  );
}
