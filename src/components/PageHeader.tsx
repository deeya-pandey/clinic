import { Container } from "./ui";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

export function PageHeader({ title, intro, crumbs }: { title: string; intro: string; crumbs?: Crumb[] }) {
  return (
    <div className="border-b border-line bg-sage-soft/60">
      <Container className="py-12 lg:py-16">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <h1 className={`text-4xl sm:text-5xl ${crumbs ? "mt-5" : ""}`}>{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p>
      </Container>
    </div>
  );
}
