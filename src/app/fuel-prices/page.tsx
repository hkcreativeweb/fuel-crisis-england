import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";
import { Alert } from "@/components/ui/Alert";
import { FuelPriceCard } from "@/components/fuel-prices/FuelPriceCard";
import { FuelPriceChart } from "@/components/fuel-prices/FuelPriceChart";
import { RegionalComparison } from "@/components/fuel-prices/RegionalComparison";
import { FuelCostCalculator } from "@/components/calculator/FuelCostCalculator";
import { getRegionalFuelPrices } from "@/lib/data/fuel-prices";
import { getCurrentFuelPriceSnapshot, getHistoricalFuelPrices, getLatestUkWeeklyAverage } from "@/lib/data/desnz-weekly-prices";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = pageMetadata("/fuel-prices", {
  title: "Fuel Prices",
  description: "UK average petrol and diesel prices from official GOV.UK weekly statistics: current figures, a 12-month chart and a CSV download.",
});

export default async function FuelPricesPage() {
  const [snapshot, historical, regional, { figures: weekly }] = await Promise.all([
    getCurrentFuelPriceSnapshot(),
    getHistoricalFuelPrices(),
    getRegionalFuelPrices(),
    getLatestUkWeeklyAverage(),
  ]);

  return (
    <>
      <section className="bg-navy-950 py-14 sm:py-16">
        <Container>
          <SectionHeading as="h1"
            tone="dark"
            eyebrow="Fuel price dashboard"
            title="UK petrol and diesel prices"
            description="Official UK weekly average pump prices from GOV.UK, checked for updates every few hours. These are national averages, not the price at any single station."
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
            <FuelCostCalculator prices={{ petrol: weekly.petrol.current, diesel: weekly.diesel.current, dataPeriod: weekly.petrol.dataPeriod }} />
          </div>
        </Container>
      </section>
    </>
  );
}
