import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Alert } from "@/components/ui/Alert";
import { LinkButton } from "@/components/ui/Button";
import { AtAGlance } from "@/components/live/AtAGlance";
import { LiveIndicatorCard } from "@/components/live/LiveIndicatorCard";
import { HundredMileCard } from "@/components/live/HundredMileCard";
import { YearInProgressTable } from "@/components/live/YearInProgressTable";
import { LocalPriceVariation } from "@/components/live/LocalPriceVariation";
import { WhatChangedThisWeek } from "@/components/live/WhatChangedThisWeek";
import { FollowTheMoneyFlow } from "@/components/money-flow/FollowTheMoneyFlow";
import { liveIndicators, withLatestFuelPrices } from "@/lib/data/live-snapshot";
import { getLatestUkWeeklyAverage } from "@/lib/data/desnz-weekly-prices";
import { getPumpPriceBreakdowns } from "@/lib/data/current-fuel-prices";
import { getBrentWeekly, getGbpUsdDaily } from "@/lib/data/market-data";
import type { LiveIndicator } from "@/lib/data/live-snapshot";
import { currentYear } from "@/lib/data/yearly-snapshots";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = pageMetadata("/live-fuel-prices", {
  title: "Live Fuel Prices",
  description: "The latest available UK fuel-price data, updated automatically: pump prices, Fuel Duty, VAT, crude oil, exchange rates and other indicators, each with its date and source.",
});

const GROUPS: { title: string; ids: string[] }[] = [
  { title: "Fuel prices", ids: ["petrol-price", "diesel-price"] },
  { title: "Taxes and government rates", ids: ["fuel-duty", "vat-rate"] },
  { title: "Global fuel-market indicators", ids: ["crude-oil", "gbp-usd"] },
  { title: "Household and economy indicators", ids: ["inflation", "earnings", "minimum-wage"] },
  { title: "Government revenue", ids: ["fuel-duty-receipts"] },
];

const readingGuide: [string, string][] = [
  ["Latest available", "the newest figure published by the relevant source."],
  ["Current rate", "a rate currently in force."],
  ["Calculated", "an FCE calculation based on published data."],
  ["Historical", "a figure from an earlier period."],
  ["Annual average", "an average across a defined period, not today's price."],
];

const methodology: [string, string][] = [
  ["What \"latest available\" means", "The newest figure the publisher has released at the time we last checked. Pump prices are weekly UK averages from GOV.UK / DESNZ, so the figure applies to a week, not to a moment."],
  ["How current rates are identified", "Fuel Duty is the rate in force today, taken from our dated timeline of GOV.UK and legislation.gov.uk sources. VAT is the standard rate."],
  ["How FCE calculations are made", "The pump-price split subtracts Fuel Duty, VAT and the CMA's reported average retailer margin from the latest pump price; what remains is shown as an estimate. The 100-mile figure multiplies litres used by the latest petrol price, using the working shown on the card."],
  ["How weekly changes are calculated", "The latest published value minus the previous published value from the same source. Crude oil and the exchange rate are compared with their own previous values."],
  ["Why indicators have different dates", "Each publisher updates on its own schedule (weekly, daily, monthly or annually), so the dates are not meant to match."],
  ["Why some figures cannot be compared directly", "A weekly price, a year-to-date average and a full-year average measure different periods, and indicators can also differ in geography. We keep them separate."],
  ["What happens when an update fails", "Prices are checked automatically and each check is validated; implausible or missing data is rejected. If a check fails, the last verified figures stay on the page, marked as awaiting an update with the time of the last successful check."],
  ["Historical values", "Each weekly price is stored as it is recorded and an existing record is never overwritten."],
];

