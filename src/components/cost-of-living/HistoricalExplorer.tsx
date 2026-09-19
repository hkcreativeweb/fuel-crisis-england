"use client";

import { useMemo, useState } from "react";
import { yearlySnapshots, availableYears } from "@/lib/data/yearly-snapshots";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";
import { cn } from "@/lib/utils";

const LITRES_PER_UK_GALLON = 4.54609;
const DEFAULT_MPG = 40;

function InfoNote({ text }: { text: string }) {
  return (
    <details className="group mt-1">
      <summary className="inline-block cursor-pointer list-none text-[11px] font-semibold text-charcoal-400 underline decoration-dotted underline-offset-2 hover:text-petrol-600">
        Why?
      </summary>
      <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-charcoal-600">{text}</p>
    </details>
  );
}

function DataCell({
  label,
  value,
  prefix,
  unit,
  meta,
  note,
  unavailableText = "DATA NOT AVAILABLE",
}: {
  label: string;
  value: string | null;
  prefix?: string;
  unit?: string;
  meta?: string | null;
  note?: string | null;
  unavailableText?: string;
}) {
  return (
    <div className="py-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-charcoal-500">{label}</p>
      {value !== null ? (
        <>
          <p className="mt-1.5 text-2xl font-extrabold tabular-nums text-navy-900">
            {prefix}
            {value}
            {unit ? <span className="ml-1 text-xs font-semibold text-charcoal-500">{unit}</span> : null}
          </p>
          {meta ? <p className="mt-1 text-xs leading-snug text-charcoal-500">{meta}</p> : null}
        </>
      ) : (
        <p className="mt-1.5 text-sm font-bold uppercase tracking-wide text-amber-800">{unavailableText}</p>
      )}
      {note ? <InfoNote text={note} /> : null}
    </div>
  );
}

