import { StatusBadge } from "@/components/ui/StatusBadge";
import { yearlySnapshots, currentYear } from "@/lib/data/yearly-snapshots";

export function YearInProgressCard({ fuel }: { fuel: "petrol" | "diesel" }) {
  const now = yearlySnapshots[currentYear];
  const liveValue = fuel === "petrol" ? now.petrolPencePerLitre : now.dieselPencePerLitre;

  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <h3 className="text-base font-bold capitalize text-navy-900">{fuel}</h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-emerald-50 p-4">
          <StatusBadge status="live" />
          <p className="mt-2 text-xl font-extrabold tabular-nums text-navy-900">
            {liveValue !== null ? `${liveValue.toFixed(1)}p` : "—"}
          </p>
          <p className="mt-1 text-xs text-charcoal-600">{now.pricesAsOf}</p>
        </div>
        <div className="rounded-md bg-violet-50 p-4">
          <StatusBadge status="not-yet-available" />
          <p className="mt-2 text-xl font-extrabold text-charcoal-400">—</p>
          <p className="mt-1 text-xs text-charcoal-600">
            {currentYear} year-to-date average, not yet calculated from a verified data series
          </p>
        </div>
        <div className="rounded-md bg-slate-50 p-4">
          <StatusBadge status="not-yet-available" />
          <p className="mt-2 text-xl font-extrabold text-charcoal-400">—</p>
          <p className="mt-1 text-xs text-charcoal-600">
            {currentYear} full-year average, only available once the year is complete
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-charcoal-600">
        We never label the live figure above as &quot;the {currentYear} average&quot;. It is a single-day
        snapshot, not an annual average.
      </p>
    </div>
  );
}
