"use client";

import { useMemo, useState } from "react";
import type { EconomicSeries } from "@/lib/types";
import { petrolPriceSeriesAnnual, crudeOilSeriesAnnual } from "@/lib/data/economic-series";
import { companyProfitTimelines, latestCompanyFinancials, companies } from "@/lib/data/company-financials";
import { Alert } from "@/components/ui/Alert";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";
import { LineChartSVG } from "@/components/charts/LineChartSVG";
import { cn } from "@/lib/utils";

type ToggleOption = {
  id: string;
  label: string;
  series: EconomicSeries;
};

const baseOptions: ToggleOption[] = [
  { id: "petrol", label: "UK average petrol price", series: petrolPriceSeriesAnnual },
  { id: "crude", label: "Crude oil price", series: crudeOilSeriesAnnual },
  {
    id: "inflation",
    label: "Inflation (CPI)",
    series: { id: "cpi-explorer", label: "CPI inflation rate", unit: "%", nominal: true, points: [], source: "Not yet verified", sourceUrl: null, asOf: null, status: "unavailable" },
  },
];

function companyProfitSeries(slug: string): EconomicSeries {
  const timeline = slug === "shell" || slug === "bp" ? companyProfitTimelines[slug as "shell" | "bp"] : [];
  const company = companies.find((c) => c.slug === slug)!;

  if (timeline.length > 0) {
    return {
      id: `profit-${slug}`,
      label: `${company.name} net income`,
      unit: "£m",
      nominal: true,
      points: timeline.map((y) => ({ period: y.fiscalYear.replace("FY", ""), value: y.netIncome?.value ?? null })),
      source: `${company.name} annual results (see Corporate Profits Timeline for full citations)`,
      sourceUrl: timeline[timeline.length - 1]?.sourceUrl ?? null,
      asOf: timeline[timeline.length - 1]?.asOf ?? null,
      status: "historical",
    };
  }

  const latest = latestCompanyFinancials[slug];
  return {
    id: `profit-${slug}`,
    label: `${company.name} net income`,
    unit: "£m",
    nominal: true,
    points: latest?.netIncome?.value !== null && latest?.netIncome ? [{ period: latest.fiscalYear.replace("FY", ""), value: latest.netIncome.value }] : [],
    source: latest?.source ?? "Not yet verified",
    sourceUrl: latest?.sourceUrl ?? null,
    asOf: latest?.asOf ?? null,
    status: "historical",
  };
}

export function ProfitsVsFuelExplorer() {
  const [companySlug, setCompanySlug] = useState("shell");
  const [selected, setSelected] = useState<string[]>(["petrol", "profits"]);

  const profitOption: ToggleOption = useMemo(
    () => ({ id: "profits", label: `${companies.find((c) => c.slug === companySlug)?.name} net income`, series: companyProfitSeries(companySlug) }),
    [companySlug]
  );

  const options = useMemo(() => [baseOptions[0], profitOption, ...baseOptions.slice(1)], [profitOption]);

  const activeSeries = useMemo(
    () => options.filter((o) => selected.includes(o.id)).map((o) => o.series).filter((s) => s.points.length > 0),
    [selected, options]
  );
  const hasData = activeSeries.length > 0;
  const periods = Array.from(new Set(activeSeries.flatMap((s) => s.points.map((p) => p.period)))).sort();
  const selectedWithoutData = selected.filter((id) => !activeSeries.some((s) => s.id === options.find((o) => o.id === id)?.series.id));

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-navy-900">Corporate Profits vs Fuel Prices</h3>
        <DataStatusBadge status={hasData ? "historical" : "unavailable"} />
      </div>
      <p className="mt-2 text-sm text-charcoal-700">
        Choose a company, then select which trends to compare on the same indexed chart. Different
        measures (pence per litre, pounds, percentages) are shown as an index relative to their starting
        value so trends can be compared side by side.
      </p>

      <div className="mt-5">
        <label htmlFor="company-select" className="block text-xs font-semibold uppercase tracking-wide text-charcoal-600">
          Company
        </label>
        <select
          id="company-select"
          value={companySlug}
          onChange={(e) => setCompanySlug(e.target.value)}
          className="mt-1.5 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
        >
          {companies.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggle(option.id)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                active ? "border-petrol-500 bg-petrol-50 text-petrol-700" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {hasData ? (
          <>
            <LineChartSVG series={activeSeries} periods={periods} indexed />
            {selectedWithoutData.length > 0 ? (
              <p className="mt-3 text-xs text-charcoal-600">
                {selectedWithoutData.map((id) => options.find((o) => o.id === id)?.label).join(", ")} not
                shown — no verified historical data connected yet.
              </p>
            ) : null}
          </>
        ) : (
          <Alert tone="info" title="These series aren't connected to verified historical data yet.">
            The comparison tool is fully built and will populate as soon as sourced historical series are
            connected.
          </Alert>
        )}
      </div>

      <Alert tone="warning" title="Correlation does not necessarily mean that one factor caused another." className="mt-6">
        These figures show how two measurements changed over time. They do not, by themselves, prove that
        one caused the other — fuel prices are influenced by crude oil prices, refining costs, wholesale
        markets, taxes, exchange rates, distribution costs, competition and other factors.
      </Alert>
    </div>
  );
}
