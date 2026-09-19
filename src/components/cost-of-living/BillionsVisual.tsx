"use client";

import { useState } from "react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";

const PRESETS = [
  { label: "£1bn", value: 1 },
  { label: "£5bn", value: 5 },
  { label: "£13.4bn — Shell's FY2025 profit", value: 13.359 },
  { label: "£22.5bn — Shell's FY2025 adjusted earnings", value: 13.876 },
  { label: "£24.25bn — a year of Fuel Duty receipts", value: 24.25 },
];

export function BillionsVisual() {
  const [billions, setBillions] = useState(1);

  const raw = billions * 1_000_000_000;
  const millions = billions * 1000;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setBillions(p.value)}
            aria-pressed={billions === p.value}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
              billions === p.value ? "border-petrol-500 bg-petrol-50 text-petrol-700" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <label htmlFor="billions-input" className="block text-sm font-semibold text-navy-900">
          Or enter an amount, in billions of pounds
        </label>
        <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-300 px-3.5 py-2.5">
          <span className="text-charcoal-600">£</span>
          <input
            id="billions-input"
            type="number"
            min={0}
            step={0.1}
            value={billions}
            onChange={(e) => setBillions(Math.max(0, e.target.valueAsNumber || 0))}
            className="w-full border-0 p-0 text-base text-navy-900 focus:outline-none focus:ring-0"
          />
          <span className="text-charcoal-600">billion</span>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl bg-navy-950 p-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">In full</p>
          <p className="mt-2 break-all text-2xl font-extrabold tabular-nums text-white sm:text-3xl">
            £<AnimatedCounter value={raw} />
          </p>
        </div>
        <div className="rounded-2xl bg-navy-950 p-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">As billions</p>
          <p className="mt-2 text-2xl font-extrabold tabular-nums text-white sm:text-3xl">
            £<AnimatedCounter value={billions} formatter={(n) => n.toLocaleString("en-GB", { maximumFractionDigits: 2 })} /> billion
          </p>
        </div>
        <div className="rounded-2xl bg-navy-950 p-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">As millions</p>
          <p className="mt-2 text-2xl font-extrabold tabular-nums text-white sm:text-3xl">
            <AnimatedCounter value={millions} /> million
          </p>
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-charcoal-600">
        A billion is a thousand million — one thousand times larger than a million. Company profit and
        government receipt figures on this page are usually reported in millions; we show them here at
        scale so the size of the number is easier to grasp.
      </p>
    </div>
  );
}
