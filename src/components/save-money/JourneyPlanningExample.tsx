"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const errands = ["Supermarket", "Pharmacy", "Post office", "School pickup", "Petrol station"];

export function JourneyPlanningExample() {
  const [combined, setCombined] = useState(true);

  return (
    <div className="rounded border border-slate-200 bg-slate-50 p-6">
      <h3 className="text-base font-bold text-navy-900">A simple example</h3>
      <p className="mt-2 text-sm text-charcoal-700">
        Say you need to visit these five places this week. Compare making five separate round trips from
        home against one combined trip visiting them in sequence.
      </p>

      <div className="mt-4 flex rounded-full border border-slate-200 bg-white p-1 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setCombined(false)}
          aria-pressed={!combined}
          className={cn("flex-1 rounded-full px-4 py-2 transition-colors", !combined ? "bg-slate-900 text-white" : "text-charcoal-600")}
        >
          5 separate trips
        </button>
        <button
          type="button"
          onClick={() => setCombined(true)}
          aria-pressed={combined}
          className={cn("flex-1 rounded-full px-4 py-2 transition-colors", combined ? "bg-petrol-500 text-white" : "text-charcoal-600")}
        >
          1 combined trip
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {errands.map((e, i) => (
          <div key={e} className="flex items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy-900 ring-1 ring-slate-200">{e}</span>
            {i < errands.length - 1 ? <span aria-hidden="true" className="text-charcoal-400">&rarr;</span> : null}
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-charcoal-700">
        {combined
          ? "One combined trip means the engine only needs to warm up once, and you avoid the return-and-restart of five separate round trips from home."
          : "Five separate round trips from home mean starting from a cold engine five times, and covering the 'return home' leg of the journey five times over."}
      </p>
      <p className="mt-2 text-xs text-charcoal-600">
        The actual saving depends entirely on your real distances and route — this is an illustration of
        the principle, not a calculation of a specific saving.
      </p>
    </div>
  );
}
