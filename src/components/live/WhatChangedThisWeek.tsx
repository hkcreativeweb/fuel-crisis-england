import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CopyFigure } from "@/components/ui/CopyFigure";
import { getLatestUkWeeklyAverage, desnzWeeklySource } from "@/lib/data/desnz-weekly-prices";
import { getBrentWeekly, getGbpUsdDaily, type MarketSeries } from "@/lib/data/market-data";
import { fuelDutyTimeline } from "@/lib/data/fuel-duty-timeline";
import { liveIndicators } from "@/lib/data/live-snapshot";
import type { DataStatusLabel } from "@/lib/types";
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
  const nextDuty = dated.find((e) => e.date > today && e.ratePencePerLitre !== duty?.ratePencePerLitre);
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
      label: fuel === "petrol" ? "Petrol, UK average" : "Diesel, UK average",
      value: `${f.current.toFixed(1)}p/L`,
      change: d === null ? "No earlier week to compare" : `${signed(d, 1, "", "p")} on the previous week`,
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
          change: `${dutyChanged ? `Changed on ${formatDate(duty.date)}` : "Unchanged"}${nextDuty ? `. Next confirmed change: ${nextDuty.ratePencePerLitre}p from ${formatDate(nextDuty.date)}` : ""}`,
          direction: dutyChanged ? null : ("same" as const),
          date: duty.title,
          status: "current" as const,
          source: { name: duty.source, url: duty.sourceUrl },
        }]
      : []),
    ...(vat
      ? [{
          label: "VAT on fuel",
          value: `${vat.value}%`,
          change: "Unchanged",
          direction: "same" as const,
          date: vat.dataPeriod,
          status: "current" as const,
          source: { name: vat.source, url: vat.sourceUrl ?? "https://www.gov.uk/vat-rates" },
        }]
      : []),
    marketRow("Brent crude oil", brent, (v) => `$${v.toFixed(2)}/bbl`, (d) => signed(d, 2, "$"), 0.05, "Week ending"),
    marketRow("Pound to US dollar", fx, (v) => `$${v.toFixed(4)}`, (d) => signed(d, 4, "$"), 0.00005, "Rate on"),
  ];

  const petrolChange = figures.petrol.previous === null ? null : figures.petrol.current - figures.petrol.previous;
  const brentPct = brent.previous ? ((brent.latest.value - brent.previous.value) / brent.previous.value) * 100 : null;
  const fxPct = fx.previous ? ((fx.latest.value - fx.previous.value) / fx.previous.value) * 100 : null;

  return (
    <section id="this-week" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Weekly update"
          title="What changed this week?"
          description="The figures that feed into the pump price, each with its own date and source. Publishers update on different days, so the dates don't all match."
        />

        <div className="mt-8 overflow-hidden rounded border border-slate-200">
          <ul className="divide-y divide-slate-200">
            {rows.map((row) => (
              <li key={row.label} className="grid gap-1 p-4 sm:grid-cols-[1.1fr_0.9fr_1.4fr] sm:items-center sm:gap-6 sm:p-5">
                <div>
                  <p className="text-sm font-semibold text-charcoal-700">{row.label}</p>
                  <StatusBadge status={row.status} className="mt-1" />
                </div>
                <p className="text-2xl font-extrabold tabular-nums text-navy-900">{row.value}</p>
                <div className="text-sm">
                  <p className={row.direction === "up" || row.direction === "down" ? "font-semibold text-navy-900" : "text-charcoal-700"}>
                    {row.direction === "up" ? "▲ " : row.direction === "down" ? "▼ " : ""}
                    {row.change}
                  </p>
                  <p className="mt-0.5 text-xs text-charcoal-600">
                    {row.date} ·{" "}
                    <a href={row.source.url} target="_blank" rel="noopener noreferrer" className="-my-3 inline-block py-3 underline underline-offset-2 hover:text-petrol-600">
                      Source
                    </a>
                  </p>
                  <CopyFigure path="/live-fuel-prices#this-week" text={`${row.value}: ${row.label}, ${row.date}. Source: ${row.source.name}`} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 max-w-3xl rounded bg-slate-50 p-5 sm:p-6">
          <h3 className="text-lg font-bold text-navy-900">Why did prices move?</h3>
          <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
            GOV.UK publishes pump prices, not the reasons they change, so we can&apos;t say for certain.
            {petrolChange !== null && brentPct !== null ? (
              <>
                {" "}What the figures do show: the average petrol price moved {signed(petrolChange, 1, "", "p")} a litre, while Brent
                crude moved {signed(brentPct, 1, "", "%")} over its latest week
                {fxPct !== null ? <> and the pound moved {signed(fxPct, 1, "", "%")} against the dollar</> : null}. {dutyChanged ? "Fuel Duty changed during this period." : "Fuel Duty did not change."}
              </>
            ) : null}{" "}
            Crude oil is priced in dollars, so both feed into what the UK pays, but wholesale and retail prices can
            move at different speeds and margins also change. These figures don&apos;t show how much of this
            week&apos;s change each factor caused.{" "}
            <a href="/why-is-fuel-expensive#one-litre" className="-my-3 inline-block py-3 font-semibold text-petrol-600 underline underline-offset-2">
              How a litre is priced
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
