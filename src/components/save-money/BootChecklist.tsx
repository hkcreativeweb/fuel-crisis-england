"use client";

import { useState } from "react";

const items = [
  "Golf clubs or sports equipment not needed today",
  "Tools or equipment not needed for today's jobs",
  "Bags of old clothes or donations",
  "Bottled water crates or drinks",
  "Camping or outdoor gear",
  "Spare tyre you don't actually need to carry (check your vehicle's requirements first)",
  "Anything else that's been sitting in there for weeks",
];

export function BootChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  function toggle(item: string) {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h3 className="text-base font-bold text-navy-900">What&apos;s in your boot?</h3>
      <p className="mt-2 text-sm text-charcoal-700">
        Tick anything you&apos;re currently carrying around that you don&apos;t actually need today.
      </p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item}>
            <label className="flex items-start gap-3 text-sm text-charcoal-700">
              <input
                type="checkbox"
                checked={!!checked[item]}
                onChange={() => toggle(item)}
                className="mt-0.5 h-4 w-4 rounded border-slate-400 text-petrol-500 focus:ring-petrol-400"
              />
              <span className={checked[item] ? "text-charcoal-400 line-through" : ""}>{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
