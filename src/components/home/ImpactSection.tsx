import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { impactGroups } from "@/lib/data/impact-groups";

export function ImpactSection() {
  const preview = impactGroups.slice(0, 4);

  return (
    <section className="bg-charcoal-900 py-16 sm:py-20">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Real people, real journeys"
          title="Rising fuel costs affect ordinary life"
          description="This isn't abstract. It's the school run, the commute, the trade van, the delivery round."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((group) => (
            <div key={group.title} className="rounded border border-white/10 bg-white/5 p-6">
              <h3 className="text-base font-bold text-white">{group.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{group.summary}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <LinkButton href="/cost-of-living" variant="outline-light">
            See how it affects you
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
