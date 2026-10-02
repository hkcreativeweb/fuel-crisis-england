import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CopyFigure } from "@/components/ui/CopyFigure";
import { getLatestUkWeeklyAverage, desnzWeeklySource } from "@/lib/data/desnz-weekly-prices";
import { getBrentWeekly, getGbpUsdDaily, type MarketSeries } from "@/lib/data/market-data";
import { fuelDutyTimeline } from "@/lib/data/fuel-duty-timeline";
import { liveIndicators } from "@/lib/data/live-snapshot";
import type { DataStatusLabel } from "@/lib/types";
import { shortSource } from "@/lib/source-label";
import { formatDate } from "@/lib/utils";

type Row = {
  label: string;
  value: string;
  change: string;
  direction: "up" | "down" | "same" | null;
  date: string;
  status: DataStatusLabel;
  source: { name: string; url: string };
};

function signed(n: number, digits: number, prefix = "", suffix = ""): string {
  const sign = n > 0 ? "+" : n < 0 ? "−" : "±";
  return `${sign}${prefix}${Math.abs(n).toFixed(digits)}${suffix}`;
}

function direction(n: number, threshold: number): Row["direction"] {
  if (Math.abs(n) < threshold) return "same";
  return n > 0 ? "up" : "down";
}

function marketRow(label: string, series: MarketSeries, format: (v: number) => string, delta: (d: number) => string, threshold: number, what: string): Row {
  const d = series.previous ? series.latest.value - series.previous.value : null;
  return {
    label,
    value: format(series.latest.value),
    change: d === null ? "No earlier figure to compare" : `${delta(d)} since ${formatDate(series.previous!.date)}`,
    direction: d === null ? null : direction(d, threshold),
    date: `${what} ${formatDate(series.latest.date)}`,
    status: "latest-available",
    source: series.source,
  };
}

/**
 * A weekly snapshot of the figures that feed into UK pump prices, each with
 * its own date, status and source. Figures come from their publishers
 * (GOV.UK, EIA, Bank of England) where they can be read automatically, and
 * from the site's verified data otherwise. Dates differ because each
 * publisher uses a different schedule, and each row says which it is.
 */
