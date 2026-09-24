import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { litreJourneySteps } from "@/lib/data/litre-journey";
import { cn } from "@/lib/utils";

/** Compact homepage version of the Follow One Litre journey on /why-is-fuel-expensive. */
export function FollowOneLitreTeaser() {
  return (
    <section id="one-litre" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="One litre. Several costs."
          title="Why does filling up cost so much?"
          description="Follow one litre from crude oil to the forecourt and see what happens to its price along the way."
        />
        <ol className="mt-8 grid grid-cols-2 gap-2 sm:mt-10 sm:grid-cols-4 sm:gap-3">
          {litreJourneySteps.map((step) => (
            <li
              key={step.number}
              className={cn(
                "flex flex-col justify-between gap-1.5 rounded border p-3 sm:gap-3 sm:p-4",
                step.category === "tax" ? "border-navy-900 bg-navy-900 text-white" : "border-slate-200 bg-white text-navy-900"
              )}
            >
              <span className={cn("text-xs font-extrabold tabular-nums", step.category === "tax" ? "text-petrol-300" : "text-petrol-600")}>
                {String(step.number).padStart(2, "0")}
              </span>
              <span className="text-base font-bold leading-tight">{step.title}</span>
              <span className={cn("text-xs font-bold uppercase tracking-wide", step.category === "tax" ? "text-slate-300" : "text-charcoal-500")}>
                {step.category === "tax" ? "Tax" : "Market cost"}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-5 max-w-2xl text-sm text-charcoal-600">
          Steps 1–6 are market and company costs. Steps 7 and 8 are taxes set by government.
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
