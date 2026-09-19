"use client";

import { useState } from "react";
import { wageGapMeasures } from "@/lib/data/wage-gap";
import { ChartCard } from "@/components/charts/ChartCard";
import { cn } from "@/lib/utils";

export function WageGapExplorer() {
  const [selectedId, setSelectedId] = useState(wageGapMeasures[0].id);
  const measure = wageGapMeasures.find((m) => m.id === selectedId) ?? wageGapMeasures[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <p className="text-sm font-semibold text-navy-900">Choose a comparison:</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {wageGapMeasures.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setSelectedId(m.id)}
            aria-pressed={selectedId === m.id}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
              selectedId === m.id ? "border-petrol-500 bg-petrol-50 text-petrol-700" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
            )}
          >
            {m.title}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold text-navy-900">{measure.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{measure.explanation}</p>
      </div>

      <div className="mt-6">
        <ChartCard title={measure.title} series={measure.series} />
      </div>
    </div>
  );
}