export async function WhatChangedThisWeek() {
  const [{ figures }, brent, fx] = await Promise.all([getLatestUkWeeklyAverage(), getBrentWeekly(), getGbpUsdDaily()]);
  // Chosen by date rather than by status label, so a confirmed change becomes "current" on the day it takes effect.
  const today = new Date().toISOString().slice(0, 10);
  const dated = fuelDutyTimeline.filter((e) => e.ratePencePerLitre !== null).sort((a, b) => a.date.localeCompare(b.date));
  const duty = [...dated].reverse().find((e) => e.date <= today);
  const vat = liveIndicators.find((i) => i.id === "vat-rate");
  // Did Fuel Duty change during the week being compared? Checked against the timeline, not assumed.
  const weekStart = new Date(`${figures.petrol.lastUpdated}T00:00:00Z`);
  weekStart.setUTCDate(weekStart.getUTCDate() - 7);
  const windowStart = weekStart.toISOString().slice(0, 10);
  const dutyChanged = dated.some((e, i) => i > 0 && e.date > windowStart && e.date <= today && e.ratePencePerLitre !== dated[i - 1].ratePencePerLitre);

  const pump = (fuel: "petrol" | "diesel"): Row => {
    const f = figures[fuel];
    const d = f.previous === null ? null : f.current - f.previous;
    return {
      label: fuel === "petrol" ? "Petrol" : "Diesel",
      value: `${f.current.toFixed(1)}p/L`,
      change: d === null ? "No earlier week to compare" : signed(d, 1, "", "p"),
      direction: d === null ? null : direction(d, 0.05),
      date: f.dataPeriod,
      status: "latest-available",
      source: { name: desnzWeeklySource.name, url: desnzWeeklySource.url },
    };
  };

  const rows: Row[] = [
    pump("petrol"),
    pump("diesel"),
    ...(duty
      ? [{
          label: "Fuel Duty",
          value: `${duty.ratePencePerLitre}p/L`,
          change: dutyChanged ? `Changed on ${formatDate(duty.date)}` : "Unchanged",
          direction: dutyChanged ? null : ("same" as const),
          date: `In force since ${formatDate(duty.date)}`,
          status: "current" as const,
          source: { name: duty.source, url: duty.sourceUrl },
        }]
      : []),
    ...(vat
      ? [{
          label: "VAT",
          value: `${vat.value}%`,
          change: "Unchanged",
          direction: "same" as const,
          date: vat.dataPeriod,
          status: "current" as const,
          source: { name: vat.source, url: vat.sourceUrl ?? "https://www.gov.uk/vat-rates" },
        }]
      : []),
    marketRow("Brent crude", brent, (v) => `$${v.toFixed(2)}/bbl`, (d) => signed(d, 2, "$"), 0.05, "Week ending"),
    marketRow("GBP/USD", fx, (v) => `$${v.toFixed(4)}`, (d) => signed(d, 4, "$"), 0.00005, "Rate on"),
  ];

  const petrolChange = figures.petrol.previous === null ? null : figures.petrol.current - figures.petrol.previous;
  const dieselChange = figures.diesel.previous === null ? null : figures.diesel.current - figures.diesel.previous;
  const brentPct = brent.previous ? ((brent.latest.value - brent.previous.value) / brent.previous.value) * 100 : null;
  const fxPct = fx.previous ? ((fx.latest.value - fx.previous.value) / fx.previous.value) * 100 : null;

  return (
    <section id="this-week" className="scroll-mt-24 bg-slate-50 py-12 sm:py-14">
      <Container>
        <SectionHeading eyebrow="Weekly update" title="What changed?" description="Latest movement in the indicators we track. Publishers update on different days, so the dates differ." />

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <li key={row.label}>
              <article aria-label={row.label} className="flex h-full flex-col rounded border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-charcoal-700">{row.label}</h3>
                <p className="mt-1 text-2xl font-extrabold tabular-nums text-navy-900">{row.value}</p>
                <p className={row.direction === "up" || row.direction === "down" ? "mt-1 text-sm font-semibold text-navy-900" : "mt-1 text-sm text-charcoal-700"}>
                  {row.direction === "up" ? <span aria-hidden="true">▲ </span> : row.direction === "down" ? <span aria-hidden="true">▼ </span> : null}
                  {row.direction === "up" ? <span className="sr-only">Increased: </span> : row.direction === "down" ? <span className="sr-only">Decreased: </span> : null}
                  {row.change}
                </p>
                <p className="mt-1 flex-1 text-xs text-charcoal-600">{row.date}</p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <a
                    href={row.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={row.source.name}
                    aria-label={"Source: " + row.source.name + " (opens in a new tab)"}
                    className="inline-block py-1.5 font-semibold text-petrol-600 underline underline-offset-2"
                  >
                    {shortSource(row.source.name)}
                  </a>
                  <CopyFigure path="/live-fuel-prices#this-week" text={row.value + ": " + row.label + ", " + row.date + ". Source: " + row.source.name} />
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-8 max-w-3xl rounded border border-slate-200 bg-white p-5 sm:p-6">
          <h3 className="text-lg font-bold text-navy-900">What might explain the movement?</h3>
          <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
            GOV.UK publishes the pump-price figure, but it does not attribute each week&apos;s movement to individual causes. The data
            therefore cannot tell us exactly why the price changed.
          </p>
          {petrolChange !== null && brentPct !== null ? (
            <>
              <p className="mt-3 text-sm font-semibold text-navy-900">What the figures show over their latest period:</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-charcoal-700">
                <li>
                  Average petrol price: {petrolChange > 0 ? "up" : petrolChange < 0 ? "down" : "unchanged"} ({signed(petrolChange, 1, "", "p")} a litre).
                </li>
                {dieselChange !== null ? (
                  <li>
                    Average diesel price: {dieselChange > 0 ? "up" : dieselChange < 0 ? "down" : "unchanged"} ({signed(dieselChange, 1, "", "p")} a litre).
                  </li>
                ) : null}
                <li>Brent crude: {signed(brentPct, 1, "", "%")} over its latest week.</li>
                {fxPct !== null ? <li>The pound against the dollar: {signed(fxPct, 1, "", "%")}.</li> : null}
                <li>{dutyChanged ? "Fuel Duty changed during this period." : "Fuel Duty did not change."}</li>
              </ul>
            </>
          ) : null}
          <p className="mt-3 text-sm leading-relaxed text-charcoal-700">
            Crude oil is priced in dollars, so oil and exchange rates both feed into what the UK pays, but wholesale and retail prices can move at
            different speeds and margins also change. <strong className="font-semibold text-navy-900">These figures show correlation and movement, not how much of the change each factor caused.</strong>{" "}
            <a href="/why-is-fuel-expensive#one-litre" className="-my-3 inline-block py-3 font-semibold text-petrol-600 underline underline-offset-2">
              How a litre is priced
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
