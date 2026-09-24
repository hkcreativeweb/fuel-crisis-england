import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { SourceCard } from "@/components/sources/SourceCard";
import { officialSources } from "@/lib/data/sources";

export function SourcesTeaser() {
  const preview = officialSources.slice(0, 3);
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Evidence before opinion"
            title="Don't take our word for it. Check the figures."
            description="Figures on this site are linked to their official sources, with the date and a label showing whether each one is live, historical or a calculation."
          />
          <LinkButton href="/sources" variant="secondary" className="min-h-12">
            Check the sources
          </LinkButton>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {preview.map((source, i) => (
            <div key={source.name} className={i > 0 ? "hidden sm:block" : undefined}>
              <SourceCard source={source} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
