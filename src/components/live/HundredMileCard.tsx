import { StatusBadge } from "@/components/ui/StatusBadge";

const LITRES_PER_GALLON = 4.54609;
const MILES = 100;
const MPG = 40;

/** "What does 100 miles cost?": computed from the latest petrol price, shown with the working. */
export function HundredMileCard({ petrolPence, dataPeriod }: { petrolPence: number; dataPeriod: string }) {
  const cost = (MILES / MPG) * LITRES_PER_GALLON * (petrolPence / 100);
  return (
    <article aria-label="What does 100 miles cost?" className="rounded border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-base font-bold text-navy-900">What does 100 miles cost?</h4>
        <StatusBadge status="estimate" />
      </div>
      <p className="mt-3 text-4xl font-extrabold tabular-nums text-navy-900">£{cost.toFixed(2)}</p>
      <p className="mt-3 text-sm font-semibold text-charcoal-700">Based on:</p>
      <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-charcoal-700">
        <li>a {MPG} mpg petrol car</li>
        <li>
          {petrolPence.toFixed(1)}p/L latest available petrol price ({dataPeriod.charAt(0).toLowerCase() + dataPeriod.slice(1)})
        </li>
      </ul>
      <p className="mt-3 text-xs text-charcoal-600">
        Calculation: {MILES} miles ÷ {MPG} mpg × {LITRES_PER_GALLON} litres × {petrolPence.toFixed(1)}p/L.
      </p>
      <p className="mt-2 text-xs text-charcoal-600">
        This is an FCE estimate, not an official figure. It covers fuel only and excludes other vehicle costs such as insurance, tax, servicing and depreciation.
      </p>
    </article>
  );
}
