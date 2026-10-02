"use client";

import { useState } from "react";
import Link from "next/link";
import type { FuelType } from "@/lib/types";
import {
  ukWeeklyAverageSource,
  internationalBenchmark,
  internationalBenchmarkMeta,
  internationalBenchmarkSource,
  trendDirection,
  type WeeklyFigure,
} from "@/lib/data/hero-fuel-snapshot";
import { formatDate, cn } from "@/lib/utils";
import { CopyFigure } from "@/components/ui/CopyFigure";

/** Weekly movement in words as well as an arrow, so it never relies on the symbol alone. */
function Trend({ figure, unit }: { figure: WeeklyFigure; unit: "p" | "$" }) {
  if (figure.previous === null) return <p className="mt-1.5 text-sm text-charcoal-500">vs previous week: not available</p>;
  const direction = trendDirection(figure);
  const delta = Math.abs(figure.current - figure.previous);
  const amount = unit === "p" ? `${delta.toFixed(1)}p` : `$${delta.toFixed(2)}`;
  if (direction === "unchanged") return <p className="mt-1.5 text-sm text-charcoal-600">No change vs previous week</p>;
  const up = direction === "up";
  return (
    <p className="mt-1.5 text-sm font-semibold text-charcoal-700">
      <span aria-hidden="true">
        {up ? "↑ +" : "↓ −"}
        {amount} vs previous week
      </span>
      <span className="sr-only">
        {up ? "Increased by " : "Decreased by "}
        {amount} compared with the previous week
      </span>
    </p>
  );
}

const sourceLink =
  "inline-flex min-h-11 items-center text-xs font-semibold text-charcoal-600 underline decoration-slate-300 underline-offset-2 hover:text-petrol-600 hover:decoration-petrol-400";

/** Petrol and diesel: the most prominent figures on the homepage. `ukWeekly` is fetched server-side (see desnz-weekly-prices.ts). */
export function UkPriceCards({ ukWeekly }: { ukWeekly: Record<FuelType, WeeklyFigure> }) {
  const cards: { fuel: FuelType; label: string }[] = [
    { fuel: "petrol", label: "Petrol" },
    { fuel: "diesel", label: "Diesel" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map(({ fuel, label }) => {
        const figure = ukWeekly[fuel];
        return (
          <article key={fuel} aria-label={`UK ${fuel} average price`} className="rounded border-2 border-navy-900 bg-white p-5 sm:p-6">
            <Link href="/live-fuel-prices" className="group block">
              <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-charcoal-600 group-hover:text-petrol-600">{label}</h3>
              <p className="mt-1.5 text-5xl font-extrabold tabular-nums text-navy-900 transition-colors group-hover:text-petrol-600">
                {figure.current.toFixed(1)}
                <span className="ml-1 text-lg font-bold text-charcoal-500">p/L</span>
              </p>
            </Link>
            <Trend figure={figure} unit="p" />
            <p className="mt-1 text-sm text-charcoal-600">{formatDate(figure.lastUpdated)}</p>
            <div className="flex flex-wrap items-center gap-x-4">
              <a href={ukWeeklyAverageSource.url} target="_blank" rel="noopener noreferrer" className={sourceLink}>
                Source: GOV.UK / DESNZ
              </a>
              <CopyFigure
                path="/live-fuel-prices#this-week"
                text={`${figure.current.toFixed(1)}p/L: average UK ${fuel} price, ${figure.dataPeriod.replace(/^Week commencing/, "week of")}. Source: GOV.UK / DESNZ`}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** US EIA retail benchmark: deliberately smaller and visually secondary to the UK prices. */
export function InternationalContext() {
  const [fuel, setFuel] = useState<FuelType>("petrol");
  const figure = internationalBenchmark[fuel];
  const meta = internationalBenchmarkMeta[fuel];

  return (
    <aside aria-label="International context" className="mt-8 rounded border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-charcoal-600">International context</h3>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
          {(["petrol", "diesel"] as FuelType[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFuel(f)}
              aria-pressed={fuel === f}
              className={cn(
                "min-h-11 border-b px-1 transition-colors",
                fuel === f ? "border-petrol-500 text-navy-900" : "border-transparent text-charcoal-500 hover:text-navy-900"
              )}
            >
              {f === "petrol" ? "Petrol" : "Diesel"}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-2 text-sm text-charcoal-700">{meta.label}</p>
      <p className="mt-1 text-2xl font-extrabold tabular-nums text-navy-900">
        ${figure.current.toFixed(2)}
        <span className="ml-1 text-sm font-bold text-charcoal-500">/gal</span>
      </p>
      <Trend figure={figure} unit="$" />
      <p className="mt-1 text-sm text-charcoal-600">{formatDate(figure.lastUpdated)}</p>
      <a href={internationalBenchmarkSource.url} target="_blank" rel="noopener noreferrer" className={sourceLink}>
        Source: US EIA
      </a>
      <p className="mt-2 max-w-xl text-xs leading-relaxed text-charcoal-600">
        UK and US figures are both retail pump prices, but use different currencies, units and tax regimes, so they are not a direct comparison.
      </p>
      <Link href="/why-is-fuel-expensive" className="group mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-petrol-600">
        Why is the pump price so different from the oil price?
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </aside>
  );
}
