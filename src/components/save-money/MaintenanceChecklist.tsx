"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const checklistItems = [
  "Check tyre pressures",
  "Check service schedule",
  "Check engine oil",
  "Check air filter/service condition",
  "Check warning lights",
  "Check brakes",
  "Check wheel alignment if appropriate",
  "Remove unnecessary weight",
  "Remove unused roof equipment",
  "Plan journeys",
  "Avoid unnecessary idling",
  "Drive smoothly",
  "Compare fuel prices",
  "Consider appropriate fuel-system maintenance",
];

export function MaintenanceChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const allDone = checklistItems.every((item) => checked[item]);
  const doneCount = checklistItems.filter((item) => checked[item]).length;

  function toggle(item: string) {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  }

  return (
    <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-navy-900">
          {doneCount} of {checklistItems.length} checked
        </p>
        <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-accent-save transition-all" style={{ width: `${(doneCount / checklistItems.length) * 100}%` }} />
        </div>
      </div>

      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {checklistItems.map((item) => (
          <li key={item}>
            <label
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-md border px-4 py-3 text-sm font-medium transition-colors",
                checked[item] ? "border-accent-save bg-accent-save/5 text-charcoal-500 line-through" : "border-slate-200 text-charcoal-700 hover:bg-slate-50"
              )}
            >
              <input
                type="checkbox"
                checked={!!checked[item]}
                onChange={() => toggle(item)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-400 text-accent-save focus:ring-accent-save"
              />
              {item}
            </label>
          </li>
        ))}
      </ul>

      {allDone ? (
        <div className="mt-6 rounded bg-accent-save/10 p-5 text-center ring-1 ring-accent-save/30">
          <p className="text-lg font-extrabold uppercase tracking-wide text-accent-save">Your car is ready for more efficient driving</p>
          <p className="mt-1.5 text-xs text-charcoal-600">
            This checklist doesn&apos;t guarantee a specific fuel saving — it&apos;s a reminder of the
            things that are genuinely worth checking.
          </p>
        </div>
      ) : (
        <p className="mt-6 text-xs text-charcoal-600">
          This checklist doesn&apos;t guarantee a specific fuel saving — it&apos;s a reminder of the things
          that are genuinely worth checking.
        </p>
      )}
    </div>
  );
}