export function HistoricalExplorer() {
  const [index, setIndex] = useState(availableYears.length - 1);
  const [mpg, setMpg] = useState(DEFAULT_MPG);
  const year = availableYears[index];
  const s = yearlySnapshots[year];

  const oneHourLitres = useMemo(() => {
    if (!s.minimumWageVerified || s.minimumWagePerHour === null || s.petrolPencePerLitre === null) return null;
    return (s.minimumWagePerHour * 100) / s.petrolPencePerLitre;
  }, [s]);

  const tenLitreCost = s.petrolPencePerLitre !== null ? (s.petrolPencePerLitre * 10) / 100 : null;
  const fiftyLitreCost = s.petrolPencePerLitre !== null ? (s.petrolPencePerLitre * 50) / 100 : null;

  const journey = useMemo(() => {
    if (s.petrolPencePerLitre === null || mpg <= 0) return null;
    const litresNeeded = (100 / mpg) * LITRES_PER_UK_GALLON;
    const cost = (litresNeeded * s.petrolPencePerLitre) / 100;
    return { litresNeeded, cost };
  }, [s, mpg]);

  return (
    <div className="border border-slate-200 bg-white p-6 sm:p-8">
      {/* Year selector */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-4xl font-extrabold tabular-nums text-navy-900">{year}</p>
        <DataStatusBadge status={s.verified ? "historical" : "unavailable"} />
      </div>

      <input
        type="range"
        min={0}
        max={availableYears.length - 1}
        step={1}
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
        aria-label="Select year"
        className="mt-6 h-2 w-full accent-petrol-500"
      />
      <div className="mt-2 flex flex-wrap justify-between gap-1 text-xs font-semibold text-charcoal-600">
        {availableYears.map((y, i) => (
          <button
            key={y}
            type="button"
            onClick={() => setIndex(i)}
            className={cn("px-1 transition-colors", y === year ? "text-petrol-600" : "hover:text-navy-900")}
          >
            {y}
          </button>
        ))}
      </div>

      {/* FUEL */}
      <div className="mt-8 border-t border-slate-200 pt-1">
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-accent-then">Fuel</p>
        <div className="grid gap-x-6 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          <DataCell label="Petrol" value={s.petrolPencePerLitre !== null ? s.petrolPencePerLitre.toFixed(2) : null} unit="p/litre" meta={s.pricesAsOf} />
          <DataCell label="Diesel" value={s.dieselPencePerLitre !== null ? s.dieselPencePerLitre.toFixed(2) : null} unit="p/litre" meta={s.pricesAsOf} />
          <DataCell label="Fuel Duty" value={s.fuelDutyPencePerLitre !== null ? s.fuelDutyPencePerLitre.toFixed(2) : null} unit="p/litre" meta={s.pricesAsOf} />
          <DataCell label="VAT" value={s.vatRatePercent !== null ? String(s.vatRatePercent) : null} unit="%" meta={s.pricesAsOf} />
        </div>
      </div>

      {/* PAY */}
      <div className="mt-2 border-t border-slate-200 pt-1">
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-accent-money">Pay</p>
        <div className="grid gap-x-6 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-y-0">
          <DataCell
            label="Minimum / Living Wage"
            value={s.minimumWageVerified && s.minimumWagePerHour !== null ? s.minimumWagePerHour.toFixed(2) : null}
            prefix="£"
            unit={s.minimumWageVerified ? "/hour" : undefined}
            meta={s.minimumWageVerified ? `${s.minimumWageLabel} — ${s.minimumWagePeriod}` : null}
            note={s.minimumWageNote}
            unavailableText={s.minimumWageLabel === "No statutory National Minimum Wage" ? "No statutory National Minimum Wage" : "DATA NOT AVAILABLE"}
          />
          <DataCell
            label="Average earnings"
            value={s.averageWeeklyEarnings !== null ? s.averageWeeklyEarnings.toFixed(0) : null}
            prefix="£"
            unit="/week"
            meta={s.averageWeeklyEarningsPeriod}
          />
        </div>
      </div>

      {/* COST OF LIVING */}
      <div className="mt-2 border-t border-slate-200 pt-1">
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-accent-cost">Cost of living</p>
        <div className="grid gap-x-6 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-y-0">
          <DataCell label="CPI index" value={s.cpiIndex !== null ? s.cpiIndex.toFixed(1) : null} meta={s.cpiPeriod} />
          <DataCell
            label="Real household disposable income"
            value={s.realHouseholdDisposableIncomePerHead !== null ? s.realHouseholdDisposableIncomePerHead.toLocaleString("en-GB") : null}
            prefix="£"
            unit="/head/year"
            meta={s.realHouseholdDisposableIncomePeriod}
          />
        </div>
      </div>

      {/* AFFORDABILITY */}
      <div className="mt-8 bg-slate-50 p-5 sm:p-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal-500">What could your pay buy?</p>
        <div className="mt-4 grid gap-x-6 gap-y-5 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-charcoal-500">1 hour of minimum-wage work</p>
            {oneHourLitres !== null ? (
              <p className="mt-1.5 text-2xl font-extrabold tabular-nums text-navy-900">
                {oneHourLitres.toFixed(1)}
                <span className="ml-1 text-xs font-semibold text-charcoal-500">litres of petrol</span>
              </p>
            ) : (
              <p className="mt-1.5 text-sm font-bold uppercase tracking-wide text-amber-800">DATA NOT AVAILABLE</p>
            )}
          </div>
          <div className="pt-5 sm:pt-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-charcoal-500">10 litres of petrol</p>
            {tenLitreCost !== null ? (
              <p className="mt-1.5 text-2xl font-extrabold tabular-nums text-navy-900">£{tenLitreCost.toFixed(2)}</p>
            ) : (
              <p className="mt-1.5 text-sm font-bold uppercase tracking-wide text-amber-800">DATA NOT AVAILABLE</p>
            )}
          </div>
          <div className="pt-5 sm:pt-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-charcoal-500">50 litres of petrol</p>
            {fiftyLitreCost !== null ? (
              <p className="mt-1.5 text-2xl font-extrabold tabular-nums text-navy-900">£{fiftyLitreCost.toFixed(2)}</p>
            ) : (
              <p className="mt-1.5 text-sm font-bold uppercase tracking-wide text-amber-800">DATA NOT AVAILABLE</p>
            )}
          </div>
          <div className="pt-5 sm:pt-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-charcoal-500">100-mile journey</p>
            </div>
            {journey !== null ? (
              <p className="mt-1.5 text-2xl font-extrabold tabular-nums text-navy-900">£{journey.cost.toFixed(2)}</p>
            ) : (
              <p className="mt-1.5 text-sm font-bold uppercase tracking-wide text-amber-800">DATA NOT AVAILABLE</p>
            )}
            <label className="mt-1.5 flex items-center gap-1.5 text-xs text-charcoal-600">
              Based on
              <input
                type="number"
                min={10}
                max={100}
                value={mpg}
                onChange={(e) => setMpg(Number(e.target.value) || DEFAULT_MPG)}
                className="w-14 border border-slate-300 px-1.5 py-0.5 text-center text-xs font-semibold text-navy-900 focus:border-petrol-500 focus:outline-none"
                aria-label="Fuel consumption assumption in miles per gallon"
              />
              mpg{journey !== null ? ` (${journey.litresNeeded.toFixed(1)}L)` : ""}
            </label>
          </div>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-charcoal-500">
          These calculations compare gross hourly pay with fuel prices. They do not represent disposable
          income or a complete measure of living standards. The 100-mile figure is not a claim that every
          vehicle gets {mpg}mpg — it is an editable assumption you can change above.
        </p>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-charcoal-600">
        Source: {s.source}
        {s.sourceUrl ? (
          <>
            {" — "}
            <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
              view source
            </a>
          </>
        ) : null}
      </p>
    </div>
  );
}
