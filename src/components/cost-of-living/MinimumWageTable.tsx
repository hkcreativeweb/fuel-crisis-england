import { currentMinimumWage, previousMinimumWage } from "@/lib/data/wage-data";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";
import { Alert } from "@/components/ui/Alert";
import { formatDate } from "@/lib/utils";

export function MinimumWageTable() {
  const anyVerified = currentMinimumWage.rates.some((r) => r.verified);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-navy-900">National Minimum Wage / National Living Wage</h3>
          <p className="mt-1 text-sm text-charcoal-700">
            Rates changed from {formatDate(currentMinimumWage.effectiveFrom)}, shown alongside the previous
            rates effective from {formatDate(previousMinimumWage.effectiveFrom)}.
          </p>
        </div>
        <DataStatusBadge status={anyVerified ? "live" : "unavailable"} />
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-charcoal-600">
              <th scope="col" className="py-2.5 pr-4">Band</th>
              <th scope="col" className="py-2.5 pr-4">From {formatDate(currentMinimumWage.effectiveFrom)}</th>
              <th scope="col" className="py-2.5">From {formatDate(previousMinimumWage.effectiveFrom)}</th>
            </tr>
          </thead>
          <tbody>
            {currentMinimumWage.rates.map((rate, i) => (
              <tr key={rate.band} className="border-b border-slate-100 last:border-0">
                <td className="py-2.5 pr-4 font-medium text-navy-900">{rate.band}</td>
                <td className="py-2.5 pr-4 tabular-nums font-semibold text-navy-900">
                  {rate.verified && rate.ratePerHour !== null ? `£${rate.ratePerHour.toFixed(2)}` : "Not yet verified"}
                </td>
                <td className="py-2.5 tabular-nums text-charcoal-700">
                  {previousMinimumWage.rates[i]?.verified && previousMinimumWage.rates[i]?.ratePerHour !== null
                    ? `£${previousMinimumWage.rates[i].ratePerHour!.toFixed(2)}`
                    : "Not yet verified"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!anyVerified ? (
        <div className="mt-5">
          <Alert tone="warning" title="Current tax and wage figures will be added once verified against official sources.">
            We do not invent minimum wage rates. Figures will be published here, with a direct citation to
            GOV.UK / the Low Pay Commission, once confirmed.
          </Alert>
        </div>
      ) : null}

      <p className="mt-5 text-xs text-charcoal-600">
        Source:{" "}
        {currentMinimumWage.sourceUrl ? (
          <a href={currentMinimumWage.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
            {currentMinimumWage.source}
          </a>
        ) : (
          currentMinimumWage.source
        )}
      </p>

      <div className="mt-6 rounded-xl bg-slate-50 p-5">
        <p className="text-sm leading-relaxed text-charcoal-700">
          <strong>The minimum wage has increased substantially over time</strong> — it has not stood
          still. The more meaningful question is not whether it has risen, but whether those increases
          have kept pace with the overall cost of living workers actually face, including housing, energy,
          food, and transport costs. See{" "}
          <a href="#wages-vs-cost-of-living" className="font-semibold text-petrol-600 underline underline-offset-2">
            Are Wages Keeping Up?
          </a>{" "}
          below.
        </p>
      </div>
    </div>
  );
}
