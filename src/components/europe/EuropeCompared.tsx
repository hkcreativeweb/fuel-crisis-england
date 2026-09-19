"use client";

import { useMemo, useState } from "react";
import type { FuelType } from "@/lib/types";
import { europeFuelPrices, europeFuelPriceSource, ukFuelPriceSourceNote, eu27AveragePetrolEUR, eu27AverageDieselEUR } from "@/lib/data/europe-fuel-prices";
import { cn } from "@/lib/utils";

const uk = europeFuelPrices.find((c) => c.isUK)!;

function breakdownFor(fuel: FuelType, countryCode: string) {
  const c = europeFuelPrices.find((x) => x.code === countryCode)!;
  return fuel === "petrol" ? c.petrol : c.diesel;
}

export function EuropeCompared() {
  const [fuel, setFuel] = useState<FuelType>("petrol");
  const [sortAsc, setSortAsc] = useState(true);
  const [spotlightCode, setSpotlightCode] = useState("DE");

  const ranked = useMemo(() => {
    const rows = europeFuelPrices.map((c) => ({ ...c, b: fuel === "petrol" ? c.petrol : c.diesel }));
    rows.sort((a, b) => (sortAsc ? a.b.totalEUR - b.b.totalEUR : b.b.totalEUR - a.b.totalEUR));
    return rows;
  }, [fuel, sortAsc]);

  const ukB = fuel === "petrol" ? uk.petrol : uk.diesel;
  const spotlight = breakdownFor(fuel, spotlightCode);
  const spotlightCountry = europeFuelPrices.find((c) => c.code === spotlightCode)!;
  const diff50L = (spotlight.totalEUR - ukB.totalEUR) * 50;
  const euAvg = fuel === "petrol" ? eu27AveragePetrolEUR : eu27AverageDieselEUR;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-1 text-sm font-semibold">
          {(["petrol", "diesel"] as FuelType[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFuel(f)}
              aria-pressed={fuel === f}
              className={cn(
                "border-b-2 px-3 py-1.5 capitalize transition-colors",
                fuel === f ? "border-petrol-500 text-navy-900" : "border-transparent text-charcoal-500 hover:text-navy-900"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="text-xs text-charcoal-500">
          EU-27 average: <span className="font-bold tabular-nums text-navy-900">€{euAvg.toFixed(3)}/L</span> · UK:{" "}
          <span className="font-bold tabular-nums text-navy-900">€{ukB.totalEUR.toFixed(3)}/L</span>
        </p>
      </div>

      {/* Spotlight comparison: large numbers, no card chrome */}
      <div id="price-breakdown" className="scroll-mt-24 mt-10 grid gap-10 border-b border-slate-200 pb-10 lg:grid-cols-2">
        <div>
          <label htmlFor="spotlight-country" className="block text-xs font-bold uppercase tracking-[0.1em] text-charcoal-500">
            Compare the UK against
          </label>
          <select
            id="spotlight-country"
            value={spotlightCode}
            onChange={(e) => setSpotlightCode(e.target.value)}
            className="mt-2 w-full max-w-xs border border-slate-300 bg-white px-3 py-2 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
          >
            {europeFuelPrices
              .filter((c) => !c.isUK)
              .map((c) => (
                <option key={c.code} value={c.code}>
                  {c.country}
                </option>
              ))}
          </select>

          <div className="mt-6 grid grid-cols-2 gap-x-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-charcoal-500">United Kingdom</p>
              <p className="mt-1 text-4xl font-extrabold tabular-nums text-navy-900">
                €{ukB.totalEUR.toFixed(2)}
                <span className="text-base font-semibold text-charcoal-500">/L</span>
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-charcoal-500">{spotlightCountry.country}</p>
              <p className="mt-1 text-4xl font-extrabold tabular-nums text-petrol-600">
                €{spotlight.totalEUR.toFixed(2)}
                <span className="text-base font-semibold text-charcoal-500">/L</span>
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-charcoal-700">
            For a 50-litre fill-up, that&apos;s a difference of{" "}
            <strong className="tabular-nums">€{Math.abs(diff50L).toFixed(2)}</strong>.{" "}
            {spotlightCountry.country} is {diff50L >= 0 ? "more expensive" : "cheaper"} than the UK for {fuel} at
            today&apos;s prices.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-charcoal-500">How the price is built: {spotlightCountry.country}</p>
          <div className="mt-4 space-y-3">
            {[
              { label: "Before tax", value: spotlight.beforeTaxEUR, known: true },
              { label: spotlightCountry.dutyIsExact ? "Fuel duty" : "Duty & other taxes", value: spotlight.dutyOtherEUR, known: spotlightCountry.dutyIsExact },
              { label: `VAT (${spotlight.vatPercent}%)`, value: spotlight.vatEUR, known: true },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-charcoal-700">
                    {row.label}
                    {!row.known ? <span className="ml-1.5 text-[10px] font-bold uppercase tracking-wide text-amber-600">Est.</span> : null}
                  </span>
                  <span className="font-bold tabular-nums text-navy-900">€{row.value.toFixed(3)}</span>
                </div>
                <div className="mt-1 h-[3px] w-full bg-slate-100">
                  <div className="h-full bg-navy-900" style={{ width: `${(row.value / spotlight.totalEUR) * 100}%` }} />
                </div>
              </div>
            ))}
            <div className="flex items-baseline justify-between border-t border-slate-300 pt-2 text-sm font-bold">
              <span className="text-navy-900">Total pump price</span>
              <span className="tabular-nums text-navy-900">€{spotlight.totalEUR.toFixed(3)}</span>
            </div>
          </div>
          {!spotlightCountry.dutyIsExact ? (
            <p className="mt-3 text-xs text-charcoal-500">
              &ldquo;Duty &amp; other taxes&rdquo; is a calculated remainder (total minus before-tax price minus
              VAT), not a figure the Oil Bulletin states directly. It may include minor indirect taxes beyond
              fuel duty.
            </p>
          ) : null}
        </div>
      </div>

      {/* Full ranking table */}
      <div id="fifty-litre-comparison" className="scroll-mt-24 mt-10">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-charcoal-500">All 27 EU member states, plus the UK</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-left text-xs font-bold uppercase tracking-wide text-charcoal-500">
                <th scope="col" className="py-2 pr-4 font-bold">
                  <button type="button" onClick={() => setSortAsc((v) => !v)} className="inline-flex items-center gap-1 hover:text-navy-900">
                    Country {sortAsc ? "↑" : "↓"}
                  </button>
                </th>
                <th scope="col" className="py-2 pr-4 text-right font-bold">Before tax</th>
                <th scope="col" className="py-2 pr-4 text-right font-bold">Tax (duty + VAT)</th>
                <th scope="col" className="py-2 pr-4 text-right font-bold">Total</th>
                <th scope="col" className="py-2 text-right font-bold">50L cost</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((row) => {
                const isUK = row.isUK;
                const tax = row.b.dutyOtherEUR + row.b.vatEUR;
                return (
                  <tr key={row.code} className={cn("border-b border-slate-100", isUK && "bg-petrol-50")}>
                    <td className="py-2 pr-4 font-semibold text-navy-900">
                      {row.country}
                      {isUK ? <span className="ml-1.5 text-[10px] font-bold uppercase tracking-wide text-petrol-600">This site</span> : null}
                    </td>
                    <td className="py-2 pr-4 text-right tabular-nums text-charcoal-700">€{row.b.beforeTaxEUR.toFixed(3)}</td>
                    <td className="py-2 pr-4 text-right tabular-nums text-charcoal-700">€{tax.toFixed(3)}</td>
                    <td className="py-2 pr-4 text-right tabular-nums font-bold text-navy-900">€{row.b.totalEUR.toFixed(3)}</td>
                    <td className="py-2 text-right tabular-nums text-charcoal-700">€{(row.b.totalEUR * 50).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-charcoal-500">Source</p>
        <p className="mt-1.5 text-sm text-charcoal-700">
          <a href={europeFuelPriceSource.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
            {europeFuelPriceSource.name}
          </a>
          , data for the week of 14 September 2026, published 16 September 2026. UK figures use the same
          GOV.UK/DESNZ data as the rest of this site, converted to EUR using the {ukFuelPriceSourceNote.fxSource}.
          EUR figures are for comparison only. They are not what UK motorists pay.
        </p>
      </div>
    </div>
  );
}
