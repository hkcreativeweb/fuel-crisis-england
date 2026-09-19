"use client";

import { useMemo, useState } from "react";
import { yearlySnapshots, availableYears } from "@/lib/data/yearly-snapshots";
import { formatGBP, cn } from "@/lib/utils";

const LITRES_PER_UK_GALLON = 4.54609;
const MILES = 100;

export function HundredMileJourney() {
  const [mpg, setMpg] = useState(40);
  const [year, setYear] = useState(availableYears[availableYears.length - 1]);

  const snapshot = yearlySnapshots[year];
  const litres = useMemo(() => (MILES / mpg) * LITRES_PER_UK_GALLON, [mpg]);
  const cost = snapshot.verified && snapshot.petrolPencePerLitre ? (litres * snapshot.petrolPencePerLitre) / 100 : null;

  return (
    <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="hmj-mpg" className="block text-sm font-semibold text-navy-900">
            Vehicle fuel economy
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-md border border-slate-300 px-3.5 py-2.5">
            <input
              id="hmj-mpg"
              type="number"
              min={1}
              max={150}
              value={mpg}
              onChange={(e) => setMpg(Math.max(1, e.target.valueAsNumber || 1))}
              className="w-full border-0 p-0 text-base text-navy-900 focus:outline-none focus:ring-0"
            />
            <span className="text-sm text-charcoal-600">UK mpg</span>
          </div>
        </div>
        <div>
          <p className="block text-sm font-semibold text-navy-900">Year</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {availableYears.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                aria-pressed={year === y}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-bold transition-colors",
                  year === y ? "border-petrol-500 bg-petrol-500 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
                )}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded bg-slate-50 p-6 text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Cost of a 100-mile journey, {year}</p>
        {cost !== null ? (
          <p className="mt-2 text-4xl font-extrabold tabular-nums text-navy-900">{formatGBP(cost)}</p>
        ) : (
          <p className="mt-2 text-lg font-semibold text-amber-800">Data not available for {year}</p>
        )}
        <p className="mt-2 text-xs text-charcoal-600">{litres.toFixed(1)} litres used</p>
      </div>

      <p className="mt-4 text-xs text-charcoal-600">
        Based on the average verified petrol price for {year}. Real-world consumption varies with driving
        style, terrain, weather, and vehicle condition.
      </p>
    </div>
  );
}
