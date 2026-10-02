import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";

/** Compact homepage pointer to /planned-protest. Deliberately shows no event details: those live only on that page. */
export function PlannedProtestTeaser() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-12 sm:py-14">
      <Container>
        <SectionHeading eyebrow="Peaceful civic action" title="Planned Protest" description="Planning is underway for a peaceful public demonstration concerning fuel prices." />
        <div className="mt-6">
          <LinkButton href="/planned-protest" size="lg" className="min-h-12">
            View Planned Protest <span aria-hidden="true">→</span>
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
