import type { Company, CompanyFinancialYear, FinancialFigure } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";

function formatFigure(figure: FinancialFigure | null): string {
  if (!figure || figure.value === null) return "Not yet verified";
  const symbol = figure.currency === "USD" ? "$" : figure.currency === "EUR" ? "€" : "£";
  const unit = figure.unit === "billion" ? "bn" : "m";
  return `${symbol}${figure.value.toLocaleString("en-GB")}${unit}`;
}

export function CorporateProfitCard({ company, year }: { company: Company; year: CompanyFinancialYear }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-navy-900">{company.name}</h3>
          <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-600">{year.fiscalYear}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <StatusBadge status={year.verified ? "latest-available" : "not-yet-available"} />
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600">
            Global figures
          </span>
        </div>
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-charcoal-600">Revenue</dt>
          <dd className="font-bold tabular-nums text-navy-900">{formatFigure(year.revenue)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-charcoal-600">{year.netIncome?.measureName ?? "Net income / profit"}</dt>
          <dd className="font-bold tabular-nums text-navy-900">{formatFigure(year.netIncome)}</dd>
        </div>
        {year.adjustedEarnings ? (
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-charcoal-600">{year.adjustedEarnings.measureName}</dt>
            <dd className="font-bold tabular-nums text-navy-900">{formatFigure(year.adjustedEarnings)}</dd>
          </div>
        ) : null}
        <div className="flex items-baseline justify-between gap-3 border-t border-slate-100 pt-3">
          <dt className="text-charcoal-600">Prior year</dt>
          <dd className="tabular-nums text-charcoal-700">{formatFigure(year.priorYearNetIncome)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-charcoal-600">Year-on-year change</dt>
          <dd className="tabular-nums text-charcoal-700">
            {year.percentChangeNetIncome !== null ? `${year.percentChangeNetIncome > 0 ? "+" : ""}${year.percentChangeNetIncome.toFixed(1)}%` : "Not yet verified"}
          </dd>
        </div>
      </dl>

      <p className="mt-4 text-xs text-charcoal-600">
        Operates across: {company.segments.join(", ")}.
      </p>

      <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-charcoal-600">
        Source:{" "}
        {year.sourceUrl ? (
          <a href={year.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
            {year.source}
          </a>
        ) : (
          year.source
        )}
      </div>
    </div>
  );
}
