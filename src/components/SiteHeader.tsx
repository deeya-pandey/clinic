import { navigation, ui } from "@/content/en/site";
import { Logo } from "./Logo";
import { MobileNavigation } from "./MobileNavigation";
import { NavLinks } from "./NavLinks";
import { ButtonLink, Container } from "./ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95">
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />
        <NavLinks items={navigation} />
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href="/appointments">{ui.bookAppointment}</ButtonLink>
          </div>
          <MobileNavigation items={navigation} bookLabel={ui.bookAppointment} />
        </div>
      </Container>
    </header>
  );
}
