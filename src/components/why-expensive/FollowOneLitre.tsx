import { litreJourneySteps } from "@/lib/data/litre-journey";
import { PumpPriceBreakdownVisual } from "@/components/cost-of-living/PumpPriceBreakdownVisual";
import { cn } from "@/lib/utils";

/**
 * The journey of one litre as a vertical flow: each stage is a native
 * <details> element, so it expands on tap or keyboard without JavaScript.
 * Stage text comes from litre-journey.ts; the pence split is shown once,
 * below, by PumpPriceBreakdownVisual.
 */
export function FollowOneLitre({ pumpPricePence, pumpPriceLabel }: { pumpPricePence?: number; pumpPriceLabel?: string }) {
  return (
    <div>
      <ol className="relative max-w-2xl">
        <li className="relative pb-3 pl-12">
          <span
            className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-xs font-extrabold text-white"
            aria-hidden="true"
          >
            1L
          </span>
          <p className="pt-1.5 text-sm font-extrabold uppercase tracking-[0.14em] text-navy-900">One litre</p>
        </li>
        {litreJourneySteps.map((step) => {
          const isTax = step.category === "tax";
          return (
            <li key={step.number} className="relative pb-3 pl-12">
              {/* Connector line between stages */}
              <span className="absolute -top-3 bottom-0 left-[17px] w-0.5 bg-slate-200" aria-hidden="true" />
              <span
                className={cn(
                  "absolute left-0 top-1 z-10 flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold",
                  isTax ? "bg-petrol-500 text-white" : "border-2 border-navy-900 bg-white text-navy-900"
                )}
                aria-hidden="true"
              >
                {step.number}
              </span>
              <details className={cn("group rounded border", isTax ? "border-navy-900 bg-navy-900 text-white" : "border-slate-200 bg-white")}>
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-2 [&::-webkit-details-marker]:hidden">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-base font-bold">{step.title}</span>
                    <span className={cn("text-xs font-bold uppercase tracking-wide", isTax ? "text-petrol-300" : "text-charcoal-600")}>
                      {isTax ? "Tax" : "Market cost"}
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-lg leading-none transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className={cn("px-4 pb-4 text-sm leading-relaxed", isTax ? "text-slate-200" : "text-charcoal-700")}>{step.detail}</p>
              </details>
            </li>
          );
        })}
        <li className="relative pl-12">
          <span className="absolute -top-3 left-[17px] h-4 w-0.5 bg-slate-200" aria-hidden="true" />
          <span
            className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-petrol-500 text-sm font-extrabold text-white"
            aria-hidden="true"
          >
            £
          </span>
          <p className="pt-1.5 text-sm font-extrabold uppercase tracking-[0.14em] text-navy-900">
            Pump price
            {pumpPricePence ? (
              <span className="ml-2 normal-case tracking-normal text-petrol-600">
                {pumpPricePence.toFixed(1)}p a litre{pumpPriceLabel ? ` (UK petrol average, ${pumpPriceLabel})` : ""}
              </span>
            ) : null}
          </p>
        </li>
      </ol>
      <p className="mt-3 text-xs text-charcoal-600">Tap a stage to see what it covers.</p>

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
