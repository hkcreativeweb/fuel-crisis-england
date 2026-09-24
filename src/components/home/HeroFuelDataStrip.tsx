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
  trendArrow,
  type WeeklyFigure,
} from "@/lib/data/hero-fuel-snapshot";
import { formatDateShort, cn } from "@/lib/utils";
import { CopyFigure } from "@/components/ui/CopyFigure";

function UkTrend({ figure }: { figure: WeeklyFigure }) {
  if (figure.previous === null) return <p className="mt-1.5 text-xs text-charcoal-500">vs previous week: n/a</p>;
  const direction = trendDirection(figure);
  const delta = Math.abs(figure.current - figure.previous);
  return (
    <p className="mt-1.5 text-xs font-semibold text-charcoal-600">
      {trendArrow(direction)} {direction === "up" ? "+" : direction === "down" ? "-" : ""}
      {delta.toFixed(1)}p vs previous week
    </p>
  );
}

function BenchmarkTrend({ figure }: { figure: WeeklyFigure }) {
  if (figure.previous === null) return <p className="mt-1.5 text-xs text-charcoal-500">vs previous week: n/a</p>;
  const direction = trendDirection(figure);
  const delta = Math.abs(figure.current - figure.previous);
  return (
    <p className="mt-1.5 text-xs font-semibold text-charcoal-600">
      {trendArrow(direction)} {direction === "up" ? "+" : direction === "down" ? "-" : ""}${delta.toFixed(2)} vs
      previous week
    </p>
  );
}

const columnLinkClasses =
  "group block transition-colors";
const columnLabelClasses =
  "text-xs font-bold uppercase tracking-[0.12em] text-charcoal-500 group-hover:text-petrol-600";
const columnValueClasses =
  "mt-1.5 text-3xl font-extrabold tabular-nums text-navy-900 transition-colors group-hover:text-petrol-600";

/** `ukWeekly` is fetched server-side from GOV.UK / DESNZ (see desnz-weekly-prices.ts). */
export function HeroFuelDataStrip({ ukWeekly }: { ukWeekly: Record<FuelType, WeeklyFigure> }) {
  const [benchmarkFuel, setBenchmarkFuel] = useState<FuelType>("petrol");
  const benchmarkFigure = internationalBenchmark[benchmarkFuel];
  const benchmarkMeta = internationalBenchmarkMeta[benchmarkFuel];

  return (
    <div className="mt-8 border-t border-slate-200 pt-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal-500">Latest fuel prices</p>
        <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-live">
          <span className="h-[6px] w-[6px] rounded-full bg-accent-live" aria-hidden="true" />
          Updated weekly
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 divide-x divide-slate-200 sm:grid-cols-3">
        <div className="pr-4 sm:pr-5">
          <Link href="/live-fuel-prices" className={columnLinkClasses}>
            <p className={columnLabelClasses}>UK petrol</p>
            <p className={columnValueClasses}>
              {ukWeekly.petrol.current.toFixed(1)}
              <span className="text-base font-bold text-charcoal-500">p/L</span>
            </p>
          </Link>
          <UkTrend figure={ukWeekly.petrol} />
          <p className="mt-3 text-xs text-charcoal-500">{formatDateShort(ukWeekly.petrol.lastUpdated)}</p>
          <a
            href={ukWeeklyAverageSource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-xs font-semibold text-charcoal-500 underline decoration-slate-300 underline-offset-2 hover:text-petrol-600 hover:decoration-petrol-400"
          >
            Source: GOV.UK / DESNZ
          </a>
          <div>
            <CopyFigure className="inline-flex min-h-11 items-center" text={`Average UK petrol price: ${ukWeekly.petrol.current.toFixed(1)}p/L`} />
          </div>
        </div>

        <div className="pl-4 sm:px-5">
          <Link href="/live-fuel-prices" className={columnLinkClasses}>
            <p className={columnLabelClasses}>UK diesel</p>
            <p className={columnValueClasses}>
              {ukWeekly.diesel.current.toFixed(1)}
              <span className="text-base font-bold text-charcoal-500">p/L</span>
            </p>
          </Link>
          <UkTrend figure={ukWeekly.diesel} />
          <p className="mt-3 text-xs text-charcoal-500">{formatDateShort(ukWeekly.diesel.lastUpdated)}</p>
          <a
            href={ukWeeklyAverageSource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-xs font-semibold text-charcoal-500 underline decoration-slate-300 underline-offset-2 hover:text-petrol-600 hover:decoration-petrol-400"
          >
            Source: GOV.UK / DESNZ
          </a>
        </div>

        <div className="hidden sm:block sm:pl-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-charcoal-500">International benchmark</p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
              <button
                type="button"
                onClick={() => setBenchmarkFuel("petrol")}
                aria-pressed={benchmarkFuel === "petrol"}
                className={cn(
                  "min-h-11 border-b px-1 transition-colors",
                  benchmarkFuel === "petrol" ? "border-petrol-500 text-navy-900" : "border-transparent text-charcoal-400 hover:text-navy-900"
                )}
              >
                Petrol
              </button>
              <button
                type="button"
                onClick={() => setBenchmarkFuel("diesel")}
                aria-pressed={benchmarkFuel === "diesel"}
                className={cn(
                  "min-h-11 border-b px-1 transition-colors",
                  benchmarkFuel === "diesel" ? "border-petrol-500 text-navy-900" : "border-transparent text-charcoal-400 hover:text-navy-900"
                )}
              >
                Diesel
              </button>
            </div>
          </div>
          <Link href="/why-is-fuel-expensive#exchange-rate" className={cn(columnLinkClasses, "mt-1.5")}>
            <p className={cn(columnLabelClasses, "normal-case tracking-normal")}>{benchmarkMeta.label}</p>
            <p className={columnValueClasses}>
              ${benchmarkFigure.current.toFixed(2)}
              <span className="text-base font-bold text-charcoal-500">/gal</span>
            </p>
          </Link>
          <BenchmarkTrend figure={benchmarkFigure} />
          <p className="mt-3 text-xs text-charcoal-500">{formatDateShort(benchmarkFigure.lastUpdated)}</p>
          <a
            href={internationalBenchmarkSource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-xs font-semibold text-charcoal-500 underline decoration-slate-300 underline-offset-2 hover:text-petrol-600 hover:decoration-petrol-400"
          >
            Source: US EIA
          </a>
        </div>
      </div>

      <p className="mt-5 hidden max-w-lg text-xs leading-relaxed text-charcoal-500 sm:block">
        UK and US figures are both retail pump prices, but in different currencies, units and tax regimes —
        not a direct comparison.
      </p>

      <Link
        href="/why-is-fuel-expensive"
        className="group mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-petrol-600"
      >
        Why is the pump price so different from the oil price?
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}
