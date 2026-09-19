"use client";

import { useState } from "react";
import { yearlySnapshots, availableYears, currentYear } from "@/lib/data/yearly-snapshots";
import { liveIndicators } from "@/lib/data/live-snapshot";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Alert } from "@/components/ui/Alert";
import { cn } from "@/lib/utils";

const historicalYears = availableYears.filter((y) => y !== currentYear);

function findLive(id: string) {
  return liveIndicators.find((i) => i.id === id);
}

type Row = {
  label: string;
  thenValue: string | null;
  thenNote: string;
  nowValue: string | null;
  nowNote: string;
};

const DEFAULT_HISTORICAL_YEAR = "2022";

export function ThenVsNow() {
  const [thenYear, setThenYear] = useState(
    historicalYears.includes(DEFAULT_HISTORICAL_YEAR) ? DEFAULT_HISTORICAL_YEAR : historicalYears[0]
  );
  const snapshot = yearlySnapshots[thenYear];

  const rows: Row[] = [
    {
      label: "Petrol",
      thenValue: snapshot.petrolPencePerLitre !== null ? `${snapshot.petrolPencePerLitre.toFixed(1)}p` : null,
      thenNote: snapshot.pricesAsOf ?? "Not available",
      nowValue: `${findLive("petrol-price")?.value}p`,
      nowNote: findLive("petrol-price")?.dataPeriod ?? "",
    },
    {
      label: "Diesel",
      thenValue: snapshot.dieselPencePerLitre !== null ? `${snapshot.dieselPencePerLitre.toFixed(1)}p` : null,
      thenNote: snapshot.pricesAsOf ?? "Not available",
      nowValue: `${findLive("diesel-price")?.value}p`,
      nowNote: findLive("diesel-price")?.dataPeriod ?? "",
    },
    {
      label: "Fuel Duty",
      thenValue: snapshot.fuelDutyPencePerLitre !== null ? `${snapshot.fuelDutyPencePerLitre.toFixed(2)}p` : null,
      thenNote: `Rate in force during ${thenYear}`,
      nowValue: `${findLive("fuel-duty")?.value}p`,
      nowNote: findLive("fuel-duty")?.dataPeriod ?? "",
    },
    {
      label: "CPI inflation",
      thenValue: snapshot.cpiIndex !== null ? String(snapshot.cpiIndex) : null,
      thenNote: `${thenYear} figure`,
      nowValue: `${findLive("inflation")?.value}%`,
      nowNote: findLive("inflation")?.dataPeriod ?? "",
    },
    {
      label: "Average earnings",
      thenValue: snapshot.averageWeeklyEarnings !== null ? `£${snapshot.averageWeeklyEarnings.toFixed(0)}/week` : null,
      thenNote: `${thenYear} figure`,
      nowValue: `£${findLive("earnings")?.value}/week`,
      nowNote: findLive("earnings")?.dataPeriod ?? "",
    },
    {
      label: "Minimum wage",
      thenValue: snapshot.minimumWageVerified && snapshot.minimumWagePerHour !== null ? `£${snapshot.minimumWagePerHour.toFixed(2)}/hour` : null,
      thenNote: `${thenYear} rate`,
      nowValue: `£${findLive("minimum-wage")?.value}/hour`,
      nowNote: findLive("minimum-wage")?.dataPeriod ?? "",
    },
    {
      label: "Bank Rate",
      thenValue: snapshot.bankRatePercent !== null ? `${snapshot.bankRatePercent}%` : null,
      thenNote: `${thenYear} figure`,
      nowValue: `${findLive("bank-rate")?.value}%`,
      nowNote: findLive("bank-rate")?.dataPeriod ?? "",
    },
    {
      label: "100-mile journey",
      thenValue: null,
      thenNote: "Historical calculation — not available for this year",
      nowValue: `£${findLive("hundred-mile-journey")?.value}`,
      nowNote: "Calculated from today's price",
    },
  ];

  return (
    <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-navy-900">THEN:</span>
        {historicalYears.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => setThenYear(y)}
            aria-pressed={thenYear === y}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors",
              thenYear === y ? "border-slate-600 bg-slate-700 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
            )}
          >
            {y}
          </button>
        ))}
        <span className="ml-2 text-sm font-semibold text-navy-900">vs NOW:</span>
        <StatusBadge status="live" />
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-charcoal-600">
              <th scope="col" className="py-2.5 pr-4">Indicator</th>
              <th scope="col" className="py-2.5 pr-4">Historical ({thenYear})</th>
              <th scope="col" className="py-2.5">Current</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-slate-100 last:border-0 align-top">
                <td className="py-3 pr-4 font-semibold text-navy-900">{row.label}</td>
                <td className="py-3 pr-4">
                  {row.thenValue !== null ? (
                    <>
                      <span className="font-bold tabular-nums text-navy-900">{row.thenValue}</span>
                      <p className="mt-0.5 text-[11px] text-charcoal-600">{row.thenNote}</p>
                    </>
                  ) : (
                    <span className="text-xs font-medium text-amber-800">Not yet available</span>
                  )}
                </td>
                <td className="py-3">
                  <span className="font-bold tabular-nums text-navy-900">{row.nowValue}</span>
                  <p className="mt-0.5 text-[11px] text-charcoal-600">{row.nowNote}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Alert tone="warning" title="These figures come from different periods.">
          Historical figures describe completed periods; live and latest-available figures describe
          current conditions. We show them side by side for comparison, but they are not the same kind of
          measurement — a single-day price is not directly equivalent to a full year&apos;s average.
        </Alert>
      </div>
    </div>
  );
}
