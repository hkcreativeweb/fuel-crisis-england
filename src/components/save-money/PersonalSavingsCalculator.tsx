"use client";

import { useMemo, useState } from "react";
import { calculateFuelSaving } from "@/lib/calculator/fuel-saving";
import { formatGBP, cn } from "@/lib/utils";
import type { FuelType } from "@/lib/types";

const DEFAULTS = {
  milesPerWeek: 150,
  mpg: 40,
  pencePerLitre: 168,
  weeks: 52,
  reductionPercent: 10,
};

function Field({
  id,
  label,
  suffix,
  value,
  onChange,
  min,
  max,
  step,
}: {
  id: string;
  label: string;
  suffix: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-navy-900">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 focus-within:border-petrol-500">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          className="w-full min-w-0 border-0 bg-transparent p-0 text-base text-navy-900 focus:outline-none focus:ring-0"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(e.target.valueAsNumber)}
        />
        <span className="shrink-0 text-sm text-charcoal-600">{suffix}</span>
      </div>
    </div>
  );
}

export function PersonalSavingsCalculator() {
  const [fuel, setFuel] = useState<FuelType>("petrol");
  const [milesPerWeek, setMilesPerWeek] = useState(DEFAULTS.milesPerWeek);
  const [mpg, setMpg] = useState(DEFAULTS.mpg);
  const [pencePerLitre, setPencePerLitre] = useState(DEFAULTS.pencePerLitre);
  const [weeks, setWeeks] = useState(DEFAULTS.weeks);
  const [reductionPercent, setReductionPercent] = useState(DEFAULTS.reductionPercent);

  const result = useMemo(
    () => calculateFuelSaving({ milesPerWeek, mpg, pencePerLitre, weeks, reductionPercent }),
    [milesPerWeek, mpg, pencePerLitre, weeks, reductionPercent]
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1 text-sm font-semibold">
        {(["petrol", "diesel"] as FuelType[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFuel(f)}
            aria-pressed={fuel === f}
            className={cn("flex-1 rounded-full px-4 py-2 transition-colors", fuel === f ? "bg-white text-navy-900 shadow-sm" : "text-charcoal-600")}
          >
            {f === "petrol" ? "Petrol" : "Diesel"}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="sc-miles" label="Miles driven per week" suffix="miles" value={milesPerWeek} onChange={setMilesPerWeek} min={0} max={2000} step={1} />
        <Field id="sc-mpg" label={`Current ${fuel} fuel economy`} suffix="UK mpg" value={mpg} onChange={setMpg} min={1} max={150} step={1} />
        <Field id="sc-price" label="Fuel price" suffix="pence / litre" value={pencePerLitre} onChange={setPencePerLitre} min={1} max={400} step={0.1} />
        <Field id="sc-weeks" label="Number of weeks" suffix="weeks" value={weeks} onChange={setWeeks} min={1} max={52} step={1} />
      </div>

      <div className="mt-6">
        <label htmlFor="sc-reduction" className="block text-sm font-semibold text-navy-900">
          Estimated reduction in fuel use from more efficient driving
        </label>
        <div className="mt-2 flex items-center gap-4">
          <input
            id="sc-reduction"
            type="range"
            min={0}
            max={30}
            step={1}
            value={reductionPercent}
            onChange={(e) => setReductionPercent(Number(e.target.value))}
            className="h-2 w-full accent-petrol-500"
          />
          <span className="w-14 shrink-0 text-lg font-extrabold tabular-nums text-navy-900">{reductionPercent}%</span>
        </div>
        <p className="mt-1.5 text-xs text-charcoal-600">
          There is no fixed universal figure for how much smoother driving, maintenance, and journey
          planning combined might reduce your fuel use — this slider lets you explore &quot;what if&quot;
          scenarios using your own assumption.
        </p>
      </div>

      {result ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Current driving</p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-charcoal-600">Weekly cost</dt>
                <dd className="font-bold tabular-nums text-navy-900">{formatGBP(result.current.weeklyCost)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-charcoal-600">Monthly cost</dt>
                <dd className="font-bold tabular-nums text-navy-900">{formatGBP(result.current.monthlyCost)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-charcoal-600">Annual cost</dt>
                <dd className="font-bold tabular-nums text-navy-900">{formatGBP(result.current.annualCost)}</dd>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <dt className="text-charcoal-600">Cost per mile</dt>
                <dd className="font-bold tabular-nums text-navy-900">{formatGBP(result.costPerMile, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-charcoal-600">Cost per 100 miles</dt>
                <dd className="font-bold tabular-nums text-navy-900">{formatGBP(result.costPer100Miles)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl bg-petrol-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-petrol-700">More efficient driving</p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-charcoal-700">Weekly cost</dt>
                <dd className="font-bold tabular-nums text-navy-900">{formatGBP(result.efficient.weeklyCost)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-charcoal-700">Monthly cost</dt>
                <dd className="font-bold tabular-nums text-navy-900">{formatGBP(result.efficient.monthlyCost)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-charcoal-700">Annual cost</dt>
                <dd className="font-bold tabular-nums text-navy-900">{formatGBP(result.efficient.annualCost)}</dd>
              </div>
              <div className="flex justify-between border-t border-petrol-200 pt-2">
                <dt className="font-semibold text-petrol-700">Weekly saving</dt>
                <dd className="font-extrabold tabular-nums text-petrol-700">{formatGBP(result.weeklySaving)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-semibold text-petrol-700">Annual saving</dt>
                <dd className="font-extrabold tabular-nums text-petrol-700">{formatGBP(result.annualSaving)}</dd>
              </div>
            </dl>
          </div>
        </div>
      ) : null}

      <p className="mt-6 text-xs leading-relaxed text-charcoal-600">
        These are estimates only. Actual fuel consumption depends on traffic, weather, vehicle condition,
        driving style, journey type and fuel prices — this calculator does not predict your exact
        real-world saving.
      </p>
    </div>
  );
}
