"use client";

import { useMemo, useState } from "react";
import { yearlySnapshots, availableYears } from "@/lib/data/yearly-snapshots";
import { GlossaryTerm } from "@/components/ui/GlossaryTerm";
import { glossary } from "@/lib/data/glossary";
import { formatGBP, cn } from "@/lib/utils";

const LITRES_PER_UK_GALLON = 4.54609;
const MILES = 100;

export function HundredMileJourney() {
  const [mpg, setMpg] = useState(40);
  const [year, setYear] = useState(availableYears[availableYears.length - 1]);
  const [fuel, setFuel] = useState<"petrol" | "diesel">("petrol");

  const snapshot = yearlySnapshots[year];
  const pricePencePerLitre = fuel === "petrol" ? snapshot.petrolPencePerLitre : snapshot.dieselPencePerLitre;
  const litres = useMemo(() => (MILES / mpg) * LITRES_PER_UK_GALLON, [mpg]);
  const cost = snapshot.verified && pricePencePerLitre ? (litres * pricePencePerLitre) / 100 : null;

  return (
    <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <p className="block text-sm font-semibold text-navy-900">Fuel</p>
          <div className="mt-1.5 flex gap-1.5">
            {(["petrol", "diesel"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFuel(f)}
                aria-pressed={fuel === f}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-bold capitalize transition-colors",
                  fuel === f ? "border-petrol-500 bg-petrol-500 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="hmj-mpg" className="flex items-center gap-1.5 text-sm font-semibold text-navy-900">
            Vehicle fuel economy (MPG) <GlossaryTerm definition={glossary.mpg} />
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
        <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Estimated cost of a 100-mile journey, {year}</p>
        {cost !== null ? (
          <p className="mt-2 text-4xl font-extrabold tabular-nums text-navy-900">{formatGBP(cost)}</p>
        ) : (
          <p className="mt-2 text-lg font-semibold text-amber-800">Data not available for {year}</p>
        )}
        <p className="mt-2 text-xs text-charcoal-600">Estimated fuel required: {litres.toFixed(1)} litres</p>
      </div>

      <p className="mt-4 text-xs text-charcoal-600">
        This is an estimate, not an exact prediction of what your vehicle will use. Real-world consumption
        varies with driving style, terrain, weather, and vehicle condition.
      </p>

      <details className="group mt-3">
        <summary className="cursor-pointer list-none text-xs font-semibold text-petrol-600">
          <span className="group-open:hidden">How is this calculated? ▾</span>
          <span className="hidden group-open:inline">Hide calculation</span>
        </summary>
        <p className="mt-2 text-xs leading-relaxed text-charcoal-600">
          Litres required = 100 miles ÷ MPG × 4.54609 (litres per UK gallon). Estimated cost = litres ×
          the average verified {fuel} price for {year}, in pence per litre, converted to pounds. See{" "}
          <a href="/sources" className="font-semibold text-petrol-600 underline underline-offset-2">
            Sources &amp; Methodology
          </a>{" "}
          for how that price is verified.
        </p>
      </details>
    </div>
  );
}
