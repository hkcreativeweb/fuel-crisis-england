"use client";

import { useId, useState } from "react";
import { formatNumber } from "@/lib/utils";

const LITRES_PER_UK_GALLON = 4.54609;

type Prices = { petrol: number; diesel: number; dataPeriod: string };

function NumberField({ label, hint, value, onChange, step = "any", min = 0 }: { label: string; hint?: string; value: string; onChange: (v: string) => void; step?: string; min?: number }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-navy-900">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 min-h-11 w-full rounded-md border border-slate-300 px-3.5 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
      />
      {hint ? <p className="mt-1 text-xs text-charcoal-600">{hint}</p> : null}
    </div>
  );
}

const gbp = (n: number) => `${n < 0 ? "-" : ""}£${Math.abs(n).toFixed(2)}`;

/**
 * "Is the cheaper station worth the drive?" A worked example the visitor controls. The base price is the real latest UK
 * weekly average; every other input is the visitor's own (the starting values are examples, not data).
 */
export function DetourSavingsCalculator({ prices }: { prices: Prices }) {
  const [fuel, setFuel] = useState<"petrol" | "diesel">("petrol");
  const [litres, setLitres] = useState("40");
  const [cheaper, setCheaper] = useState("3");
  const [miles, setMiles] = useState("6");
  const [mpg, setMpg] = useState("45");

  const base = prices[fuel];
  const l = Number(litres);
  const diff = Number(cheaper);
  const extra = Number(miles);
  const m = Number(mpg);
  const valid = [l, diff, extra, m].every((n) => Number.isFinite(n) && n >= 0) && m > 0 && l > 0;

  const pumpSaving = valid ? (l * diff) / 100 : 0;
  const detourLitres = valid ? (extra / m) * LITRES_PER_UK_GALLON : 0;
  const detourCost = valid ? (detourLitres * base) / 100 : 0;
  const net = pumpSaving - detourCost;
  const breakEvenMiles = valid && base > 0 ? (pumpSaving / ((LITRES_PER_UK_GALLON / m) * (base / 100))) : 0;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-bold text-navy-900">Is the cheaper station worth the drive?</h3>
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-amber-700">Sample calculation</span>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-charcoal-700">
        Change the numbers to match your own journey. The starting values are examples, not data about any real station.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="detour-fuel" className="block text-sm font-semibold text-navy-900">
            Fuel
          </label>
          <select
            id="detour-fuel"
            value={fuel}
            onChange={(e) => setFuel(e.target.value as "petrol" | "diesel")}
            className="mt-1.5 min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
          </select>
          <p className="mt-1 text-xs text-charcoal-600">
            Extra driving is priced at the UK weekly average, {base.toFixed(1)}p/L ({prices.dataPeriod.replace(/^Week commencing/, "week of")}, GOV.UK / DESNZ). It is an average, not a station price.
          </p>
        </div>
        <NumberField label="Litres you will buy" value={litres} onChange={setLitres} />
        <NumberField label="How much cheaper is the other station? (pence per litre)" value={cheaper} onChange={setCheaper} step="0.1" hint="Check the actual difference in Google Maps or Waze." />
        <NumberField label="Extra miles to get there and back" value={miles} onChange={setMiles} step="0.5" />
        <NumberField label="Your car's miles per gallon (mpg)" value={mpg} onChange={setMpg} step="1" hint="Example value. Use your own." />
      </div>

      {valid ? (
        <div className="mt-5 rounded-md bg-slate-50 p-4" aria-live="polite">
          <dl className="grid gap-2 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-charcoal-600">Saved at the pump</dt>
              <dd className="text-lg font-extrabold tabular-nums text-navy-900">{gbp(pumpSaving)}</dd>
            </div>
            <div>
              <dt className="text-charcoal-600">Cost of the extra driving</dt>
              <dd className="text-lg font-extrabold tabular-nums text-navy-900">{gbp(detourCost)}</dd>
            </div>
            <div>
              <dt className="text-charcoal-600">Net saving</dt>
              <dd className={"text-lg font-extrabold tabular-nums " + (net > 0 ? "text-emerald-800" : "text-red-700")}>{gbp(net)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed text-charcoal-700">
            {net > 0
              ? `On these numbers the drive saves you about ${gbp(net)}. It stops paying for itself beyond roughly ${formatNumber(Math.round(breakEvenMiles * 10) / 10)} extra miles.`
              : "On these numbers the extra driving costs as much as the saving, or more."}
          </p>
        </div>
      ) : (
        <p className="mt-5 text-sm text-red-700">Enter positive numbers to see the result.</p>
      )}

      <p className="mt-3 text-xs leading-relaxed text-charcoal-600">
        How it works: saving = litres × price difference. Extra driving = extra miles ÷ mpg × 4.546 litres per gallon × the average price. It leaves out your time, wear and tear, and any other trips. It is an illustration, not a prediction.
      </p>
    </div>
  );
}
