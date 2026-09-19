import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { SourceCard } from "@/components/sources/SourceCard";
import { NewsEmptyState } from "@/components/sources/NewsEmptyState";
import { officialSources } from "@/lib/data/sources";

export function SourcesTeaser() {
  const preview = officialSources.slice(0, 3);

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Fact-checked, always"
            title="Latest sources and news"
            description="We only ever link to real, verified official sources — never invented articles or statistics."
          />
          <LinkButton href="/sources" variant="secondary">
            View all sources
          </LinkButton>
        </div>

        <div className="mt-8">
          <NewsEmptyState />
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {preview.map((source) => (
            <SourceCard key={source.name} source={source} />
          ))}
        </div>
      </Container>
    </section>
  );
}
