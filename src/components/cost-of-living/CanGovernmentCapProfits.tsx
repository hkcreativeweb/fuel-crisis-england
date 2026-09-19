"use client";

import { useState } from "react";
import { profitCapOptions } from "@/lib/data/profit-cap-options";
import { cn } from "@/lib/utils";

export function CanGovernmentCapProfits() {
  const [selected, setSelected] = useState(0);
  const option = profitCapOptions[selected];

  return (
    <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap gap-2">
        {profitCapOptions.map((o, i) => (
          <button
            key={o.name}
            type="button"
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
              selected === i ? "border-petrol-500 bg-petrol-50 text-petrol-700" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
            )}
          >
            {o.name}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold text-navy-900">{option.name}</h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="font-semibold text-charcoal-600">What it means</dt>
            <dd className="mt-0.5 text-charcoal-700">{option.meaning}</dd>
          </div>
          <div>
            <dt className="font-semibold text-charcoal-600">Who could be affected</dt>
            <dd className="mt-0.5 text-charcoal-700">{option.whoCouldBeAffected}</dd>
          </div>
          <div>
            <dt className="font-semibold text-charcoal-600">Legal process</dt>
            <dd className="mt-0.5 text-charcoal-700">{option.legalProcess}</dd>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-emerald-50 p-4">
              <dt className="font-semibold text-emerald-800">Possible benefits</dt>
              <dd className="mt-0.5 text-emerald-900">{option.possibleBenefits}</dd>
            </div>
            <div className="rounded-md bg-amber-50 p-4">
              <dt className="font-semibold text-amber-900">Possible risks</dt>
              <dd className="mt-0.5 text-amber-900">{option.possibleRisks}</dd>
            </div>
          </div>
          <div>
            <dt className="font-semibold text-charcoal-600">What evidence would be needed</dt>
            <dd className="mt-0.5 text-charcoal-700">{option.evidenceNeeded}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 rounded-md bg-slate-50 p-4 text-sm font-semibold text-navy-900">
        A company&apos;s total global profit is not the same as the profit it makes on every litre of fuel
        sold in England.
      </div>
    </div>
  );
}
