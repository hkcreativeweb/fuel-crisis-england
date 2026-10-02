import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { litreJourneySteps } from "@/lib/data/litre-journey";
import { cn } from "@/lib/utils";

/** Compact homepage version of the Follow One Litre journey on /why-is-fuel-expensive. */
export function FollowOneLitreTeaser() {
  return (
    <section id="one-litre" className="scroll-mt-24 bg-slate-50 py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="One litre. Several costs."
          title="Why does filling up cost so much?"
          description="Follow one litre from crude oil to the forecourt and see what happens to its price along the way."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[3fr_1fr]">
          {[
            { title: "Market and supply chain", steps: litreJourneySteps.filter((s) => s.category !== "tax"), cols: "grid-cols-2 sm:grid-cols-3" },
            { title: "Government taxes", steps: litreJourneySteps.filter((s) => s.category === "tax"), cols: "grid-cols-2 lg:grid-cols-1" },
          ].map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-charcoal-600">{group.title}</h3>
              <ol className={cn("mt-3 grid gap-2 sm:gap-3", group.cols)}>
                {group.steps.map((step) => (
                  <li
                    key={step.number}
                    className={cn(
                      "flex flex-col justify-between gap-1.5 rounded border p-3 sm:p-4",
                      step.category === "tax" ? "border-navy-900 bg-navy-900 text-white" : "border-slate-200 bg-white text-navy-900"
                    )}
                  >
                    <span className={cn("text-xs font-extrabold tabular-nums", step.category === "tax" ? "text-petrol-300" : "text-petrol-600")}>
                      {String(step.number).padStart(2, "0")}
                    </span>
                    <span className="text-base font-bold leading-tight">{step.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-2xl text-sm text-charcoal-600">
          Steps 1–6 are market and company costs. Steps 7 and 8 are taxes set by government. Market and company costs are not the same as profit.
        </p>
        <div className="mt-8">
          <LinkButton href="/why-is-fuel-expensive#one-litre" variant="secondary" className="min-h-12">
            Follow one litre
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
