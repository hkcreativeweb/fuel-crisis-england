import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { PhotoBand } from "@/components/ui/PhotoBand";
import { PhotoFigure } from "@/components/ui/PhotoFigure";
import { PetrolDieselCompare } from "@/components/fuel-prices/PetrolDieselCompare";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";
import { Alert } from "@/components/ui/Alert";
import { FuelPriceCard } from "@/components/fuel-prices/FuelPriceCard";
import { FuelPriceChart } from "@/components/fuel-prices/FuelPriceChart";
import { RegionalComparison } from "@/components/fuel-prices/RegionalComparison";
import { FuelCostCalculator } from "@/components/calculator/FuelCostCalculator";
import { getRegionalFuelPrices } from "@/lib/data/fuel-prices";
import { FuelPricesUpdated } from "@/components/ui/FuelPricesUpdated";
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
      <PhotoBand id="forecourt-asda" position="object-[50%_55%]">
          <SectionHeading as="h1"
            tone="dark"
            eyebrow="Fuel price dashboard"
            title="UK petrol and diesel prices"
            description="Official UK weekly average pump prices from GOV.UK, checked for updates every few hours. These are national averages, not the price at any single station."
          />
          <FuelPricesUpdated className="mt-4 text-slate-300" />
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            A fuel crisis is about affordability, not just supply.{" "}
            <a href="/about#fuel-crisis" className="font-semibold text-white underline underline-offset-2">
              What we mean by a fuel crisis
            </a>
            . For the price at a particular station, use Google Maps or Waze.{" "}
            <a href="/live-fuel-prices#fuel-finder" className="font-semibold text-white underline underline-offset-2">
              How fuel prices on those apps work
            </a>
            .
          </p>
      </PhotoBand>

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
              <Alert tone="info" title="The latest official prices could not be loaded just now.">
                They will appear here as soon as they can be verified. We do not show estimated or made-up prices in their place.
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
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <PhotoFigure id="hero-petrol-station" caption="A forecourt price sign photographed in May 2026, showing 164.9p unleaded and 182.9p diesel. It is a past price, shown to illustrate what a price display looks like. Today's averages are beside it." />
            <PetrolDieselCompare petrol={weekly.petrol} diesel={weekly.diesel} />
          </div>
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
