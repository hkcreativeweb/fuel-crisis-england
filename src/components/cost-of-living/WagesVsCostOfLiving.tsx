import { MinimumWageTable } from "@/components/cost-of-living/MinimumWageTable";
import { ChartCard } from "@/components/charts/ChartCard";
import { minimumWageSeries, medianEarningsSeries } from "@/lib/data/wage-data";
import { cpiInflationSeries, petrolPriceSeries, bankRateSeries } from "@/lib/data/economic-series";

export function WagesVsCostOfLiving() {
  return (
    <div className="space-y-8">
      <MinimumWageTable />

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Minimum wage vs median earnings"
          description="How the wage floor compares to typical pay over time."
          series={[minimumWageSeries, medianEarningsSeries]}
        />
        <ChartCard
          title="Inflation (CPI) over time"
          description="Annual UK Consumer Prices Index inflation rate."
          series={[cpiInflationSeries]}
        />
        <ChartCard
          title="Fuel prices over time"
          description="Average petrol price, for context alongside wages and inflation."
          series={[petrolPriceSeries]}
        />
        <ChartCard
          title="Bank Rate over time"
          description="Bank of England Bank Rate, which affects mortgage and borrowing costs."
          series={[bankRateSeries]}
        />
      </div>
    </div>
  );
}
