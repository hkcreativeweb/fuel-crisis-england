import { companyProfitTimelines } from "@/lib/data/company-financials";
import { Alert } from "@/components/ui/Alert";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";
import { ContentTag } from "@/components/ui/ContentTag";

function formatGBPMillions(value: number): string {
  const abs = Math.abs(value).toLocaleString("en-GB");
  return value < 0 ? `-£${abs}m` : `£${abs}m`;
}

function CompanyTimeline({ label, years }: { label: string; years: typeof companyProfitTimelines.shell }) {
  return (
    <div className="min-w-0 rounded border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-navy-900">{label}</h3>
        <DataStatusBadge status={years.length > 0 ? "historical" : "unavailable"} />
      </div>

      {years.length > 0 ? (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-charcoal-600">
                <th scope="col" className="py-2 pr-4">Year</th>
                <th scope="col" className="py-2 pr-4">Net income</th>
                <th scope="col" className="py-2 pr-4">Revenue</th>
                <th scope="col" className="py-2">Context</th>
              </tr>
            </thead>
            <tbody>
              {years.map((y) => (
                <tr key={y.fiscalYear} className="border-b border-slate-100 last:border-0 align-top">
                  <td className="py-2.5 pr-4 font-semibold text-navy-900">{y.fiscalYear}</td>
                  <td className="py-2.5 pr-4 tabular-nums text-charcoal-700">
                    {y.netIncome?.value !== null && y.netIncome ? formatGBPMillions(y.netIncome.value) : "Not yet verified"}
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-charcoal-700">
                    {y.revenue?.value !== null && y.revenue ? formatGBPMillions(y.revenue.value) : "Not yet verified"}
                  </td>
                  <td className="py-2.5 text-xs text-charcoal-600">{y.contextNote ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4">
          <Alert tone="info" title="Historical timeline not yet verified.">
            We will publish a multi-year timeline, including both strong-profit and weaker-profit years,
            once each figure is checked against {label}&apos;s official annual reports.
          </Alert>
        </div>
      )}
    </div>
  );
}

export function CorporateProfitsTimeline() {
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-2">
        <CompanyTimeline label="Shell" years={companyProfitTimelines.shell} />
        <CompanyTimeline label="BP" years={companyProfitTimelines.bp} />
      </div>
      <div className="mt-6 flex items-start gap-3 rounded-md bg-slate-50 p-4">
        <ContentTag type="economic-analysis" className="mt-0.5 shrink-0" />
        <p className="text-xs leading-relaxed text-charcoal-600">
          Shell and BP report in US dollars. Figures above are converted to pounds sterling at
          £1&nbsp;=&nbsp;$1.3353 (Bank of England, spot rate, 17 September 2026) for every year shown.
          This is a single fixed rate, not the historical rate for each year, so these are approximate,
          present-day GBP equivalents rather than what the amount was worth in pounds at the time.
        </p>
      </div>
    </div>
  );
}
