"use client";

import { useMemo, useState } from "react";
import { calculateFuelCost } from "@/lib/calculator/fuel-cost";
import { ukWeeklyAverage } from "@/lib/data/hero-fuel-snapshot";
import { formatGBP } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

type FieldSpec = { min: number; max: number; step: number };

const LIMITS = {
  miles: { min: 1, max: 2000, step: 1 },
  mpg: { min: 1, max: 150, step: 1 },
  price: { min: 1, max: 400, step: 0.1 },
  weeks: { min: 1, max: 52, step: 1 },
  income: { min: 1, max: 100000, step: 1 },
} satisfies Record<string, FieldSpec>;

function validationMessage(value: number, { min, max }: FieldSpec): string | null {
  if (!Number.isFinite(value)) return "Enter a number.";
  if (value < min || value > max) return `Enter a value between ${min} and ${max.toLocaleString("en-GB")}.`;
  return null;
}

function Field({
  id,
  label,
  suffix,
  value,
  onChange,
  spec,
  optional = false,
  hint,
}: {
  id: string;
  label: string;
  suffix: string;
  value: number;
  onChange: (v: number) => void;
  spec: FieldSpec;
  optional?: boolean;
  hint?: string;
}) {
  const isEmpty = !Number.isFinite(value);
  const error = optional && isEmpty ? null : validationMessage(value, spec);
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-navy-900">
        {label}
        {optional ? <span className="font-normal text-charcoal-600"> (optional)</span> : null}
      </label>
      <div
        className={
          "mt-1.5 flex items-center gap-2 rounded-md border bg-white px-3 py-2 focus-within:border-petrol-500 " +
          (error ? "border-red-600" : "border-slate-300")
        }
      >
        <input
          id={id}
          type="number"
          inputMode="decimal"
          className="w-full min-w-0 border-0 bg-transparent p-0 text-base text-navy-900 focus:outline-none focus:ring-0"
          value={isEmpty ? "" : value}
          min={spec.min}
          max={spec.max}
          step={spec.step}
          aria-invalid={error ? true : undefined}
          aria-describedby={[error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined}
          onChange={(e) => onChange(e.target.valueAsNumber)}
        />
        <span className="shrink-0 text-sm text-charcoal-600">{suffix}</span>
      </div>
      {hint ? (
        <p id={hintId} className="mt-1 text-xs text-charcoal-600">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-1 text-xs font-semibold text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Result({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={highlight ? "rounded-md bg-petrol-50 p-3 sm:bg-transparent sm:p-0" : undefined}>
      <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-600">{label}</p>
      <p className={"mt-1 text-xl font-extrabold tabular-nums " + (highlight ? "text-petrol-600" : "text-navy-900")}>{value}</p>
    </div>
  );
}

/**
 * Personal fuel cost calculator. Everything runs in the browser: nothing
 * entered here, including income, is sent to or stored on a server.
 * `defaultPencePerLitre` lets server pages pass the latest GOV.UK figure;
 * otherwise the last verified weekly average is used.
 */
export function FuelCostCalculator({
  defaultPencePerLitre,
  showPriceChangeEffect = false,
}: {
  defaultPencePerLitre?: number;
  /** Adds a line showing what a 10p/litre price change would mean for the annual cost. */
  showPriceChangeEffect?: boolean;
}) {
  const defaults = {
    milesPerWeek: 150,
    mpg: 45,
    pencePerLitre: Math.round((defaultPencePerLitre ?? ukWeeklyAverage.petrol.current) * 10) / 10,
    weeks: 52,
    monthlyIncome: Number.NaN,
  };

  const [milesPerWeek, setMilesPerWeek] = useState(defaults.milesPerWeek);
  const [mpg, setMpg] = useState(defaults.mpg);
  const [pencePerLitre, setPencePerLitre] = useState(defaults.pencePerLitre);
  const [weeks, setWeeks] = useState(defaults.weeks);
  const [monthlyIncome, setMonthlyIncome] = useState(defaults.monthlyIncome);

  const inputsValid =
    !validationMessage(milesPerWeek, LIMITS.miles) &&
    !validationMessage(mpg, LIMITS.mpg) &&
    !validationMessage(pencePerLitre, LIMITS.price) &&
    !validationMessage(weeks, LIMITS.weeks);

  const result = useMemo(
    () => (inputsValid ? calculateFuelCost({ milesPerWeek, mpg, pencePerLitre, weeks }) : null),
    [inputsValid, milesPerWeek, mpg, pencePerLitre, weeks]
  );

  const incomeShare =
    result && !validationMessage(monthlyIncome, LIMITS.income) ? (result.monthlyCost / monthlyIncome) * 100 : null;

  function reset() {
    setMilesPerWeek(defaults.milesPerWeek);
    setMpg(defaults.mpg);
    setPencePerLitre(defaults.pencePerLitre);
    setWeeks(defaults.weeks);
    setMonthlyIncome(defaults.monthlyIncome);
  }

  return (
    <Card className="p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="miles" label="Miles driven per week" suffix="miles" value={milesPerWeek} onChange={setMilesPerWeek} spec={LIMITS.miles} />
        <Field id="mpg" label="Vehicle fuel economy" suffix="UK mpg" value={mpg} onChange={setMpg} spec={LIMITS.mpg} />
        <Field
          id="price"
          label="Fuel price"
          suffix="pence / litre"
          value={pencePerLitre}
          onChange={setPencePerLitre}
          spec={LIMITS.price}
          hint={`Starts at the latest UK average petrol price (GOV.UK). Change it to your local price or diesel.`}
        />
        <Field id="weeks" label="Weeks of driving per year" suffix="weeks" value={weeks} onChange={setWeeks} spec={LIMITS.weeks} />
        <Field
          id="income"
          label="Monthly take-home pay"
          suffix="£ / month"
          value={monthlyIncome}
          onChange={setMonthlyIncome}
          spec={LIMITS.income}
          optional
          hint="Only used in your browser to show fuel as a share of your pay. Never sent or stored."
        />
      </div>

      <div className="mt-7 grid grid-cols-2 gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3 lg:grid-cols-5" aria-live="polite">
        <Result label="Cost per mile" value={result ? `${result.costPerMilePence.toFixed(1)}p` : "—"} />
        <Result label="Litres / week" value={result ? result.litresPerWeek.toFixed(1) : "—"} />
        <Result label="Weekly cost" value={result ? formatGBP(result.weeklyCost) : "—"} />
        <Result label="Monthly (average)" value={result ? formatGBP(result.monthlyCost) : "—"} />
        <Result label="Annual cost" value={result ? formatGBP(result.annualCost) : "—"} highlight />
      </div>

      {showPriceChangeEffect && result ? (
        <p className="mt-5 rounded-md border-l-4 border-petrol-500 bg-petrol-50 p-4 text-sm text-charcoal-700">
          At your mileage, a <strong className="text-navy-900">10p per litre</strong> rise or fall would change
          your annual fuel cost by about{" "}
          <strong className="text-navy-900">{formatGBP(result.litresPerWeek * weeks * 0.1)}</strong>. Change the
          fuel price above to try other amounts.
        </p>
      ) : null}

      {incomeShare !== null ? (
        <p className="mt-5 rounded-md bg-slate-50 p-4 text-sm text-charcoal-700">
          Fuel would take about <strong className="text-navy-900">{incomeShare.toFixed(1)}%</strong> of your
          monthly take-home pay. This is a personal illustration from the numbers you entered, not an official
          affordability measure.
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <p className="max-w-2xl text-xs leading-relaxed text-charcoal-600">
          Calculated estimate. Assumes UK mpg and a UK gallon of 4.54609 litres; the monthly figure is the
          weekly cost × 52 ÷ 12 and the annual figure is the weekly cost × the weeks you enter. It does not
          account for driving style, terrain, weather or vehicle condition, and is not financial advice.
        </p>
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-navy-900 hover:bg-slate-50"
        >
          Reset to defaults
        </button>
      </div>
    </Card>
  );
}
