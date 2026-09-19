"use client";

import { useState } from "react";
import { yearlySnapshots, availableYears } from "@/lib/data/yearly-snapshots";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";

function Metric({
  label,
  value,
  unit,
  prefix,
}: {
  label: string;
  value: number | null;
  unit?: string;
  prefix?: string;
}) {
  return (
    <div className="rounded-md bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-600">{label}</p>
      <p className="mt-1.5 text-xl font-extrabold tabular-nums text-navy-900">
        {value !== null ? (
          <>
            {prefix}
            {value}
            {unit ? <span className="ml-1 text-xs font-semibold text-charcoal-600">{unit}</span> : null}
          </>
        ) : (
          <span className="text-sm font-medium text-amber-800">Not yet verified</span>
        )}
      </p>
    </div>
  );
}

export function FollowTheMoneyTimeline() {
  const [index, setIndex] = useState(availableYears.length - 1);
  const year = availableYears[index];
  const snapshot = yearlySnapshots[year];

  return (
    <div className="rounded border border-slate-200 bg-slate-50 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-3xl font-extrabold tabular-nums text-navy-900">{year}</p>
        <DataStatusBadge status={snapshot.verified ? "historical" : "unavailable"} />
      </div>

      <input
        type="range"
        min={0}
        max={availableYears.length - 1}
        step={1}
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
        aria-label="Select year"
        className="mt-6 h-2 w-full accent-petrol-500"
      />
      <div className="mt-2 flex justify-between text-xs font-semibold text-charcoal-600">
        {availableYears.map((y) => (
          <span key={y}>{y}</span>
        ))}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Petrol" value={snapshot.petrolPencePerLitre} unit="p/litre" />
        <Metric label="Diesel" value={snapshot.dieselPencePerLitre} unit="p/litre" />
        <Metric label="Fuel Duty" value={snapshot.fuelDutyPencePerLitre} unit="p/litre" />
        <Metric label="VAT" value={snapshot.vatRatePercent} unit="%" />
        <Metric label="Minimum Wage" value={snapshot.minimumWageVerified ? snapshot.minimumWagePerHour : null} prefix="£" unit="/hour" />
        <Metric label="Average Earnings" value={snapshot.averageWeeklyEarnings} prefix="£" unit="/week" />
        <Metric label="Bank Rate" value={snapshot.bankRatePercent} unit="%" />
        <Metric label="CPI index" value={snapshot.cpiIndex} unit="index" />
      </div>

      {snapshot.verified ? (
        <p className="mt-6 text-xs text-charcoal-600">
          Source: {snapshot.source}
          {snapshot.sourceUrl ? (
            <>
              {" — "}
              <a href={snapshot.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
                view source
              </a>
            </>
          ) : null}
        </p>
      ) : (
        <p className="mt-6 text-xs text-charcoal-600">No verified figures are connected for {year} yet — we show this honestly rather than estimating.</p>
      )}
    </div>
  );
}
