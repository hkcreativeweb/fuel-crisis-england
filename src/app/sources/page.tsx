import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SourceCard } from "@/components/sources/SourceCard";
import { NewsEmptyState } from "@/components/sources/NewsEmptyState";
import { DataFreshness } from "@/components/sources/DataFreshness";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { officialSources } from "@/lib/data/sources";
import { formatDate } from "@/lib/utils";
import type { DataStatusLabel } from "@/lib/types";

export const metadata: Metadata = pageMetadata("/sources", {
  title: "Sources & Methodology",
  description: "Where our data comes from, how our calculations work, what counts as live vs historical vs estimated, and what we cannot know exactly.",
});

const publishedOn = "2026-10-04";

const statusMeanings: { status: DataStatusLabel; meaning: string }[] = [
  { status: "live", meaning: "A figure fetched automatically from its official source and refreshed regularly, such as the GOV.UK weekly petrol and diesel averages." },
  { status: "current", meaning: "An official rate currently in force, such as Fuel Duty, VAT, Bank Rate or the National Living Wage. It is checked and entered by us when it changes, not a live data feed." },
  { status: "latest-available", meaning: "The most recently published figure for something that isn't measured daily, e.g. CPI inflation, average earnings, a CMA monitoring report." },
  { status: "ytd", meaning: "A year-to-date figure covering part of the current year only, not a full-year total, and not directly comparable to a completed year's average." },
  { status: "historical", meaning: "A figure from a completed period (a full year, or a specific dated event), never a live or in-progress figure." },
  { status: "estimate", meaning: "A figure we have calculated ourselves (e.g. by subtraction, or by applying an average margin), rather than one directly published by a primary source." },
  { status: "projection", meaning: "A forward-looking figure that has not happened yet (e.g. a future announced tax rate), explicitly labelled as a projection, never shown as if it were an actual reported outcome." },
  { status: "not-yet-available", meaning: "We looked for a verified figure and could not find one from a primary source. We show this rather than guessing." },
];

const methodology: { title: string; body: string; status: DataStatusLabel }[] = [
  {
    title: "Where UK fuel-price data comes from",
    status: "live",
    body: "Petrol and diesel prices are the UK weekly average pump prices published by the Department for Energy Security and Net Zero (DESNZ) on GOV.UK. The site checks that source automatically every few hours and validates each reading before using it. If the source is unreachable it shows the last verified reading and says so. These are national averages, not the price at any one station.",
  },
  {
    title: "Where Fuel Duty figures come from",
    status: "current",
    body: "Fuel Duty rates are the rates published by the UK Government on GOV.UK. They are not a live feed: we check and enter a rate when it changes, and show the date it took effect. Announced future changes are labelled as projections until they take effect.",
  },
  {
    title: "How VAT is represented",
    status: "estimate",
    body: "VAT is charged at the standard 20% rate on the price including Fuel Duty, so VAT is one-sixth of the pump price. Where we show VAT in pence it is calculated from the pump price and the published rate, and labelled as a calculation, not a figure taken from a receipt or invoice.",
  },
  {
    title: "How historical figures are handled",
    status: "historical",
    body: "A historical figure is a reading from a completed period or a specific date, always shown with its date. Year-by-year comparisons use the published weekly price for the stated date, not an annual average. A price from an earlier date is never presented as today's price, and a year still in progress has no annual average until a verified one exists.",
  },
  {
    title: "How European comparisons are calculated",
    status: "latest-available",
    body: "Country prices and the EU-27 average come from the European Commission's Weekly Oil Bulletin, in euros per litre with taxes included. UK prices are converted to euros using a single Bank of England spot rate, stated on the Europe page. Countries tax fuel differently and currencies move, so the comparison shows prices side by side without ranking how fair they are.",
  },
  {
    title: "How averages are calculated",
    status: "estimate",
    body: "The UK petrol and diesel figures are DESNZ's own national weekly averages; we do not recalculate them. Where we work out a difference, a percentage change or the cost of a fill, the arithmetic is shown so you can repeat it. We do not publish a year-to-date or annual average until a verified series exists.",
  },
  {
    title: "How often datasets are updated",
    status: "live",
    body: "Fuel prices and news are refreshed automatically (prices are re-checked every few hours and the stored copy is refreshed daily). Rates and statistics such as Fuel Duty, inflation, earnings and European prices are checked by hand and updated when new figures are published. The table below shows the date of the figure currently on the site for each dataset.",
  },
  {
    title: "Live versus historical information",
    status: "historical",
    body: "Live or current figures are the most recent published readings. Historical figures describe a past date or a completed period. Every dataset carries a status label (explained below) so the two are never mixed. The Live Fuel Prices page is the place for today's figures; the year-by-year tools are for comparison.",
  },
];

