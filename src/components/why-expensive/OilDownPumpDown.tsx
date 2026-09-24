"use client";

import { useMemo, useState } from "react";
import { petrolPriceSeries, dieselPriceSeries, crudeOilSeries } from "@/lib/data/economic-series";
import { pumpPriceHistorySource } from "@/lib/data/pump-price-history";
import { brentCrudeHistorySource } from "@/lib/data/brent-crude-history";
import { LineChartSVG } from "@/components/charts/LineChartSVG";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Alert } from "@/components/ui/Alert";
import { cn } from "@/lib/utils";

type WindowOption = { id: string; label: string; fromMonth: string };

const WINDOWS: WindowOption[] = [
  { id: "full", label: "Full history (2003–2026)", fromMonth: "2003-01" },
  { id: "2020", label: "Since 2020", fromMonth: "2020-01" },
  { id: "2022", label: "2022 crisis & after", fromMonth: "2022-01" },
  { id: "12m", label: "Last 12 months", fromMonth: "2025-09" },
];

export function OilDownPumpDown() {
  const [fuel, setFuel] = useState<"petrol" | "diesel">("petrol");
  const [windowId, setWindowId] = useState("2022");

  const fuelSeries = fuel === "petrol" ? petrolPriceSeries : dieselPriceSeries;
  const activeWindow = WINDOWS.find((w) => w.id === windowId) ?? WINDOWS[0];

  const periods = useMemo(() => {
    const all = Array.from(new Set([...fuelSeries.points.map((p) => p.period), ...crudeOilSeries.points.map((p) => p.period)])).sort();
    return all.filter((p) => p >= activeWindow.fromMonth);
  }, [fuelSeries, activeWindow]);

  return (
    <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-navy-900">Crude oil vs UK pump prices, over time</h3>
        <StatusBadge status="historical" />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-charcoal-700">
        Two genuine primary sources, indexed so they can be compared on the same chart: UK pump prices from
        GOV.UK&apos;s official weekly series, and Brent crude oil spot prices from the U.S. Energy
        Information Administration (EIA). Each line is indexed to 100 at the start of the selected window —
        this shows relative change, not the actual price levels (which are in different currencies and
        units).
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-charcoal-600">Fuel:</span>
        {(["petrol", "diesel"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFuel(f)}
            aria-pressed={fuel === f}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-bold capitalize transition-colors",
              fuel === f ? "border-petrol-500 bg-petrol-500 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-charcoal-600">Window:</span>
        {WINDOWS.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => setWindowId(w.id)}
            aria-pressed={windowId === w.id}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors",
              windowId === w.id ? "border-navy-900 bg-navy-900 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
            )}
          >
            {w.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <LineChartSVG series={[fuelSeries, crudeOilSeries]} periods={periods} indexed />
      </div>

      <div className="mt-4 grid gap-3 text-xs text-charcoal-600 sm:grid-cols-2">
        <p>
          Pump prices:{" "}
          <a href={pumpPriceHistorySource.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
            {pumpPriceHistorySource.name}
          </a>
        </p>
        <p>
          Crude oil:{" "}
          <a href={brentCrudeHistorySource.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
            {brentCrudeHistorySource.name}
          </a>
        </p>
      </div>

      <Alert tone="warning" title="These prices are connected, but they are not identical and do not necessarily move at the same speed." className="mt-6">
        Fuel Duty is a fixed amount per litre and does not change with crude oil at all. VAT is charged on
        the whole price, including duty. Refining, distribution and retail margins can each move
        independently of the crude price. A chart showing two lines moving together does not, by itself,
        prove that one caused the other, or that they move at the same speed.
      </Alert>
    </div>
  );
}
