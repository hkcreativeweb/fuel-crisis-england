import { fuelDutyHistoricalEvents } from "@/lib/data/fuel-duty-timeline";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";

export function FuelDutyHistoryTable() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-navy-900">Fuel Duty rate changes, 1989–2011</h3>
        <StatusBadge status="historical" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-charcoal-700">
        Every rate change from the introduction of the modern duty structure to the start of the current
        era (2011, when the rate settled at 57.95p until the 2022 cut — see the timeline above). Sourced
        from two independently verified primary sources: the House of Commons Library&apos;s citation of
        HMRC&apos;s own Hydrocarbon Oils Statistical Bulletin (1989–2007), and GOV.UK&apos;s weekly road
        fuel prices series (2008–2011) — the same dataset used throughout this site&apos;s historical
        pump-price data.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-charcoal-600">
              <th scope="col" className="py-2 pr-4">Date</th>
              <th scope="col" className="py-2 pr-4">Rate</th>
              <th scope="col" className="py-2">What happened</th>
            </tr>
          </thead>
          <tbody>
            {fuelDutyHistoricalEvents.map((event) => (
              <tr key={event.id} className="border-b border-slate-100 last:border-0 align-top">
                <td className="whitespace-nowrap py-2.5 pr-4 font-semibold text-navy-900">{formatDate(event.date)}</td>
                <td className="whitespace-nowrap py-2.5 pr-4 tabular-nums font-bold text-petrol-600">
                  {event.ratePencePerLitre !== null ? `${event.ratePencePerLitre.toFixed(2)}p` : "—"}
                </td>
                <td className="py-2.5 text-charcoal-700">
                  {event.description}
                  <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-xs font-semibold text-petrol-600 underline underline-offset-2">
                    Source: {event.source}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