export default async function LiveFuelPricesPage() {
  const [{ figures }, brent, fx, breakdowns] = await Promise.all([getLatestUkWeeklyAverage(), getBrentWeekly(), getGbpUsdDaily(), getPumpPriceBreakdowns()]);
  const withFuel = withLatestFuelPrices(liveIndicators, figures);

  // Crude oil and the exchange rate come from their publishers (EIA, Bank of England) when they can be
  // read; Bank Rate is left off this page because it doesn't help explain the pump price.
  const indicators: LiveIndicator[] = withFuel
    .filter((i) => i.id !== "bank-rate")
    .map((i) => {
      if (i.id === "crude-oil") {
        return { ...i, value: brent.latest.value.toFixed(2), status: "latest-available", lastUpdated: brent.latest.date, dataPeriod: `Week ending ${formatDate(brent.latest.date)}`, source: brent.source.name, sourceUrl: brent.source.url };
      }
      if (i.id === "gbp-usd") {
        return { ...i, value: fx.latest.value.toFixed(4), status: "latest-available", lastUpdated: fx.latest.date, dataPeriod: `Bank of England spot rate, ${formatDate(fx.latest.date)}${fx.fromLiveSource ? "" : " (last verified figure)"}`, source: fx.source.name, sourceUrl: fx.source.url };
      }
      return i;
    });
  const byId = new Map(indicators.map((i) => [i.id, i]));

  return (
    <>
      <section className="bg-navy-950 py-14 sm:py-16">
        <Container>
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-live">
            <span className="h-[6px] w-[6px] rounded-full bg-accent-live" aria-hidden="true" /> Now
          </p>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">Live Fuel Prices</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">The latest available UK fuel-price data, updated automatically.</p>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-400">
            Pump prices, Fuel Duty, VAT, crude oil, exchange rates and other indicators are shown with their relevant date and source.
          </p>
          <aside aria-label="Live does not mean annual average" className="mt-6 max-w-2xl border-l-2 border-sky-400 py-1 pl-4 text-sm leading-relaxed text-slate-200">
            <p className="font-semibold text-white">Live does not mean annual average</p>
            <p className="mt-1">
              A current pump price shows the latest available price. It is not the average price for the whole of {currentYear}. Completed-year figures and
              long-run trends are shown separately, in{" "}
              <a href="/fuel-prices-through-time" className="font-semibold text-white underline underline-offset-2">
                Fuel Prices Through Time
              </a>
              .
            </p>
          </aside>
          <details className="mt-4 max-w-2xl rounded-md border border-white/15 bg-white/5 p-4 text-sm text-slate-200" open>
            <summary className="cursor-pointer font-bold text-white">How to read the data</summary>
            <ul className="mt-3 space-y-1.5">
              {readingGuide.map(([term, meaning]) => (
                <li key={term}>
                  <strong className="font-semibold text-white">{term}</strong> = {meaning}
                </li>
              ))}
            </ul>
          </details>
        </Container>
      </section>

      <AtAGlance />

      <WhatChangedThisWeek />

      <section id="indicators" className="scroll-mt-24 bg-white py-12 sm:py-14">
        <Container>
          <SectionHeading eyebrow="Dashboard" title="Indicators we're tracking" description="Each indicator shows its own period, geography and source." />
          <div className="mt-8 space-y-10">
            {GROUPS.map((group) => {
              const items = group.ids.map((id) => byId.get(id)).filter((i): i is LiveIndicator => Boolean(i));
              return items.length === 0 ? null : (
                <section key={group.title} aria-label={group.title}>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-charcoal-600">{group.title}</h3>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((indicator) => (
                      <LiveIndicatorCard key={indicator.id} indicator={indicator} />
                    ))}
                  </div>
                </section>
              );
            })}
            <section aria-label="Example cost">
              <h3 className="text-sm font-bold uppercase tracking-wide text-charcoal-600">Example cost</h3>
              <div className="mt-3 max-w-xl">
                <HundredMileCard petrolPence={figures.petrol.current} dataPeriod={figures.petrol.dataPeriod} />
              </div>
            </section>
          </div>
        </Container>
      </section>

      <section id="year-in-progress" className="scroll-mt-24 bg-slate-50 py-12 sm:py-14">
        <Container>
          <SectionHeading eyebrow={`${currentYear} so far`} title={`${currentYear} is still in progress`} />
          <div className="mt-6 max-w-3xl">
            <Alert tone="info">
              The latest weekly price is not the same thing as a {currentYear} annual average. We will only publish a verified annual average when the underlying data supports it.
            </Alert>
          </div>
          <div className="mt-6 max-w-3xl">
            <YearInProgressTable
              petrol={{ current: figures.petrol.current, dataPeriod: figures.petrol.dataPeriod }}
              diesel={{ current: figures.diesel.current, dataPeriod: figures.diesel.dataPeriod }}
            />
          </div>
        </Container>
      </section>

      <section id="follow-the-money" className="scroll-mt-24 bg-white py-12 sm:py-14">
        <Container>
          <SectionHeading eyebrow="Where does your money go?" title="Live Follow the Money" description="An illustrative breakdown of the current petrol price using the latest verified pump price and current tax rates." />
          <div className="mt-8 max-w-2xl border border-white/10 bg-navy-950 p-5 sm:p-8">
            <FollowTheMoneyFlow defaultAmount={50} currentBreakdown={breakdowns.petrol} />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-12 sm:py-14">
        <Container>
          <SectionHeading eyebrow="Prices at the pump" title="Why do nearby petrol stations charge different prices?" />
          <div className="mt-8">
            <LocalPriceVariation />
          </div>
        </Container>
      </section>

      <section id="methodology" className="scroll-mt-24 bg-white py-12 sm:py-14">
        <Container>
          <SectionHeading eyebrow="Transparency" title="Methodology & definitions" />
          <dl className="mt-6 grid max-w-4xl gap-x-8 gap-y-5 md:grid-cols-2">
            {methodology.map(([term, text]) => (
              <div key={term}>
                <dt className="text-sm font-bold text-navy-900">{term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-charcoal-700">{text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-charcoal-700">
            Every source is listed on our{" "}
            <a href="/sources" className="font-semibold text-petrol-600 underline underline-offset-2">
              Sources &amp; Methodology
            </a>{" "}
            page.
          </p>
        </Container>
      </section>

      <section className="bg-navy-950 py-14">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white">Want the long-run picture?</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300">See how today compares with completed historical years, side by side.</p>
          </div>
          <LinkButton href="/fuel-prices-through-time" size="lg">
            Then vs Now
          </LinkButton>
        </Container>
      </section>
    </>
  );
}
