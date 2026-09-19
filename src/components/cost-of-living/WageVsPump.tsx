"use client";

import { useState } from "react";
import { yearlySnapshots, availableYears } from "@/lib/data/yearly-snapshots";
import { Alert } from "@/components/ui/Alert";
import { cn } from "@/lib/utils";

export function WageVsPump() {
  const eligibleYears = availableYears.filter((y) => {
    const s = yearlySnapshots[y];
    return s.verified && s.minimumWageVerified && s.minimumWagePerHour !== null && s.petrolPencePerLitre !== null;
  });
  const [year, setYear] = useState(eligibleYears[eligibleYears.length - 1] ?? availableYears[0]);
  const snapshot = yearlySnapshots[year];

  const eligible = snapshot.minimumWageVerified && snapshot.minimumWagePerHour !== null && snapshot.petrolPencePerLitre !== null;
  const petrolLitres = eligible ? (snapshot.minimumWagePerHour! * 100) / snapshot.petrolPencePerLitre! : null;
  const dieselLitres = eligible && snapshot.dieselPencePerLitre ? (snapshot.minimumWagePerHour! * 100) / snapshot.dieselPencePerLitre : null;

  return (
    <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap gap-2">
        {availableYears.map((y) => {
          const isEligible = eligibleYears.includes(y);
          return (
            <button
              key={y}
              type="button"
              disabled={!isEligible}
              onClick={() => setYear(y)}
              aria-pressed={year === y}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-bold transition-colors",
                !isEligible && "cursor-not-allowed border-slate-200 text-slate-300",
                isEligible && year === y && "border-petrol-500 bg-petrol-500 text-white",
                isEligible && year !== y && "border-slate-300 text-charcoal-700 hover:bg-slate-50"
              )}
            >
              {y}
            </button>
          );
        })}
      </div>

      {eligible && petrolLitres !== null ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded bg-slate-50 p-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Petrol</p>
            <p className="mt-2 text-4xl font-extrabold tabular-nums text-navy-900">{petrolLitres.toFixed(1)}L</p>
            <p className="mt-2 text-sm text-charcoal-700">
              At {year}&apos;s minimum wage (£{snapshot.minimumWagePerHour!.toFixed(2)}/hour), one hour of work bought
              approximately this many litres of petrol.
            </p>
          </div>
          {dieselLitres !== null ? (
            <div className="rounded bg-slate-50 p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Diesel</p>
              <p className="mt-2 text-4xl font-extrabold tabular-nums text-navy-900">{dieselLitres.toFixed(1)}L</p>
              <p className="mt-2 text-sm text-charcoal-700">The same calculation for diesel.</p>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-8">
          <Alert tone="info" title="Not enough verified data for this year yet.">
            We need both a verified minimum wage rate (tied to its correct effective date) and a verified
            fuel price for the same year to calculate this.
          </Alert>
        </div>
      )}

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
    </div>
  );
}
