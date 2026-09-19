"use client";

import { useState } from "react";
import { formatGBP } from "@/lib/utils";

export function DontPayMoreSection() {
  const [priceDiff, setPriceDiff] = useState(5);
  const [litres, setLitres] = useState(50);
  const saving = (priceDiff * litres) / 100;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <p className="text-sm leading-relaxed text-charcoal-700">
        Motorists can compare prices using legitimate fuel-price comparison services, supermarket pricing
        pages, and independent forecourt listings (see the tools below). Route planning can also help you
        find a cheaper station without going far out of your way — but it&apos;s rarely worth a long detour
        purely to save a tiny amount.
      </p>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Is it worth the detour? A simple calculation</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="dp-diff" className="block text-sm font-semibold text-navy-900">
              Price difference
            </label>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5">
              <input
                id="dp-diff"
                type="number"
                min={0}
                max={50}
                step={0.5}
                value={priceDiff}
                onChange={(e) => setPriceDiff(Math.max(0, e.target.valueAsNumber || 0))}
                className="w-full border-0 p-0 text-base text-navy-900 focus:outline-none focus:ring-0"
              />
              <span className="text-sm text-charcoal-600">p/litre cheaper</span>
            </div>
          </div>
          <div>
            <label htmlFor="dp-litres" className="block text-sm font-semibold text-navy-900">
              Litres you need
            </label>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5">
              <input
                id="dp-litres"
                type="number"
                min={0}
                max={200}
                step={1}
                value={litres}
                onChange={(e) => setLitres(Math.max(0, e.target.valueAsNumber || 0))}
                className="w-full border-0 p-0 text-base text-navy-900 focus:outline-none focus:ring-0"
              />
              <span className="text-sm text-charcoal-600">litres</span>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-white p-4 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Total saved by filling up there instead</p>
          <p className="mt-1 text-3xl font-extrabold tabular-nums text-navy-900">{formatGBP(saving)}</p>
        </div>
        <p className="mt-3 text-xs text-charcoal-600">
          Weigh that saving against the extra distance, time, and fuel used to get there — a detour that
          costs more in fuel than it saves isn&apos;t worth it.
        </p>
      </div>
    </div>
  );
}
