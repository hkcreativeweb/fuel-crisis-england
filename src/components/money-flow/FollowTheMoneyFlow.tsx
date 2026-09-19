"use client";

import { useState } from "react";
import { calculateMoneyFlow, getAvailableMoneyFlowYears } from "@/lib/calculator/money-flow";
import { formatGBP, cn } from "@/lib/utils";
import { Alert } from "@/components/ui/Alert";

const AMOUNTS = [10, 20, 30, 50, 100];

const GROUP_COLORS: Record<string, string> = {
  Government: "#111827",
  "Oil & energy industry": "#d62828",
  Retail: "#ef4444",
};

export function FollowTheMoneyFlow({ defaultAmount = 50 }: { defaultAmount?: number }) {
  const years = getAvailableMoneyFlowYears();
  const [amount, setAmount] = useState(defaultAmount);
  const [year, setYear] = useState(years[years.length - 1] ?? "2026");

  const result = calculateMoneyFlow(year, amount);

  if (!result) {
    return (
      <Alert tone="info" title="Data for this year isn't verified yet.">
        Choose a different year, or check back once more historical figures are connected.
      </Alert>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {AMOUNTS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAmount(a)}
            aria-pressed={amount === a}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-bold transition-colors",
              amount === a ? "border-petrol-500 bg-petrol-500 text-white" : "border-white/20 text-slate-200 hover:border-petrol-400"
            )}
          >
            £{a}
          </button>
        ))}
      </div>

      {years.length > 1 ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Compare year:</span>
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYear(y)}
              aria-pressed={year === y}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-bold transition-colors",
                year === y ? "border-petrol-400 bg-white/10 text-white" : "border-white/15 text-slate-400 hover:text-white"
              )}
            >
              {y}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" /> Known — directly published rate
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" /> Estimated — calculated or averaged
        </span>
      </div>

      <div className="mt-4 space-y-3" role="list" aria-label="Where the money goes">
        {result.categories.map((c) => (
          <div key={c.key} role="listitem">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-white">
                {c.label} <span className="text-slate-400">&middot; {c.group}</span>{" "}
                <span
                  className={cn(
                    "ml-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide",
                    c.confidence === "known" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                  )}
                >
                  {c.confidence === "known" ? "Known" : "Estimated"}
                </span>
              </span>
              <span className="font-extrabold tabular-nums text-white">{formatGBP(c.amount)}</span>
            </div>
            <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-white/10">
              <div
                key={`${year}-${amount}-${c.key}`}
                className="money-flow-bar h-full rounded-full"
                style={{
                  "--fill-width": `${c.percent}%`,
                  backgroundColor: GROUP_COLORS[c.group],
                } as React.CSSProperties}
              />
            </div>
          </div>
        ))}
      </div>

      {result.detailLevel === "simple" ? (
        <p className="mt-4 text-xs text-slate-400">
          A full wholesale/refining/distribution/retailer-margin split isn&apos;t independently verified
          for {year} yet, so the non-tax portion is shown as one combined figure.
        </p>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-slate-400">
        Based on a petrol price of {result.totalPencePerLitre.toFixed(1)}p/litre in {year}. The exact
        split varies with the fuel price, wholesale costs, retailer margins, and VAT at any given time —
        this is not a fixed formula.
      </p>
    </div>
  );
}
