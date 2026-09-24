import { getLatestUkWeeklyAverage, desnzWeeklySource } from "@/lib/data/desnz-weekly-prices";
import { getBrentWeekly, getGbpUsdDaily } from "@/lib/data/market-data";
import { internationalBenchmark, internationalBenchmarkSource } from "@/lib/data/hero-fuel-snapshot";
import { europeFuelPriceSource } from "@/lib/data/europe-fuel-prices";
import { liveIndicators } from "@/lib/data/live-snapshot";
import { fuelDutyTimeline } from "@/lib/data/fuel-duty-timeline";
import { fuelDutyReceiptsPartYear } from "@/lib/data/hmrc-receipts";
import { cmaMarginSource } from "@/lib/data/cma-margins";
import { petrolPumpPriceBreakdown } from "@/lib/data/pump-price-breakdown";
import { yearlySnapshots, currentYear } from "@/lib/data/yearly-snapshots";
import { formatDate } from "@/lib/utils";

type Entry = {
  dataset: string;
  method: "automatic" | "manual";
  dateLabel: string;
  source: string;
  url: string | null;
};

const isIsoDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
const date = (s: string | null | undefined) => (s ? (isIsoDate(s) ? formatDate(s) : s) : "Not recorded");

/**
 * Shows how current every dataset on the site is, with each date read from
 * the dataset itself rather than typed here, so this list can't drift from
 * the figures it describes. Automatic sources are re-checked every few
 * hours; everything else is checked and entered by hand.
 */
export async function DataFreshness() {
  const [{ figures, fromLiveSource }, brent, fx] = await Promise.all([getLatestUkWeeklyAverage(), getBrentWeekly(), getGbpUsdDaily()]);
  const indicator = (id: string) => liveIndicators.find((i) => i.id === id);
  const cpi = indicator("inflation");
  const earnings = indicator("earnings");
  const wage = indicator("minimum-wage");
  const today = new Date().toISOString().slice(0, 10);
  const duty = [...fuelDutyTimeline].filter((e) => e.ratePencePerLitre !== null && e.date <= today).sort((a, b) => a.date.localeCompare(b.date)).pop();

  const entries: Entry[] = [
    {
      dataset: "UK weekly petrol and diesel prices",
      method: fromLiveSource ? "automatic" : "manual",
      dateLabel: `Latest week: ${figures.petrol.dataPeriod.replace(/^Week commencing /, "")}`,
      source: desnzWeeklySource.name,
      url: desnzWeeklySource.url,
    },
    {
      dataset: "Brent crude oil price",
      method: brent.fromLiveSource ? "automatic" : "manual",
      dateLabel: `Latest week ending ${formatDate(brent.latest.date)}`,
      source: "U.S. EIA",
      url: brent.source.url,
    },
    {
      dataset: "Pound to US dollar exchange rate",
      method: fx.fromLiveSource ? "automatic" : "manual",
      dateLabel: `Latest rate: ${date(fx.latest.date)}`,
      source: "Bank of England",
      url: fx.source.url,
    },
    {
      dataset: "Fuel Duty rate",
      method: "manual",
      dateLabel: duty ? `${duty.ratePencePerLitre}p, per ${duty.title.toLowerCase()}` : "Not recorded",
      source: duty?.source ?? "GOV.UK",
      url: duty?.sourceUrl ?? null,
    },
    {
      dataset: "US average retail petrol and diesel",
      method: "manual",
      dateLabel: `Latest published: ${date(internationalBenchmark.petrol.lastUpdated)}`,
      source: "U.S. EIA",
      url: internationalBenchmarkSource.url,
    },
    {
      dataset: "Europe comparison (EU-27)",
      method: "manual",
      dateLabel: `Week of ${date(europeFuelPriceSource.dataDate)}, published ${date(europeFuelPriceSource.publishedDate)}`,
      source: europeFuelPriceSource.name,
      url: europeFuelPriceSource.url,
    },
    {
      dataset: "CPI inflation",
      method: "manual",
      dateLabel: `Latest published: ${date(cpi?.lastUpdated)} (${cpi?.dataPeriod ?? ""})`,
      source: cpi?.source ?? "ONS",
      url: cpi?.sourceUrl ?? null,
    },
    {
      dataset: "Average weekly earnings",
      method: "manual",
      dateLabel: `Latest published: ${date(earnings?.lastUpdated)} (${earnings?.dataPeriod ?? ""})`,
      source: earnings?.source ?? "ONS",
      url: earnings?.sourceUrl ?? null,
    },
    {
      dataset: "National Living Wage",
      method: "manual",
      dateLabel: `Rate in force from ${date(wage?.lastUpdated)}`,
      source: wage?.source ?? "GOV.UK",
      url: wage?.sourceUrl ?? null,
    },
    {
      dataset: "Fuel Duty receipts",
      method: "manual",
      dateLabel: `Latest published: ${date(fuelDutyReceiptsPartYear.asOf)} (${fuelDutyReceiptsPartYear.periodLabel})`,
      source: fuelDutyReceiptsPartYear.source,
      url: fuelDutyReceiptsPartYear.sourceUrl ?? null,
    },
    {
      dataset: "Retailer margins",
      method: "manual",
      dateLabel: `Published ${cmaMarginSource.publicationDate} (data to ${cmaMarginSource.dataAsOf.toLowerCase()})`,
      source: "Competition and Markets Authority",
      url: cmaMarginSource.url,
    },
    {
      dataset: "Pump price breakdown",
      method: "manual",
      dateLabel: `Calculated for ${date(petrolPumpPriceBreakdown.asOf)}`,
      source: "Calculated from GOV.UK and CMA figures",
      url: petrolPumpPriceBreakdown.sourceUrl ?? null,
    },
    {
      dataset: `Year-by-year snapshots (${currentYear} row)`,
      method: "manual",
      dateLabel: `Prices as of ${yearlySnapshots[currentYear].pricesAsOf ?? "not recorded"}`,
      source: "GOV.UK, ONS, Bank of England",
      url: null,
    },
  ];

  return (
    <div>
      <ul className="divide-y divide-slate-200 border-y border-slate-200">
        {entries.map((e) => (
          <li key={e.dataset} className="grid gap-1 py-3 sm:grid-cols-[1.2fr_0.8fr_1.4fr_1fr] sm:items-baseline sm:gap-4">
            <p className="font-semibold text-navy-900">{e.dataset}</p>
            <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">
              {e.method === "automatic" ? "Checked automatically" : "Checked by hand"}
            </p>
            <p className="text-sm text-charcoal-700">{e.dateLabel}</p>
            <p className="text-sm">
              {e.url ? (
                <a href={e.url} target="_blank" rel="noopener noreferrer" className="-my-3 inline-block py-3 text-petrol-600 underline underline-offset-2">
                  {e.source}
                </a>
              ) : (
                <span className="text-charcoal-600">{e.source}</span>
              )}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-charcoal-600">
        &ldquo;Checked automatically&rdquo; means the site reads the publisher&apos;s own data every few hours. &ldquo;Checked
        by hand&rdquo; means we update the figure when a new one is published; the date shows how current it is.
      </p>
    </div>
  );
}
