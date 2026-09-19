"use client";

import { useState } from "react";
import type { FuelSavingTip } from "@/lib/data/fuel-saving-tips";
import { cn } from "@/lib/utils";

export function FuelSavingTipCard({ tip }: { tip: FuelSavingTip }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <div>
          <h3 className="text-base font-bold text-navy-900">{tip.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-charcoal-700">{tip.whatToDo}</p>
        </div>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={cn("mt-1 h-5 w-5 shrink-0 text-petrol-500 transition-transform", open && "rotate-180")}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 7.5l5 5 5-5" />
        </svg>
      </button>

      {open ? (
        <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-sm">
          <div>
            <p className="font-semibold text-charcoal-600">Why it works</p>
            <p className="mt-0.5 text-charcoal-700">{tip.whyItWorks}</p>
          </div>
          <div>
            <p className="font-semibold text-charcoal-600">How much it may help</p>
            <p className="mt-0.5 text-charcoal-700">{tip.howMuchItMayHelp}</p>
          </div>
          <div>
            <p className="font-semibold text-charcoal-600">Assumptions</p>
            <p className="mt-0.5 text-charcoal-700">{tip.assumptions}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
