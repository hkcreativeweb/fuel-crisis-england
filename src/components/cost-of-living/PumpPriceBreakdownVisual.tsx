"use client";

import { useState } from "react";
import type { PumpPriceBreakdown, FuelType } from "@/lib/types";
import { petrolPumpPriceBreakdown, dieselPumpPriceBreakdown } from "@/lib/data/pump-price-breakdown";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";
import { Alert } from "@/components/ui/Alert";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const COLORS = ["#111827", "#d62828", "#ef4444", "#94a3b8"];

function Breakdown({ breakdown }: { breakdown: PumpPriceBreakdown }) {
  const verifiedComponents = breakdown.components.filter((c) => c.verified && c.approxPercent !== null);
  const hasData = verifiedComponents.length > 0;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-charcoal-600">
          {breakdown.fuel === "petrol" ? "Petrol (unleaded)" : "Diesel"}
        </p>
        <DataStatusBadge status={breakdown.verified ? "live" : "unavailable"} />
      </div>

      {hasData ? (
        <>
          <div className="mt-4 flex h-10 w-full overflow-hidden rounded-lg" role="img" aria-label={`Breakdown of ${breakdown.fuel} pump price`}>
            {verifiedComponents.map((c, i) => (
              <div
                key={c.label}
                style={{ width: `${c.approxPercent}%`, backgroundColor: COLORS[i % COLORS.length] }}
                title={`${c.label}: ${c.approxPercent}%`}
              />
            ))}
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {verifiedComponents.map((c, i) => (
              <li key={c.label} className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-charcoal-700">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  {c.label}
                </span>
                <span className="font-semibold tabular-nums text-navy-900">
                  {c.approxPencePerLitre !== null ? `${c.approxPencePerLitre.toFixed(1)}p` : ""} ({c.approxPercent}%)
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="mt-4">
          <Alert tone="info" title="Current figures will be added once verified against official sources.">
            We do not invent a breakdown. Component labels are shown below to explain what makes up the
            price, without guessed percentages.
          </Alert>
          <ul className="mt-4 space-y-2 text-sm text-charcoal-600">
            {breakdown.components.map((c) => (
              <li key={c.label}>{c.label} — not yet verified</li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 text-xs text-charcoal-600">
        {breakdown.asOf ? `As of ${formatDate(breakdown.asOf)}. ` : ""}
        Source: {breakdown.sourceUrl ? (
          <a href={breakdown.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
            {breakdown.source}
          </a>
        ) : (
          breakdown.source
        )}
      </p>
      <p className="mt-2 text-xs text-charcoal-600">Methodology: {breakdown.methodology}</p>
    </div>
  );
}

export function PumpPriceBreakdownVisual() {
  const [fuel, setFuel] = useState<FuelType>("petrol");
  const breakdown = fuel === "petrol" ? petrolPumpPriceBreakdown : dieselPumpPriceBreakdown;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1 text-sm font-semibold">
        {(["petrol", "diesel"] as FuelType[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFuel(f)}
            aria-pressed={fuel === f}
            className={cn("flex-1 rounded-full px-4 py-2 transition-colors", fuel === f ? "bg-white text-navy-900 shadow-sm" : "text-charcoal-600")}
          >
            {f === "petrol" ? "Petrol" : "Diesel"}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <Breakdown breakdown={breakdown} />
      </div>
    </div>
  );
}
