"use client";

import { useMemo, useState } from "react";
import { liveIndicators } from "@/lib/data/live-snapshot";
import { formatGBP, cn } from "@/lib/utils";

const LITRES_PER_UK_GALLON = 4.54609;
const petrol = liveIndicators.find((i) => i.id === "petrol-price")!;
const earnings = liveIndicators.find((i) => i.id === "earnings")!;
const minimumWage = liveIndicators.find((i) => i.id === "minimum-wage")!;

const COMMUTE_PRESETS = [
  { label: "Short commute", milesPerDay: 10 },
  { label: "Typical commute", milesPerDay: 20 },
  { label: "Long commute", milesPerDay: 40 },
];

const pencePerLitre = Number(petrol.value);
const weeklyEarnings = Number(earnings.value);
const hourlyMinimumWage = Number(minimumWage.value);

export function PumpToAnnualCost() {
  const [milesPerDay, setMilesPerDay] = useState(20);
  const [mpg, setMpg] = useState(40);
  const [daysPerWeek, setDaysPerWeek] = useState(5);

  const figures = useMemo(() => {
    const litresPerDay = (milesPerDay / mpg) * LITRES_PER_UK_GALLON;
    const dailyCost = (litresPerDay * pencePerLitre) / 100;
    const weeklyCost = dailyCost * daysPerWeek;
    const monthlyCost = (weeklyCost * 52) / 12;
    const annualCost = weeklyCost * 52;
    return { dailyCost, weeklyCost, monthlyCost, annualCost };
  }, [milesPerDay, mpg, daysPerWeek]);

  const percentOfWeeklyEarnings = (figures.weeklyCost / weeklyEarnings) * 100;
  const hoursOfMinimumWageWork = figures.weeklyCost / hourlyMinimumWage;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <p className="inline-flex items-center rounded-full bg-accent-why/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-why">
        Illustrative example — not a national average
      </p>
      <p className="mt-3 text-sm leading-relaxed text-charcoal-700">
        Choose a commute distance to see how a small daily number becomes a much larger annual one. This
        uses today&apos;s verified petrol price ({pencePerLitre}p/litre); the mileage and vehicle economy
        below are assumptions you can change, not published averages.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-navy-900">Daily commute (round trip)</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {COMMUTE_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setMilesPerDay(p.milesPerDay)}
                aria-pressed={milesPerDay === p.milesPerDay}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-bold transition-colors",
                  milesPerDay === p.milesPerDay ? "border-accent-why bg-accent-why text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
                )}
              >
                {p.label} ({p.milesPerDay}mi)
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="ptc-mpg" className="block text-sm font-semibold text-navy-900">
            Vehicle fuel economy
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-300 px-3.5 py-2.5">
            <input
              id="ptc-mpg"
              type="number"
              min={1}
              max={150}
              value={mpg}
              onChange={(e) => setMpg(Math.max(1, e.target.valueAsNumber || 1))}
              className="w-full border-0 p-0 text-base text-navy-900 focus:outline-none focus:ring-0"
            />
            <span className="text-sm text-charcoal-600">UK mpg</span>
          </div>
        </div>
        <div>
          <label htmlFor="ptc-days" className="block text-sm font-semibold text-navy-900">
            Driving days per week
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-300 px-3.5 py-2.5">
            <input
              id="ptc-days"
              type="number"
              min={1}
              max={7}
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(Math.min(7, Math.max(1, e.target.valueAsNumber || 1)))}
              className="w-full border-0 p-0 text-base text-navy-900 focus:outline-none focus:ring-0"
            />
            <span className="text-sm text-charcoal-600">days</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-charcoal-600">Per day</p>
          <p className="mt-1 text-xl font-extrabold tabular-nums text-navy-900">{formatGBP(figures.dailyCost)}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-charcoal-600">Per week</p>
          <p className="mt-1 text-xl font-extrabold tabular-nums text-navy-900">{formatGBP(figures.weeklyCost)}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-charcoal-600">Per month</p>
          <p className="mt-1 text-xl font-extrabold tabular-nums text-navy-900">{formatGBP(figures.monthlyCost)}</p>
        </div>
        <div className="rounded-xl bg-accent-why/10 p-4 text-center ring-1 ring-accent-why/30">
          <p className="text-[10px] font-bold uppercase tracking-wide text-accent-why">Per year</p>
          <p className="mt-1 text-xl font-extrabold tabular-nums text-navy-900">{formatGBP(figures.annualCost)}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-navy-900">In terms of pay</p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
          This weekly fuel cost is approximately <strong>{percentOfWeeklyEarnings.toFixed(1)}%</strong> of
          average weekly earnings (£{weeklyEarnings}/week, {earnings.dataPeriod}, {earnings.geography}), or
          the equivalent of <strong>{hoursOfMinimumWageWork.toFixed(1)} hours</strong> of work at the
          National Living Wage (£{hourlyMinimumWage}/hour).
        </p>
        <p className="mt-2 text-[11px] text-charcoal-600">
          Sources: {earnings.source}; {minimumWage.source}. Fuel figures calculated from today&apos;s
          verified petrol price ({petrol.dataPeriod}).
        </p>
      </div>
    </div>
  );
}
