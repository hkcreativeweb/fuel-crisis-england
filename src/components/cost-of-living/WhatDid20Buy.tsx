"use client";

import { useState } from "react";
import { yearlySnapshots, availableYears } from "@/lib/data/yearly-snapshots";
import { cn } from "@/lib/utils";

const AMOUNTS = [10, 20, 30, 50];

function Metric({ label, value, unit }: { label: string; value: string | null; unit?: string }) {
  return (
    <div className="rounded bg-slate-50 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">{label}</p>
      {value ? (
        <p className="mt-2 text-2xl font-extrabold tabular-nums text-navy-900">
          {value}
          {unit ? <span className="ml-1 text-sm font-semibold text-charcoal-600">{unit}</span> : null}
        </p>
      ) : (
        <p className="mt-2 text-sm font-medium text-amber-800">Not yet verified for this year</p>
      )}
    </div>
  );
}

export function WhatDid20Buy() {
  const [year, setYear] = useState(availableYears[availableYears.length - 1]);
  const [amount, setAmount] = useState(20);
  const snapshot = yearlySnapshots[year];

  const petrolLitres = snapshot.verified && snapshot.petrolPencePerLitre ? (amount * 100) / snapshot.petrolPencePerLitre : null;
  const dieselLitres = snapshot.verified && snapshot.dieselPencePerLitre ? (amount * 100) / snapshot.dieselPencePerLitre : null;
  const wageHours = snapshot.minimumWageVerified && snapshot.minimumWagePerHour ? amount / snapshot.minimumWagePerHour : null;

  return (
    <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Amount spent</p>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {AMOUNTS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAmount(a)}
            aria-pressed={amount === a}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-bold transition-colors",
              amount === a ? "border-petrol-500 bg-petrol-500 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
            )}
          >
            £{a}
          </button>
        ))}
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-wide text-charcoal-600">Year</p>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {availableYears.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => setYear(y)}
            aria-pressed={year === y}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-bold transition-colors",
              year === y ? "border-petrol-500 bg-petrol-500 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
            )}
          >
            {y}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className="text-5xl font-extrabold text-navy-900">£{amount}</span>
        <span className="mb-1.5 text-charcoal-600">spent in {year}</span>
      </div>
      {snapshot.verified && snapshot.petrolPencePerLitre ? (
        <p className="mt-1 text-xs text-charcoal-500">Based on {snapshot.petrolPencePerLitre.toFixed(1)}p/L (petrol, {year})</p>
      ) : null}

      <div className="mt-6 h-4 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-petrol-500 transition-[width] duration-700 ease-out"
          style={{ width: petrolLitres ? "100%" : "0%" }}
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Metric label="Petrol litres" value={petrolLitres ? petrolLitres.toFixed(1) : null} unit="litres" />
        <Metric label="Diesel litres" value={dieselLitres ? dieselLitres.toFixed(1) : null} unit="litres" />
        <Metric label="Minimum-wage hours required" value={wageHours ? wageHours.toFixed(1) : null} unit="hours" />
        <Metric
          label="Average earnings context"
          value={snapshot.averageWeeklyEarnings ? `£${snapshot.averageWeeklyEarnings.toFixed(0)}` : null}
          unit="/week"
        />
      </div>

      <p className="mt-6 text-xs text-charcoal-600">
        &quot;Equivalent modern purchasing power&quot; (inflation-adjusted) will be added once a verified
        CPI index level for {year} is connected — we don&apos;t estimate this figure in the meantime.
      </p>

      <details className="group mt-3">
        <summary className="cursor-pointer list-none text-xs font-semibold text-petrol-600">
          <span className="group-open:hidden">How is this calculated? ▾</span>
          <span className="hidden group-open:inline">Hide calculation</span>
        </summary>
        <p className="mt-2 text-xs leading-relaxed text-charcoal-600">
          Litres = amount spent ÷ verified pence-per-litre price for {year}, converted to pounds. Wage
          hours = amount spent ÷ that year&apos;s verified minimum wage per hour. See{" "}
          <a href="/sources" className="font-semibold text-petrol-600 underline underline-offset-2">
            Sources &amp; Methodology
          </a>{" "}
          for how each figure is verified.
        </p>
      </details>
    </div>
  );
}
