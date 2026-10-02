import { StatusBadge } from "@/components/ui/StatusBadge";
import { currentYear } from "@/lib/data/yearly-snapshots";

type Price = { current: number; dataPeriod: string };

/**
 * Latest weekly price next to the 2026 averages. The averages show "Not yet available" until a verified
 * series exists (a table cell reads the real values, so nothing here is typed in).
 */
export function YearInProgressTable({ petrol, diesel }: { petrol: Price; diesel: Price }) {
  const na = <span className="text-charcoal-500">Not yet available</span>;
  return (
    <div className="overflow-x-auto rounded border border-slate-200 bg-white">
      <table className="w-full min-w-[28rem] text-left text-sm">
        <caption className="sr-only">Latest weekly price compared with {currentYear} averages for petrol and diesel</caption>
        <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-charcoal-600">
          <tr>
            <th scope="col" className="px-4 py-3">Measure</th>
            <th scope="col" className="px-4 py-3">Petrol</th>
            <th scope="col" className="px-4 py-3">Diesel</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          <tr>
            <th scope="row" className="px-4 py-3 font-semibold text-navy-900">
              Latest available
              <span className="mt-1 block"><StatusBadge status="latest-available" /></span>
            </th>
            <td className="px-4 py-3 font-extrabold tabular-nums text-navy-900">
              {petrol.current.toFixed(1)}p/L
              <span className="block text-xs font-normal text-charcoal-600">{petrol.dataPeriod}</span>
            </td>
            <td className="px-4 py-3 font-extrabold tabular-nums text-navy-900">
              {diesel.current.toFixed(1)}p/L
              <span className="block text-xs font-normal text-charcoal-600">{diesel.dataPeriod}</span>
            </td>
          </tr>
          <tr>
            <th scope="row" className="px-4 py-3 font-semibold text-navy-900">{currentYear} year-to-date average</th>
            <td className="px-4 py-3">{na}</td>
            <td className="px-4 py-3">{na}</td>
          </tr>
          <tr>
            <th scope="row" className="px-4 py-3 font-semibold text-navy-900">{currentYear} full-year average</th>
            <td className="px-4 py-3">{na}</td>
            <td className="px-4 py-3">{na}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
