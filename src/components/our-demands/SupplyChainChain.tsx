"use client";

import { useState } from "react";
import { litreJourneySteps } from "@/lib/data/litre-journey";
import { cn } from "@/lib/utils";

const steps = litreJourneySteps.filter((s) => s.category === "market");

export function SupplyChainChain() {
  const [active, setActive] = useState<number | null>(null);
  const activeStep = steps.find((s) => s.number === active) ?? null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {steps.map((step, i) => (
          <span key={step.number} className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActive(active === step.number ? null : step.number)}
              aria-pressed={active === step.number}
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
                active === step.number ? "bg-petrol-500 text-white" : "bg-white text-navy-900 ring-1 ring-slate-200 hover:bg-slate-100"
              )}
            >
              {step.title}
            </button>
            {i < steps.length - 1 ? (
              <span className="text-slate-400" aria-hidden="true">
                →
              </span>
            ) : null}
          </span>
        ))}
      </div>
      {activeStep ? (
        <p className="mt-3 rounded-md bg-white p-3 text-xs leading-relaxed text-charcoal-700 ring-1 ring-slate-200">{activeStep.detail}</p>
      ) : (
        <p className="mt-3 text-xs text-charcoal-500">Select a stage above to see what it covers.</p>
      )}
    </div>
  );
}
