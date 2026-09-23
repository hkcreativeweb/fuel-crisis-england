import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";
import { Alert } from "@/components/ui/Alert";
import { FuelPriceCard } from "@/components/fuel-prices/FuelPriceCard";
import { FuelPriceChart } from "@/components/fuel-prices/FuelPriceChart";
import { RegionalComparison } from "@/components/fuel-prices/RegionalComparison";
import { FuelCostCalculator } from "@/components/calculator/FuelCostCalculator";
import { getRegionalFuelPrices } from "@/lib/data/fuel-prices";
import { getCurrentFuelPriceSnapshot, getHistoricalFuelPrices } from "@/lib/data/desnz-weekly-prices";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Fuel Prices",
  description: "A clean dashboard of petrol and diesel prices in England: current snapshot, historical chart, and regional comparison.",
};

export default async function FuelPricesPage() {
  const [snapshot, historical, regional] = await Promise.all([
    getCurrentFuelPriceSnapshot(),
    getHistoricalFuelPrices(),
    getRegionalFuelPrices(),
  ]);

  return (
    <>
      <section className="bg-navy-950 py-14 sm:py-16">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Fuel price dashboard"
            title="Petrol and diesel prices in England"
            description="A clean, honest view of current and historical fuel prices, built to connect to a verified live data source."
          />
        </Container>
      </section>

      <section className="bg-slate-50 py-14 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-navy-900">Current snapshot</h2>
            <DataStatusBadge status={snapshot ? snapshot.provenance.status : "unavailable"} />
          </div>

          {snapshot ? (
            <>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <FuelPriceCard fuel="petrol" pencePerLitre={snapshot.petrolPencePerLitre} />
                <FuelPriceCard fuel="diesel" pencePerLitre={snapshot.dieselPencePerLitre} />
              </div>
              <p className="mt-4 text-xs text-charcoal-600">
                {snapshot.provenance.asOf ? `Updated ${formatDate(snapshot.provenance.asOf)}.` : null}
                {snapshot.provenance.asOf && snapshot.provenance.source ? " " : null}
                {snapshot.provenance.source ? `Source: ${snapshot.provenance.source}` : null}
              </p>
            </>
          ) : (
            <div className="mt-6">
              <Alert tone="info" title="Fuel price data is currently being connected.">
                Prices will be displayed once verified. We do not show estimated or fabricated prices.
                See the demo preview in the chart and table below to explore how this dashboard will look
                once a live source is connected.
              </Alert>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <FuelPriceCard fuel="petrol" pencePerLitre={null} />
                <FuelPriceCard fuel="diesel" pencePerLitre={null} />
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <FuelPriceChart realData={historical} />
            <RegionalComparison realData={regional} />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Work it out"
            title="Petrol and diesel cost calculator"
            description="Use your own mileage and fuel economy to estimate what you're actually spending."
          />
          <div className="mt-8 max-w-3xl">
            <FuelCostCalculator />
          </div>
        </Container>
      </section>
    </>
  );
}
