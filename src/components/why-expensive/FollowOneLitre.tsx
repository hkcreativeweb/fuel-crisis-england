import { litreJourneySteps } from "@/lib/data/litre-journey";
import { PumpPriceBreakdownVisual } from "@/components/cost-of-living/PumpPriceBreakdownVisual";
import { cn } from "@/lib/utils";

export function FollowOneLitre() {
  return (
    <div>
      <ol className="grid gap-4 sm:grid-cols-2">
        {litreJourneySteps.map((step) => (
          <li key={step.number} className="rounded border border-slate-200 p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-petrol-500 text-xs font-extrabold text-white">
                  {step.number}
                </span>
                <h3 className="text-sm font-bold text-navy-900">{step.title}</h3>
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
                  step.category === "tax" ? "bg-navy-900 text-white" : "bg-slate-100 text-charcoal-700"
                )}
              >
                {step.category === "tax" ? "Tax" : "Company costs"}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{step.detail}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 max-w-2xl">
        <PumpPriceBreakdownVisual />
      </div>

      <p className="mt-4 text-xs text-charcoal-600">
        We don&apos;t have a further verified split of &quot;wholesale fuel, refining &amp; distribution&quot;
        into steps 1–5 individually — that level of detail isn&apos;t separately published, so we show it
        as one bundled, verified figure rather than guessing a finer split.
      </p>
    </div>
  );
}
