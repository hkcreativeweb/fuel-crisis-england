"use client";

import { useMemo, useState } from "react";
import { calculateOwnership, evComparisonDefaults } from "@/lib/calculator/ev-comparison";
import { liveIndicators } from "@/lib/data/live-snapshot";
import { formatGBP, cn, formatDate } from "@/lib/utils";

const petrolLive = liveIndicators.find((i) => i.id === "petrol-price")!;
const YEAR_OPTIONS = [1, 3, 5, 8, 10];

function Field({
  id,
  label,
  suffix,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  id: string;
  label: string;
  suffix: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-navy-900">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-2 border border-slate-300 bg-white px-3 py-2 focus-within:border-petrol-500">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          className="w-full min-w-0 border-0 bg-transparent p-0 text-sm text-navy-900 focus:outline-none focus:ring-0"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number.isFinite(e.target.valueAsNumber) ? e.target.valueAsNumber : 0)}
        />
        <span className="shrink-0 text-xs text-charcoal-500">{suffix}</span>
      </div>
    </div>
  );
}

/** Minimal inline chart: two cumulative-cost lines over the ownership period. No external chart lib needed. */
function CumulativeChart({ ice, ev }: { ice: number[]; ev: number[] }) {
  const W = 640;
  const H = 220;
  const pad = { top: 12, right: 12, bottom: 24, left: 56 };
  const max = Math.max(...ice, ...ev) * 1.05 || 1;
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;

  const pathFor = (values: number[]) =>
    values
      .map((v, i) => {
        const x = pad.left + (i / Math.max(1, values.length - 1)) * innerW;
        const y = pad.top + innerH - (v / max) * innerH;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Cumulative ownership cost over time" className="w-full">
      {[0, 1, 2, 3].map((i) => {
        const y = pad.top + (i / 3) * innerH;
        const value = max - (i / 3) * max;
        return (
          <g key={i}>
            <line x1={pad.left} x2={W - pad.right} y1={y} y2={y} stroke="#e2e8f0" strokeWidth="1" />
            <text x={pad.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#565b66">
              £{Math.round(value / 1000)}k
            </text>
          </g>
        );
      })}
      {ice.map((_, i) => (
        <text key={i} x={pad.left + (i / Math.max(1, ice.length - 1)) * innerW} y={H - 6} textAnchor="middle" fontSize="10" fill="#565b66">
          Y{i + 1}
        </text>
      ))}
      <path d={pathFor(ice)} fill="none" stroke="#565b66" strokeWidth="2.5" />
      <path d={pathFor(ev)} fill="none" stroke="#d62828" strokeWidth="2.5" />
    </svg>
  );
}

export function EVComparisonCalculator() {
  const d = evComparisonDefaults;
  const [years, setYears] = useState(d.years);
  const [annualMileage, setAnnualMileage] = useState(d.annualMileage);
  const [icePurchasePrice, setIcePurchasePrice] = useState(d.icePurchasePrice);
  const [evPurchasePrice, setEvPurchasePrice] = useState(d.evPurchasePrice);
  const [mpg, setMpg] = useState(d.mpg);
  const [fuelPricePerLitre, setFuelPricePerLitre] = useState(Number(petrolLive.value) || 172.0);
  const [kwhPer100Miles, setKwhPer100Miles] = useState(d.kwhPer100Miles);
  const [homeElecPricePerKwh, setHomeElecPricePerKwh] = useState(d.homeElecPricePerKwh);
  const [publicElecPricePerKwh, setPublicElecPricePerKwh] = useState(d.publicElecPricePerKwh);
  const [homeChargingPercent, setHomeChargingPercent] = useState(d.homeChargingPercent);
  const [iceMaintenancePerYear, setIceMaintenancePerYear] = useState(d.iceMaintenancePerYear);
  const [evMaintenancePerYear, setEvMaintenancePerYear] = useState(d.evMaintenancePerYear);
  const [iceInsurancePerYear, setIceInsurancePerYear] = useState(d.iceInsurancePerYear);
  const [evInsurancePerYear, setEvInsurancePerYear] = useState(d.evInsurancePerYear);
  const [iceTaxPerYear, setIceTaxPerYear] = useState(d.iceTaxPerYear);
  const [evTaxPerYear, setEvTaxPerYear] = useState(d.evTaxPerYear);

  const result = useMemo(
    () =>
      calculateOwnership({
        years,
        annualMileage,
        icePurchasePrice,
        evPurchasePrice,
        mpg,
        fuelPricePerLitre,
        iceMaintenancePerYear,
        iceInsurancePerYear,
        iceTaxPerYear,
        kwhPer100Miles,
        homeElecPricePerKwh,
        publicElecPricePerKwh,
        homeChargingPercent,
        evMaintenancePerYear,
        evInsurancePerYear,
        evTaxPerYear,
      }),
    [
      years,
      annualMileage,
      icePurchasePrice,
      evPurchasePrice,
      mpg,
      fuelPricePerLitre,
      iceMaintenancePerYear,
      iceInsurancePerYear,
      iceTaxPerYear,
      kwhPer100Miles,
      homeElecPricePerKwh,
      publicElecPricePerKwh,
      homeChargingPercent,
      evMaintenancePerYear,
      evInsurancePerYear,
      evTaxPerYear,
    ]
  );

  return (
    <div className="border border-slate-200 bg-white p-6 sm:p-8">
      {/* Live data vs assumptions */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wide text-accent-live">
          <span className="h-[6px] w-[6px] rounded-full bg-accent-live" aria-hidden="true" />
          Live: UK petrol price
        </span>
        <span className="text-charcoal-500">Last updated {formatDate(petrolLive.lastUpdated)} — GOV.UK / DESNZ</span>
      </div>

      {/* Ownership period */}
      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Ownership period</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {YEAR_OPTIONS.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYears(y)}
              aria-pressed={years === y}
              className={cn(
                "border px-4 py-2 text-sm font-bold transition-colors",
                years === y ? "border-petrol-500 bg-petrol-500 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
              )}
            >
              {y} {y === 1 ? "year" : "years"}
            </button>
          ))}
        </div>
      </div>

      {/* Core inputs */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Petrol / diesel</p>
          <div className="mt-3 grid gap-4">
            <Field id="ice-price" label="Purchase price" suffix="£" value={icePurchasePrice} onChange={setIcePurchasePrice} min={0} max={200000} step={100} />
            <Field id="ice-mpg" label="Fuel economy" suffix="UK mpg" value={mpg} onChange={setMpg} min={5} max={150} step={1} />
            <Field id="ice-fuel" label="Fuel price" suffix="pence/litre" value={fuelPricePerLitre} onChange={setFuelPricePerLitre} min={1} max={400} step={0.1} />
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-petrol-600">Electric</p>
          <div className="mt-3 grid gap-4">
            <Field id="ev-price" label="Purchase price" suffix="£" value={evPurchasePrice} onChange={setEvPurchasePrice} min={0} max={200000} step={100} />
            <Field id="ev-kwh" label="Electricity use" suffix="kWh/100 miles" value={kwhPer100Miles} onChange={setKwhPer100Miles} min={5} max={80} step={1} />
            <Field id="annual-mileage" label="Annual mileage (both vehicles)" suffix="miles/yr" value={annualMileage} onChange={setAnnualMileage} min={0} max={50000} step={100} />
          </div>
        </div>
      </div>

      {/* Charging mix */}
      <div className="mt-6 bg-slate-50 p-4">
        <label htmlFor="home-charge" className="block text-xs font-bold uppercase tracking-wide text-charcoal-600">
          Charging mix: home vs public
        </label>
        <div className="mt-3 flex items-center gap-4">
          <input
            id="home-charge"
            type="range"
            min={0}
            max={100}
            step={5}
            value={homeChargingPercent}
            onChange={(e) => setHomeChargingPercent(Number(e.target.value))}
            className="h-2 w-full accent-petrol-500"
          />
          <span className="w-32 shrink-0 text-right text-sm font-bold tabular-nums text-navy-900">
            {homeChargingPercent}% home / {100 - homeChargingPercent}% public
          </span>
        </div>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field id="home-elec" label="Home electricity price" suffix="pence/kWh" value={homeElecPricePerKwh} onChange={setHomeElecPricePerKwh} min={1} max={100} step={0.5} />
          <Field id="public-elec" label="Public charging price" suffix="pence/kWh" value={publicElecPricePerKwh} onChange={setPublicElecPricePerKwh} min={1} max={150} step={0.5} />
        </div>
      </div>

      {/* Advanced settings */}
      <details className="group mt-6 border border-slate-200">
        <summary className="cursor-pointer list-none bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-charcoal-700">
          Advanced settings: maintenance, insurance &amp; tax
        </summary>
        <div className="grid gap-6 p-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Petrol / diesel, per year</p>
            <div className="mt-3 grid gap-4">
              <Field id="ice-maint" label="Maintenance & servicing" suffix="£/yr" value={iceMaintenancePerYear} onChange={setIceMaintenancePerYear} min={0} max={5000} step={10} />
              <Field id="ice-ins" label="Insurance" suffix="£/yr" value={iceInsurancePerYear} onChange={setIceInsurancePerYear} min={0} max={5000} step={10} />
              <Field id="ice-tax" label="Road tax (VED)" suffix="£/yr" value={iceTaxPerYear} onChange={setIceTaxPerYear} min={0} max={2000} step={5} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-petrol-600">Electric, per year</p>
            <div className="mt-3 grid gap-4">
              <Field id="ev-maint" label="Maintenance & servicing" suffix="£/yr" value={evMaintenancePerYear} onChange={setEvMaintenancePerYear} min={0} max={5000} step={10} />
              <Field id="ev-ins" label="Insurance" suffix="£/yr" value={evInsurancePerYear} onChange={setEvInsurancePerYear} min={0} max={5000} step={10} />
              <Field id="ev-tax" label="Road tax (VED)" suffix="£/yr" value={evTaxPerYear} onChange={setEvTaxPerYear} min={0} max={2000} step={5} />
            </div>
          </div>
        </div>
      </details>

      {/* Results */}
      <div className="mt-8 border-t border-slate-200 pt-8">
        <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">{years}-year ownership result</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="border border-slate-200 p-5">
            <p className="text-sm font-bold text-navy-900">Petrol / diesel</p>
            <dl className="mt-3 space-y-1.5 text-sm">
              <div className="flex justify-between"><dt className="text-charcoal-600">Energy / fuel ({years}yr)</dt><dd className="font-semibold tabular-nums text-navy-900">{formatGBP(result.ice.energy * years)}</dd></div>
              <div className="flex justify-between"><dt className="text-charcoal-600">Maintenance ({years}yr)</dt><dd className="font-semibold tabular-nums text-navy-900">{formatGBP(result.ice.maintenance * years)}</dd></div>
              <div className="flex justify-between"><dt className="text-charcoal-600">Insurance ({years}yr)</dt><dd className="font-semibold tabular-nums text-navy-900">{formatGBP(result.ice.insurance * years)}</dd></div>
              <div className="flex justify-between"><dt className="text-charcoal-600">Tax ({years}yr)</dt><dd className="font-semibold tabular-nums text-navy-900">{formatGBP(result.ice.tax * years)}</dd></div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5"><dt className="font-semibold text-charcoal-700">Running cost total</dt><dd className="font-bold tabular-nums text-navy-900">{formatGBP(result.ice.runningTotal * years)}</dd></div>
              <div className="flex justify-between"><dt className="font-semibold text-charcoal-700">Purchase price</dt><dd className="font-bold tabular-nums text-navy-900">{formatGBP(result.ice.purchasePrice)}</dd></div>
              <div className="flex justify-between border-t-2 border-navy-900 pt-1.5"><dt className="font-extrabold text-navy-900">Total cost</dt><dd className="font-extrabold tabular-nums text-navy-900">{formatGBP(result.ice.totalCost)}</dd></div>
            </dl>
          </div>

          <div className="border border-petrol-200 bg-petrol-50 p-5">
            <p className="text-sm font-bold text-petrol-700">Electric</p>
            <dl className="mt-3 space-y-1.5 text-sm">
              <div className="flex justify-between"><dt className="text-charcoal-700">Charging ({years}yr)</dt><dd className="font-semibold tabular-nums text-navy-900">{formatGBP(result.ev.energy * years)}</dd></div>
              <div className="flex justify-between"><dt className="text-charcoal-700">Maintenance ({years}yr)</dt><dd className="font-semibold tabular-nums text-navy-900">{formatGBP(result.ev.maintenance * years)}</dd></div>
              <div className="flex justify-between"><dt className="text-charcoal-700">Insurance ({years}yr)</dt><dd className="font-semibold tabular-nums text-navy-900">{formatGBP(result.ev.insurance * years)}</dd></div>
              <div className="flex justify-between"><dt className="text-charcoal-700">Tax ({years}yr)</dt><dd className="font-semibold tabular-nums text-navy-900">{formatGBP(result.ev.tax * years)}</dd></div>
              <div className="flex justify-between border-t border-petrol-200 pt-1.5"><dt className="font-semibold text-petrol-700">Running cost total</dt><dd className="font-bold tabular-nums text-navy-900">{formatGBP(result.ev.runningTotal * years)}</dd></div>
              <div className="flex justify-between"><dt className="font-semibold text-petrol-700">Purchase price</dt><dd className="font-bold tabular-nums text-navy-900">{formatGBP(result.ev.purchasePrice)}</dd></div>
              <div className="flex justify-between border-t-2 border-petrol-700 pt-1.5"><dt className="font-extrabold text-petrol-700">Total cost</dt><dd className="font-extrabold tabular-nums text-petrol-700">{formatGBP(result.ev.totalCost)}</dd></div>
            </dl>
          </div>
        </div>

        {/* Headline result */}
        <div className="mt-6 bg-navy-950 p-6 text-center sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Under these assumptions</p>
          <p className="mt-2 text-2xl font-extrabold tabular-nums text-white sm:text-3xl">
            {result.cheaper === "equal"
              ? "Both options cost about the same"
              : `The ${result.cheaper === "ev" ? "EV" : "petrol/diesel car"} costs ${formatGBP(Math.abs(result.differenceTotal))} less over ${years} years`}
          </p>
          <p className="mt-3 text-sm text-slate-300">
            Cost per mile (including purchase price): petrol/diesel {formatGBP(result.ice.costPerMile, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} &middot; EV{" "}
            {formatGBP(result.ev.costPerMile, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="mt-3 text-xs text-slate-400">
            {result.breakEvenYears === null
              ? "There is no break-even point: one vehicle is both cheaper to buy and cheaper to run under these figures."
              : result.breakEvenWithinPeriod
              ? `Based on these assumptions, the lower running costs would offset the higher purchase price after approximately ${result.breakEvenYears.toFixed(1)} years.`
              : `Based on these assumptions, break-even would take approximately ${result.breakEvenYears.toFixed(1)} years, longer than the ${years}-year period selected.`}
          </p>
        </div>

        {/* Chart */}
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Total cost over ownership period</p>
          <div className="mt-3">
            <CumulativeChart ice={result.ice.cumulativeByYear} ev={result.ev.cumulativeByYear} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-5 text-xs font-semibold text-charcoal-700">
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-4 bg-charcoal-600" /> Petrol / diesel</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-4 bg-petrol-500" /> Electric</span>
          </div>
        </div>
      </div>

      <p className="mt-8 border-t border-slate-200 pt-4 text-xs leading-relaxed text-charcoal-500">
        These figures are calculated directly from the inputs above using standard arithmetic (no hidden
        adjustments). The petrol price starts from today&apos;s verified UK average; every other figure is
        a user-editable assumption or typical UK estimate, not a live price. Change any field to see your
        own comparison.
      </p>
    </div>
  );
}
