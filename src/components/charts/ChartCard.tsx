import type { EconomicSeries } from "@/lib/types";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";
import { Alert } from "@/components/ui/Alert";
import { LineChartSVG } from "@/components/charts/LineChartSVG";
import { formatDate } from "@/lib/utils";

export function ChartCard({
  title,
  description,
  series,
  emptyStateNote,
  indexed = false,
}: {
  title: string;
  description?: string;
  series: EconomicSeries[];
  emptyStateNote?: string;
  indexed?: boolean;
}) {
  const hasData = series.some((s) => s.points.some((p) => p.value !== null));
  const overallStatus = hasData ? series[0]?.status ?? "unavailable" : "unavailable";
  const periods = Array.from(new Set(series.flatMap((s) => s.points.map((p) => p.period)))).sort();

  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-navy-900">{title}</h3>
          {description ? <p className="mt-1 text-sm text-charcoal-600">{description}</p> : null}
        </div>
        <DataStatusBadge status={overallStatus} />
      </div>

      {hasData ? (
        <>
          <div className="mt-5">
            <LineChartSVG series={series} periods={periods} indexed={indexed} />
          </div>
          <dl className="mt-5 grid gap-2 border-t border-slate-100 pt-4 text-xs text-charcoal-600 sm:grid-cols-2">
            {series.map((s) => (
              <div key={s.id}>
                <dt className="font-semibold text-charcoal-700">{s.label}</dt>
                <dd>
                  {s.nominal ? "Nominal (not inflation-adjusted)" : "Inflation-adjusted"} &middot; Source:{" "}
                  {s.sourceUrl ? (
                    <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
                      {s.source}
                    </a>
                  ) : (
                    s.source
                  )}
                  {s.asOf ? ` (as of ${formatDate(s.asOf)})` : ""}
                </dd>
              </div>
            ))}
          </dl>
        </>
      ) : (
        <div className="mt-5">
          <Alert tone="info" title="This chart will appear once verified historical data is connected.">
            {emptyStateNote ?? "We do not display estimated or fabricated historical figures."}
          </Alert>
        </div>
      )}
    </div>
  );
}