const calculationNotes = [
  {
    title: "The pump price breakdown",
    body: "Fuel Duty and the VAT rate are exact, published rates. The retailer margin is the CMA's own reported market-wide average for the relevant month. Everything else (crude oil, exchange rate effect, refining, wholesale, distribution) is shown as a single 'wholesale, refining & distribution' figure: the remainder after duty, VAT and margin are subtracted, because no further verified public split of that remainder exists.",
  },
  {
    title: "Currency conversion",
    body: "US-dollar company results are converted to pounds sterling using a single Bank of England spot rate (17 September 2026), applied uniformly to each company's most recent full-year results. This gives an approximate GBP equivalent, not each company's own reporting-period average rate.",
  },
  {
    title: "The £50 'Follow the Money' flow",
    body: "Fuel Duty and VAT amounts are calculated directly from their published rates and are labelled KNOWN. The industry/retail portion is labelled ESTIMATED, because it is either a calculated remainder or based on an averaged CMA margin figure, not a specific verified transaction.",
  },
  {
    title: "Purchasing-power figures",
    body: "Figures like 'litres per hour of minimum-wage work' are transparent arithmetic (fuel price ÷ hourly wage), not a composite 'affordability score' or index. We show the calculation so you can check it yourself.",
  },
];

const cannotKnow = [
  "How much profit any oil or energy company makes specifically from petrol and diesel sold at UK forecourts. This is not separately published by any of the five major companies we cover.",
  "A fuel-specific breakdown of VAT receipts. HMRC publishes VAT receipts by return type/sector, not by product, so a 'VAT on fuel' total does not exist as an official figure.",
  "A verified, primary-sourced historical crude-oil price series compatible with our UK pump-price data. Where we could not verify a series against a primary source (e.g. EIA, ICE), we show 'data not available' rather than an unverified third-party figure.",
  "The exact reason any single petrol station charges a particular price on a particular day. Regional and local price variation involves many factors, and we report what regulators have found rather than inferring motives.",
];

export default function SourcesPage() {
  return (
    <>
      <section className="bg-navy-950 py-14 sm:py-16">
        <Container>
          <SectionHeading as="h1"
            tone="dark"
            eyebrow="Sources & methodology"
            title="Evidence before opinion."
            description="The sources, dates, calculations and limitations behind the figures on this site. Every claim is either sourced or clearly marked as a campaign view."
          />
          <p className="mt-4 text-xs text-slate-400">Page last reviewed {formatDate(publishedOn)}.</p>
        </Container>
      </section>

      <section id="methodology" className="scroll-mt-24 bg-white py-12 sm:py-16">
        <Container>
          <h2 className="text-xl font-bold text-navy-900">How the figures are sourced and handled</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal-700">
            Plain answers to the questions people ask most. Where a figure is calculated rather than published, we say so.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {methodology.map((m) => (
              <div key={m.title} className="rounded-md border border-slate-200 bg-white p-5">
                <StatusBadge status={m.status} />
                <h3 className="mt-2 text-base font-bold text-navy-900">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{m.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="data-freshness" className="scroll-mt-24 bg-slate-50 py-14 sm:py-16">
        <Container>
          <h2 className="text-xl font-bold text-navy-900">How current is each dataset?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal-700">
            Every dataset the site uses, how it is kept up to date, and the date of the figure we are showing.
          </p>
          <div className="mt-6">
            <DataFreshness />
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <h2 className="text-xl font-bold text-navy-900">What our status badges mean</h2>
          <p className="mt-2 max-w-2xl text-sm text-charcoal-700">
            Every figure on this site carries one of these labels. We never present a live snapshot as an
            annual average, or a historical figure as if it were current.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {statusMeanings.map((s) => (
              <div key={s.status} className="rounded-md border border-slate-200 p-4">
                <StatusBadge status={s.status} />
                <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{s.meaning}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-14 sm:py-16">
        <Container>
          <h2 className="text-xl font-bold text-navy-900">How our calculations work</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {calculationNotes.map((c) => (
              <div key={c.title} className="rounded-md border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-bold text-navy-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{c.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-14 sm:py-16">
        <Container>
          <h2 className="text-xl font-bold text-white">What we cannot know exactly</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Being honest about the limits of the evidence is part of the methodology, not a footnote.
          </p>
          <ul className="mt-6 space-y-3">
            {cannotKnow.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-md border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-slate-200">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-petrol-400" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <h2 className="text-xl font-bold text-navy-900">Latest news</h2>
          <div className="mt-4">
            <NewsEmptyState />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-14 sm:py-16">
        <Container>
          <h2 className="text-xl font-bold text-navy-900">Official sources</h2>
          <p className="mt-2 max-w-2xl text-sm text-charcoal-700">
            These organisations publish official statistics, policy, and regulatory information relevant
            to fuel prices in the UK.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {officialSources.map((source) => (
              <SourceCard key={source.name} source={source} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
