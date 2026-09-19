"use client";

import { useMemo, useState } from "react";
import { calculateFuelCost } from "@/lib/calculator/fuel-cost";
import { formatGBP } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

const DEFAULTS = {
  milesPerWeek: 150,
  mpg: 45,
  pencePerLitre: 148,
  weeks: 52,
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

export function FuelCostCalculator() {
  const [milesPerWeek, setMilesPerWeek] = useState(DEFAULTS.milesPerWeek);
  const [mpg, setMpg] = useState(DEFAULTS.mpg);
  const [pencePerLitre, setPencePerLitre] = useState(DEFAULTS.pencePerLitre);
  const [weeks, setWeeks] = useState(DEFAULTS.weeks);

  const result = useMemo(
    () => calculateFuelCost({ milesPerWeek, mpg, pencePerLitre, weeks }),
    [milesPerWeek, mpg, pencePerLitre, weeks]
  );

  return (
    <Card className="p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="miles" label="Miles driven per week" suffix="miles" value={milesPerWeek} onChange={setMilesPerWeek} min={0} max={2000} step={1} />
        <Field id="mpg" label="Vehicle fuel economy" suffix="UK mpg" value={mpg} onChange={setMpg} min={1} max={150} step={1} />
        <Field id="price" label="Fuel price" suffix="pence / litre" value={pencePerLitre} onChange={setPencePerLitre} min={1} max={400} step={0.1} />
        <Field id="weeks" label="Number of weeks" suffix="weeks" value={weeks} onChange={setWeeks} min={1} max={52} step={1} />
      </div>

      <div className="mt-7 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-600">Litres used / week</p>
          <p className="mt-1 text-xl font-extrabold tabular-nums text-navy-900">
            {result ? result.litresPerWeek.toFixed(1) : "—"}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-600">Weekly cost</p>
          <p className="mt-1 text-xl font-extrabold tabular-nums text-navy-900">{result ? formatGBP(result.weeklyCost) : "—"}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-600">Monthly estimate</p>
          <p className="mt-1 text-xl font-extrabold tabular-nums text-navy-900">{result ? formatGBP(result.monthlyCost) : "—"}</p>
        </div>
        <div className="rounded-xl bg-petrol-50 p-3 sm:bg-transparent sm:p-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-600">Annual estimate</p>
          <p className="mt-1 text-xl font-extrabold tabular-nums text-petrol-600">{result ? formatGBP(result.annualCost) : "—"}</p>
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-charcoal-600">
        These figures are estimates based on the numbers you enter, using UK imperial miles per gallon (mpg)
        and a UK gallon of 4.54609 litres. They do not account for driving style, terrain, weather, or vehicle
        condition, and are not a substitute for your own fuel receipts or professional financial advice.
      </p>
    </Card>
  );
}
