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
          eyebrow="The same price doesn't affect everyone equally"
          title="The pump isn't where the cost ends"
          description="Fuel affects the journeys people make, the work they do and the businesses that depend on driving. How much depends on each situation."
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
            See who feels the impact
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
