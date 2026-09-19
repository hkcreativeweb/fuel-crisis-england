"use client";

import { useState } from "react";
import { calculatePumpPriceModel } from "@/lib/calculator/pump-price-model";
import { formatPencePerLitre } from "@/lib/utils";

const DEFAULTS = { wholesalePence: 75.8, dutyPence: 52.95, vatPercent: 20, retailerMarginPence: 11.3 };

function SliderRow({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <label className="font-semibold text-navy-900">{label}</label>
        <span className="font-extrabold tabular-nums text-petrol-600">
          {value.toFixed(1)}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-2 w-full accent-petrol-500"
      />
    </div>
  );
}

export function BuildThePumpPrice() {
  const [wholesalePence, setWholesalePence] = useState(DEFAULTS.wholesalePence);
  const [dutyPence, setDutyPence] = useState(DEFAULTS.dutyPence);
  const [vatPercent, setVatPercent] = useState(DEFAULTS.vatPercent);
  const [retailerMarginPence, setRetailerMarginPence] = useState(DEFAULTS.retailerMarginPence);

  const result = calculatePumpPriceModel({ wholesalePence, dutyPence, vatPercent, retailerMarginPence });

  function reset() {
    setWholesalePence(DEFAULTS.wholesalePence);
    setDutyPence(DEFAULTS.dutyPence);
    setVatPercent(DEFAULTS.vatPercent);
    setRetailerMarginPence(DEFAULTS.retailerMarginPence);
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="rounded-xl bg-amber-50 p-3 text-center text-xs font-bold uppercase tracking-wide text-amber-900 ring-1 ring-amber-600/20">
        A model, not a live pricing prediction
      </div>

      <div className="mt-6 space-y-6">
        <SliderRow label="Wholesale fuel, refining & distribution" value={wholesalePence} onChange={setWholesalePence} min={0} max={150} step={0.5} unit="p" />
        <SliderRow label="Fuel Duty" value={dutyPence} onChange={setDutyPence} min={0} max={100} step={0.5} unit="p" />
        <SliderRow label="Retailer / forecourt margin" value={retailerMarginPence} onChange={setRetailerMarginPence} min={0} max={40} step={0.5} unit="p" />
        <SliderRow label="VAT rate" value={vatPercent} onChange={setVatPercent} min={0} max={30} step={0.5} unit="%" />
      </div>

      <div className="mt-8 rounded-2xl bg-navy-950 p-6 text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Hypothetical pump price</p>
        <p className="mt-2 text-4xl font-extrabold tabular-nums text-white">{formatPencePerLitre(result.total)}</p>
        <p className="mt-1 text-xs text-slate-400">
          Pre-tax subtotal {formatPencePerLitre(result.preVat)} + VAT {formatPencePerLitre(result.vatPence)}
        </p>
      </div>

      <button type="button" onClick={reset} className="mt-4 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-navy-900 hover:bg-slate-50">
        Reset to today&apos;s verified figures
      </button>

      <p className="mt-4 text-xs leading-relaxed text-charcoal-600">
        This model starts from today&apos;s verified breakdown and simply recalculates the arithmetic
        total as you move each slider — it does not simulate how a real change in one component (e.g.
        crude oil) would actually flow through refining margins or wholesale prices in practice.
      </p>
    </div>
  );
}
