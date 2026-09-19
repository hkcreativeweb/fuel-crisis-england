"use client";

import { useMemo, useState } from "react";
import { yearlySnapshots, availableYears, currentYear } from "@/lib/data/yearly-snapshots";
import { liveIndicators } from "@/lib/data/live-snapshot";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Alert } from "@/components/ui/Alert";
import { cn } from "@/lib/utils";

const historicalYears = availableYears.filter((y) => y !== currentYear);
const latestCompleteYear = [...availableYears].filter((y) => y !== currentYear && yearlySnapshots[y].cpiIndex !== null).pop() ?? null;

function findLive(id: string) {
  return liveIndicators.find((i) => i.id === id);
}

function pctChange(then: number | null, now: number | null): number | null {
  if (then === null || now === null || then === 0) return null;
  return ((now - then) / then) * 100;
}

function formatPct(v: number | null): string {
  if (v === null) return "n/a";
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(1)}%`;
}

type Row = {
  label: string;
  thenValue: number | null;
  thenDisplay: string | null;
  thenNote: string;
  nowValue: number | null;
  nowDisplay: string | null;
  nowNote: string;
  change: number | null;
};

const DEFAULT_HISTORICAL_YEAR = "2010";

export function ThenVsNow() {
  const [thenYear, setThenYear] = useState(
    historicalYears.includes(DEFAULT_HISTORICAL_YEAR) ? DEFAULT_HISTORICAL_YEAR : historicalYears[0]
  );
  const then = yearlySnapshots[thenYear];
  const now = yearlySnapshots[currentYear];
  const nowEarnings = findLive("earnings");

  const rows: Row[] = useMemo(() => {
    const r: Row[] = [
      {
        label: "Petrol",
        thenValue: then.petrolPencePerLitre,
        thenDisplay: then.petrolPencePerLitre !== null ? `${then.petrolPencePerLitre.toFixed(1)}p` : null,
        thenNote: then.pricesAsOf ?? "Not available",
        nowValue: now.petrolPencePerLitre,
        nowDisplay: now.petrolPencePerLitre !== null ? `${now.petrolPencePerLitre.toFixed(1)}p` : null,
        nowNote: now.pricesAsOf ?? "",
        change: pctChange(then.petrolPencePerLitre, now.petrolPencePerLitre),
      },
      {
        label: "Diesel",
        thenValue: then.dieselPencePerLitre,
        thenDisplay: then.dieselPencePerLitre !== null ? `${then.dieselPencePerLitre.toFixed(1)}p` : null,
        thenNote: then.pricesAsOf ?? "Not available",
        nowValue: now.dieselPencePerLitre,
        nowDisplay: now.dieselPencePerLitre !== null ? `${now.dieselPencePerLitre.toFixed(1)}p` : null,
        nowNote: now.pricesAsOf ?? "",
        change: pctChange(then.dieselPencePerLitre, now.dieselPencePerLitre),
      },
      {
        label: "Fuel Duty",
        thenValue: then.fuelDutyPencePerLitre,
        thenDisplay: then.fuelDutyPencePerLitre !== null ? `${then.fuelDutyPencePerLitre.toFixed(2)}p` : null,
        thenNote: then.pricesAsOf ?? "Not available",
        nowValue: now.fuelDutyPencePerLitre,
        nowDisplay: now.fuelDutyPencePerLitre !== null ? `${now.fuelDutyPencePerLitre.toFixed(2)}p` : null,
        nowNote: now.pricesAsOf ?? "",
        change: pctChange(then.fuelDutyPencePerLitre, now.fuelDutyPencePerLitre),
      },
      {
        label: "Minimum / Living Wage",
        thenValue: then.minimumWageVerified ? then.minimumWagePerHour : null,
        thenDisplay: then.minimumWageVerified && then.minimumWagePerHour !== null ? `£${then.minimumWagePerHour.toFixed(2)}` : then.minimumWageLabel,
        thenNote: then.minimumWagePeriod ?? then.minimumWageLabel ?? "",
        nowValue: now.minimumWagePerHour,
        nowDisplay: now.minimumWagePerHour !== null ? `£${now.minimumWagePerHour.toFixed(2)}` : null,
        nowNote: now.minimumWagePeriod ?? "",
        change: pctChange(then.minimumWageVerified ? then.minimumWagePerHour : null, now.minimumWagePerHour),
      },
      {
        label: "Average earnings",
        thenValue: then.averageWeeklyEarnings,
        thenDisplay: then.averageWeeklyEarnings !== null ? `£${then.averageWeeklyEarnings.toFixed(0)}/wk` : null,
        thenNote: then.averageWeeklyEarningsPeriod ?? "Not available",
        nowValue: nowEarnings?.value ? Number(nowEarnings.value) : null,
        nowDisplay: nowEarnings?.value ? `£${nowEarnings.value}/wk` : null,
        nowNote: nowEarnings ? `${nowEarnings.dataPeriod} — a 3-month average, not an annual figure like the "then" value` : "",
        change: pctChange(then.averageWeeklyEarnings, nowEarnings?.value ? Number(nowEarnings.value) : null),
      },
      {
        label: "Consumer prices (CPI index)",
        thenValue: then.cpiIndex,
        thenDisplay: then.cpiIndex !== null ? then.cpiIndex.toFixed(1) : null,
        thenNote: then.cpiPeriod ?? "Not available",
        nowValue: latestCompleteYear ? yearlySnapshots[latestCompleteYear].cpiIndex : null,
        nowDisplay: latestCompleteYear && yearlySnapshots[latestCompleteYear].cpiIndex !== null ? yearlySnapshots[latestCompleteYear].cpiIndex!.toFixed(1) : null,
        nowNote: latestCompleteYear ? `Latest complete year (${latestCompleteYear}) — ${currentYear} isn't finished, so no annual figure exists yet` : "",
        change: pctChange(then.cpiIndex, latestCompleteYear ? yearlySnapshots[latestCompleteYear].cpiIndex : null),
      },
      {
        label: "Real household disposable income",
        thenValue: then.realHouseholdDisposableIncomePerHead,
        thenDisplay: then.realHouseholdDisposableIncomePerHead !== null ? `£${then.realHouseholdDisposableIncomePerHead.toLocaleString("en-GB")}` : null,
        thenNote: then.realHouseholdDisposableIncomePeriod ?? "Not available",
        nowValue: latestCompleteYear ? yearlySnapshots[latestCompleteYear].realHouseholdDisposableIncomePerHead : null,
        nowDisplay:
          latestCompleteYear && yearlySnapshots[latestCompleteYear].realHouseholdDisposableIncomePerHead !== null
            ? `£${yearlySnapshots[latestCompleteYear].realHouseholdDisposableIncomePerHead!.toLocaleString("en-GB")}`
            : null,
        nowNote: latestCompleteYear ? `Latest complete year (${latestCompleteYear})` : "",
        change: pctChange(then.realHouseholdDisposableIncomePerHead, latestCompleteYear ? yearlySnapshots[latestCompleteYear].realHouseholdDisposableIncomePerHead : null),
      },
      {
        label: "Bank Rate",
        thenValue: then.bankRatePercent,
        thenDisplay: then.bankRatePercent !== null ? `${then.bankRatePercent}%` : null,
        thenNote: then.bankRatePeriod ?? "Not available",
        nowValue: now.bankRatePercent,
        nowDisplay: now.bankRatePercent !== null ? `${now.bankRatePercent}%` : null,
        nowNote: now.bankRatePeriod ?? "",
        change: null, // a percentage change of a percentage rate is misleading — show the raw difference in the table instead
      },
    ];
    return r;
  }, [then, now, nowEarnings]);

  const thenLitres =
    then.minimumWageVerified && then.minimumWagePerHour !== null && then.petrolPencePerLitre !== null
      ? (then.minimumWagePerHour * 100) / then.petrolPencePerLitre
      : null;
  const nowLitres = now.minimumWagePerHour !== null && now.petrolPencePerLitre !== null ? (now.minimumWagePerHour * 100) / now.petrolPencePerLitre : null;

  const petrolChange = pctChange(then.petrolPencePerLitre, now.petrolPencePerLitre);
  const wageChange = pctChange(then.minimumWageVerified ? then.minimumWagePerHour : null, now.minimumWagePerHour);
  const cpiChangeToNow = pctChange(then.cpiIndex, latestCompleteYear ? yearlySnapshots[latestCompleteYear].cpiIndex : null);

  return (
    <div className="border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-navy-900">THEN:</span>
        {historicalYears.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => setThenYear(y)}
            aria-pressed={thenYear === y}
            className={cn(
              "border px-3.5 py-1.5 text-sm font-bold transition-colors",
              thenYear === y ? "border-slate-600 bg-slate-700 text-white" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
            )}
          >
            {y}
          </button>
        ))}
        <span className="ml-2 text-sm font-semibold text-navy-900">vs NOW:</span>
        <StatusBadge status="latest-available" />
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-charcoal-600">
              <th scope="col" className="py-2.5 pr-4">Measure</th>
              <th scope="col" className="py-2.5 pr-4">{thenYear}</th>
              <th scope="col" className="py-2.5 pr-4">{currentYear}</th>
              <th scope="col" className="py-2.5">Change</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-slate-100 last:border-0 align-top">
                <td className="py-3 pr-4 font-semibold text-navy-900">{row.label}</td>
                <td className="py-3 pr-4">
                  {row.thenDisplay !== null ? (
                    <>
                      <span className="font-bold tabular-nums text-navy-900">{row.thenDisplay}</span>
                      <p className="mt-0.5 text-[11px] text-charcoal-600">{row.thenNote}</p>
                    </>
                  ) : (
                    <span className="text-xs font-medium text-amber-800">DATA NOT AVAILABLE</span>
                  )}
                </td>
                <td className="py-3 pr-4">
                  {row.nowDisplay !== null ? (
                    <>
                      <span className="font-bold tabular-nums text-navy-900">{row.nowDisplay}</span>
                      <p className="mt-0.5 text-[11px] text-charcoal-600">{row.nowNote}</p>
                    </>
                  ) : (
                    <span className="text-xs font-medium text-amber-800">DATA NOT AVAILABLE</span>
                  )}
                </td>
                <td className="py-3 font-bold tabular-nums text-charcoal-700">
                  {row.label === "Bank Rate"
                    ? row.thenValue !== null && row.nowValue !== null
                      ? `${row.nowValue > row.thenValue ? "+" : ""}${(row.nowValue - row.thenValue).toFixed(2)}pp`
                      : "n/a"
                    : formatPct(row.change)}
                </td>
              </tr>
            ))}
            <tr className="align-top">
              <td className="py-3 pr-4 font-semibold text-navy-900">Petrol bought with 1hr minimum wage</td>
              <td className="py-3 pr-4">
                {thenLitres !== null ? <span className="font-bold tabular-nums text-navy-900">{thenLitres.toFixed(1)}L</span> : <span className="text-xs font-medium text-amber-800">DATA NOT AVAILABLE</span>}
              </td>
              <td className="py-3 pr-4">
                {nowLitres !== null ? <span className="font-bold tabular-nums text-navy-900">{nowLitres.toFixed(1)}L</span> : <span className="text-xs font-medium text-amber-800">DATA NOT AVAILABLE</span>}
              </td>
              <td className="py-3 font-bold tabular-nums text-charcoal-700">{formatPct(pctChange(thenLitres, nowLitres))}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-6">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-charcoal-500">What changed?</p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal-700">
          Fuel prices, wages and the general cost of living have all changed over time. This comparison
          shows how those changes relate to each other — it does not draw a conclusion about whether people
          were better or worse off, since that depends on more than these figures alone.
        </p>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-charcoal-700">
          {petrolChange !== null ? (
            <li>
              <strong className="text-navy-900">Fuel price:</strong> petrol cost {formatPct(petrolChange)} per litre
              in {currentYear} compared with {thenYear}.
            </li>
          ) : null}
          {wageChange !== null ? (
            <li>
              <strong className="text-navy-900">Minimum wage:</strong> the applicable rate changed by {formatPct(wageChange)}
              {" "}between {thenYear} ({then.minimumWageLabel}) and {currentYear} ({now.minimumWageLabel}).
            </li>
          ) : null}
          {cpiChangeToNow !== null && latestCompleteYear ? (
            <li>
              <strong className="text-navy-900">Cost of living:</strong> consumer prices (CPI) were {formatPct(cpiChangeToNow)}
              {" "}in {latestCompleteYear} compared with {thenYear}.
            </li>
          ) : null}
          {thenLitres !== null && nowLitres !== null ? (
            <li>
              <strong className="text-navy-900">Minimum-wage purchasing power for petrol:</strong> 1 hour of the
              applicable minimum wage bought {thenLitres.toFixed(1)} litres of petrol in {thenYear}, compared with{" "}
              {nowLitres.toFixed(1)} litres now.
            </li>
          ) : null}
        </ul>
      </div>

      <div className="mt-6">
        <Alert tone="warning" title="These figures come from different periods and, in places, different methodologies.">
          Historical figures describe completed periods or point-in-time snapshots; the &quot;now&quot; column mixes a
          genuine current snapshot (petrol, diesel, Fuel Duty, minimum wage, Bank Rate) with the latest
          available figure for measures that aren&apos;t published daily (CPI, average earnings, household
          income use the latest complete year or a recent rolling average — each is labelled). We show them
          side by side for comparison, but a single-day price is not directly equivalent to a full year&apos;s
          average.
        </Alert>
      </div>
    </div>
  );
}
