import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { SourceCard } from "@/components/sources/SourceCard";
import { officialSources } from "@/lib/data/sources";

const FEATURED = ["GOV.UK", "UK Parliament", "Office for National Statistics (ONS)"];

export function SourcesTeaser() {
  const preview = FEATURED.map((name) => officialSources.find((s) => s.name === name)).filter((s) => s !== undefined);
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="Evidence before opinion"
          title="Don't take our word for it. Check the figures against the sources."
          description="Figures on this site are linked to their original sources and labelled as live, historical, provisional or calculated."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {preview.map((source) => (
            <div key={source.name}>
              <SourceCard source={source} />
            </div>
          ))}
        </div>
        <div className="mt-6">
          <LinkButton href="/sources" variant="secondary" className="min-h-12">
            See all sources <span aria-hidden="true">→</span>
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
