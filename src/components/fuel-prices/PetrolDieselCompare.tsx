import { CountUp } from "@/components/ui/CountUp";
import { formatDate } from "@/lib/utils";

type Figure = { current: number; lastUpdated: string; dataPeriod: string };

/** Petrol and diesel side by side as bars from zero (so the length is honest), with the gap in plain words. Real weekly averages only. */
export function PetrolDieselCompare({ petrol, diesel }: { petrol: Figure; diesel: Figure }) {
  const max = Math.max(petrol.current, diesel.current);
  const gap = diesel.current - petrol.current;
  const rows = [
    { label: "Petrol", f: petrol, bar: "bg-petrol-500" },
    { label: "Diesel", f: diesel, bar: "bg-navy-900" },
  ];
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
      <h3 className="text-base font-bold text-navy-900">Petrol and diesel, this week</h3>
      <p className="mt-1 text-xs text-charcoal-600">
        UK weekly average pump prices, {petrol.dataPeriod.replace(/^Week commencing/, "week of")}. Published {formatDate(petrol.lastUpdated)} by GOV.UK / DESNZ.
      </p>
      <div className="mt-5 space-y-4">
        {rows.map(({ label, f, bar }) => (
          <div key={label}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-semibold text-navy-900">{label}</span>
              <span className="text-xl font-extrabold tabular-nums text-navy-900">
                <CountUp value={f.current} decimals={1} />
                <span className="ml-1 text-xs font-bold text-charcoal-600">p/L</span>
              </span>
            </div>
            <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-slate-100" role="img" aria-label={`${label}: ${f.current.toFixed(1)} pence per litre`}>
              <div className={"h-full rounded-full " + bar} style={{ width: `${(f.current / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-charcoal-700">
        {Math.abs(gap) < 0.05
          ? "Petrol and diesel are at the same average price this week."
          : `Diesel is ${Math.abs(gap).toFixed(1)}p a litre ${gap > 0 ? "dearer" : "cheaper"} than petrol this week. That is the gap between the two national averages, not a price at any station.`}
      </p>
    </div>
  );
}
