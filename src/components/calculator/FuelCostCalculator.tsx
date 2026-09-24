"use client";

import { useMemo, useState } from "react";
import { calculateFuelCost } from "@/lib/calculator/fuel-cost";
import { ukWeeklyAverage } from "@/lib/data/hero-fuel-snapshot";
import { formatGBP } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { HowWeCalculate } from "@/components/ui/HowWeCalculate";

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
          "mt-1.5 flex items-center gap-2 rounded-md border bg-white px-3 focus-within:border-petrol-500 " +
          (error ? "border-red-600" : "border-slate-300")
        }
      >
        <input
          id={id}
          type="number"
          inputMode="decimal"
          className="w-full min-w-0 border-0 bg-transparent px-0 py-2.5 text-base text-navy-900 focus:outline-none focus:ring-0"
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

export type LiveFuelPrices = { petrol: number; diesel: number; dataPeriod: string };

const PRICE_RISE_PENCE = 10;

/**
 * Personal fuel cost calculator. Everything runs in the browser: nothing
 * entered here, including income, is sent to or stored on a server.
 * `prices` lets server pages pass the latest GOV.UK weekly averages;
 * otherwise the last verified weekly averages are used.
 */
export function FuelCostCalculator({ prices }: { prices?: LiveFuelPrices }) {
  const averages: LiveFuelPrices = prices ?? {
    petrol: ukWeeklyAverage.petrol.current,
    diesel: ukWeeklyAverage.diesel.current,
    dataPeriod: ukWeeklyAverage.petrol.dataPeriod,
  };
  const round = (p: number) => Math.round(p * 10) / 10;
  const defaults = {
    fuel: "petrol" as const,
    milesPerWeek: 150,
    mpg: 45,
    pencePerLitre: round(averages.petrol),
    weeks: 52,
    monthlyIncome: Number.NaN,
  };

  const [fuel, setFuel] = useState<"petrol" | "diesel">(defaults.fuel);
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
  // Same calculation at a price 10p higher, so the "what if" uses the one shared formula.
  const risen = useMemo(
    () => (inputsValid ? calculateFuelCost({ milesPerWeek, mpg, pencePerLitre: pencePerLitre + PRICE_RISE_PENCE, weeks }) : null),
    [inputsValid, milesPerWeek, mpg, pencePerLitre, weeks]
  );

  const incomeShare =
    result && !validationMessage(monthlyIncome, LIMITS.income) ? (result.monthlyCost / monthlyIncome) * 100 : null;

  function chooseFuel(next: "petrol" | "diesel") {
    setFuel(next);
    setPencePerLitre(round(averages[next]));
  }

  function reset() {
    setFuel(defaults.fuel);
    setMilesPerWeek(defaults.milesPerWeek);
    setMpg(defaults.mpg);
    setPencePerLitre(defaults.pencePerLitre);
    setWeeks(defaults.weeks);
    setMonthlyIncome(defaults.monthlyIncome);
  }

  return (
    <Card className="p-6 sm:p-8">
      <div role="radiogroup" aria-labelledby="fuel-type-label">
        <p id="fuel-type-label" className="text-sm font-semibold text-navy-900">
          Fuel type
        </p>
        <div className="mt-1.5 inline-flex rounded-md border border-slate-300 p-1">
          {(["petrol", "diesel"] as const).map((f) => (
            <button
              key={f}
              type="button"
              role="radio"
              aria-checked={fuel === f}
              onClick={() => chooseFuel(f)}
              className={
                "min-h-11 min-w-24 rounded px-4 text-sm font-semibold capitalize transition-colors " +
                (fuel === f ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-slate-50")
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field id="miles" label="Miles driven per week" suffix="miles" value={milesPerWeek} onChange={setMilesPerWeek} spec={LIMITS.miles} />
        <Field id="mpg" label="Vehicle fuel economy" suffix="UK mpg" value={mpg} onChange={setMpg} spec={LIMITS.mpg} />
        <Field
          id="price"
          label={`Current ${fuel} price`}
          suffix="pence / litre"
          value={pencePerLitre}
          onChange={setPencePerLitre}
          spec={LIMITS.price}
          hint={`Starts at the UK average ${fuel} price, ${averages.dataPeriod.charAt(0).toLowerCase() + averages.dataPeriod.slice(1)} (GOV.UK). Change it to your local price.`}
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
        <Result label="Per week" value={result ? formatGBP(result.weeklyCost) : "—"} />
        <Result label="Per month (average)" value={result ? formatGBP(result.monthlyCost) : "—"} />
        <Result label="Per year" value={result ? formatGBP(result.annualCost) : "—"} highlight />
      </div>

      {result && risen ? (
        <div className="mt-5 rounded-md border-l-4 border-petrol-500 bg-petrol-50 p-4 text-sm text-charcoal-700" aria-live="polite">
          <p className="font-bold text-navy-900">
            What if {fuel} rises by {PRICE_RISE_PENCE}p a litre?
          </p>
          <p className="mt-1">
            Your yearly cost would go from {formatGBP(result.annualCost)} to{" "}
            <strong className="text-navy-900">{formatGBP(risen.annualCost)}</strong>, an extra{" "}
            <strong className="text-navy-900">{formatGBP(risen.annualCost - result.annualCost)}</strong> a year (
            {formatGBP(risen.weeklyCost - result.weeklyCost)} a week). A fall of the same size would save the same
            amount.
          </p>
        </div>
      ) : null}

      {incomeShare !== null ? (
        <p className="mt-5 rounded-md bg-slate-50 p-4 text-sm text-charcoal-700">
          Fuel would take about <strong className="text-navy-900">{incomeShare.toFixed(1)}%</strong> of your
          monthly take-home pay. This is a personal illustration from the numbers you entered, not an official
          affordability measure.
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <HowWeCalculate className="min-w-0 flex-1 basis-72">
          <p>
            <strong>Litres used</strong> = miles ÷ mpg × 4.54609 (the litres in a UK gallon).
          </p>
          <p>
            <strong>Cost</strong> = litres × price per litre. Per month is the weekly cost × 52 ÷ 12; per year is the
            weekly cost × the weeks you drive.
          </p>
          <p>
            <strong>The 10p rise</strong> repeats the same sum with the price 10p higher.
          </p>
          <p className="text-xs text-charcoal-600">
            A calculated estimate from the numbers you enter. It doesn&apos;t account for driving style, terrain,
            weather or vehicle condition, and isn&apos;t financial advice. Default prices are the latest UK weekly
            averages from GOV.UK / DESNZ.
          </p>
        </HowWeCalculate>
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
