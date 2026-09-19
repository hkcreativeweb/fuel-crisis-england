import { yearlySnapshots, availableYears, dataSources } from "@/lib/data/yearly-snapshots";
import { ChartCard } from "@/components/charts/ChartCard";
import { Alert } from "@/components/ui/Alert";
import type { EconomicSeries } from "@/lib/types";

const chartYears = availableYears;

const earningsSeries: EconomicSeries = {
  id: "earnings",
  label: "Average earnings",
  unit: "£/week",
  nominal: true,
  points: chartYears.map((y) => ({ period: y, value: yearlySnapshots[y].averageWeeklyEarnings })),
  source: dataSources.earnings.name,
  sourceUrl: dataSources.earnings.url,
  asOf: null,
  status: "historical",
};

const cpiSeries: EconomicSeries = {
  id: "cpi",
  label: "Consumer prices (CPI)",
  unit: "index, 2015=100",
  nominal: false,
  points: chartYears.map((y) => ({ period: y, value: yearlySnapshots[y].cpiIndex })),
  source: dataSources.cpi.name,
  sourceUrl: dataSources.cpi.url,
  asOf: null,
  status: "historical",
};

const petrolSeries: EconomicSeries = {
  id: "petrol",
  label: "Petrol price",
  unit: "p/litre",
  nominal: true,
  points: chartYears.map((y) => ({ period: y, value: yearlySnapshots[y].petrolPencePerLitre })),
  source: dataSources.fuelPrices.name,
  sourceUrl: dataSources.fuelPrices.url,
  asOf: null,
  status: "historical",
};

const minimumWageSeries: EconomicSeries = {
  id: "minimum-wage",
  label: "Minimum / Living Wage",
  unit: "£/hour",
  nominal: true,
  points: chartYears.map((y) => ({ period: y, value: yearlySnapshots[y].minimumWagePerHour })),
  source: dataSources.minimumWage.name,
  sourceUrl: dataSources.minimumWage.url,
  asOf: null,
  status: "historical",
};

const verifiedCategories = [
  { label: "Fuel", detail: "UK petrol and diesel pump prices, DESNZ weekly series." },
  { label: "Wages", detail: "Minimum/Living Wage rates and average weekly earnings, GOV.UK / ONS." },
  { label: "Disposable income", detail: "Real households' disposable income per head, ONS." },
  { label: "General consumer prices", detail: "The overall CPI index (all items), ONS — a single broad measure, not split by category here." },
];

export function CostOfLivingContext() {
  return (
    <div>
      <p className="max-w-2xl text-sm leading-relaxed text-charcoal-700">
        The cost of living is broader than the price of fuel. Housing, food, energy, transport and other
        household expenses all matter. This section therefore separates fuel affordability from wider
        household costs — using the broad, verified indicators below rather than a single invented
        &quot;cost of living score&quot;.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {verifiedCategories.map((c) => (
          <div key={c.label} className="border border-slate-200 p-5">
            <p className="text-sm font-bold text-navy-900">{c.label}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-charcoal-700">{c.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Alert tone="info" title="What this section does not cover.">
          The Office for National Statistics also publishes category-level detail — food, housing, energy,
          transport, household goods and services — within its CPI basket and its Family Spending /
          Household Finances releases. We have not itemised those category-by-category figures for each
          year shown here, because doing so reliably across an 11-year span would require verifying each
          category against its own dataset and methodology change. Rather than approximate that, we show
          the overall CPI measure and the specific indicators above, and link to ONS for deeper category
          detail.
        </Alert>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <ChartCard
          title="Income growth vs consumer-price growth"
          description="Average weekly earnings (nominal) against the overall CPI index — indexed to each series' earliest available year so the two can be compared as % change."
          series={[earningsSeries, cpiSeries]}
          indexed
        />
        <ChartCard
          title="Petrol price vs minimum wage"
          description="UK petrol pump price against the Minimum/Living Wage rate in force — indexed to each series' earliest available year."
          series={[petrolSeries, minimumWageSeries]}
          indexed
        />
      </div>
    </div>
  );
}
