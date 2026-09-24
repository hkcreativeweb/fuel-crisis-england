import type { RegionalPrice } from "@/lib/types";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";
import { formatPencePerLitre } from "@/lib/utils";

export function RegionalComparison({ realData }: { realData: RegionalPrice[] }) {
  const hasData = realData.length > 0;

  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-navy-900">Regional comparison</h3>
        <DataStatusBadge status={hasData ? "live" : "unavailable"} />
      </div>

      {hasData ? (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-charcoal-600">
                <th scope="col" className="py-2.5 pr-4">Region</th>
                <th scope="col" className="py-2.5 pr-4">Petrol</th>
                <th scope="col" className="py-2.5">Diesel</th>
              </tr>
            </thead>
            <tbody>
              {realData.map((row) => (
                <tr key={row.region} className="border-b border-slate-100 last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-navy-900">{row.region}</td>
                  <td className="py-2.5 pr-4 tabular-nums text-charcoal-700">{formatPencePerLitre(row.petrolPencePerLitre)}</td>
                  <td className="py-2.5 tabular-nums text-charcoal-700">{formatPencePerLitre(row.dieselPencePerLitre)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-charcoal-700">
          <p className="font-semibold text-navy-900">Regional prices are not available on this site yet.</p>
          <p>
            The official GOV.UK weekly figures used elsewhere on this site are a single UK-wide average.
            The government does not publish an official regional breakdown.
          </p>
          <p>
            Station-level prices are reported by retailers to the government&apos;s{" "}
            <a
              href="https://www.gov.uk/government/collections/fuel-finder"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-petrol-600 underline underline-offset-2"
            >
              Fuel Finder
            </a>{" "}
            open-data scheme. A regional comparison could be calculated from that data once this site is
            registered for access. We will not show regional figures until then.
          </p>
        </div>
      )}
    </div>
  );
}
