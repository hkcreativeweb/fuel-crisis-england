import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { ThenVsNow } from "@/components/live/ThenVsNow";
import { HistoricalExplorer } from "@/components/cost-of-living/HistoricalExplorer";
import { CostOfLivingContext } from "@/components/cost-of-living/CostOfLivingContext";
import { WageVsPump } from "@/components/cost-of-living/WageVsPump";
import { WhatDid20Buy } from "@/components/cost-of-living/WhatDid20Buy";
import { DataSourcePanel } from "@/components/cost-of-living/DataSourcePanel";
import { imageCredits } from "@/lib/data/image-credits";

const credit = imageCredits["vintage-pumps"];

export const metadata: Metadata = {
  title: "Fuel Prices Through Time",
  description: "How UK fuel prices, taxes, wages and purchasing power have changed across completed historical years, kept strictly separate from live, current-day figures.",
};

export default function FuelPricesThroughTimePage() {
  return (
    <>
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-then">
                <span className="h-[6px] w-[6px] rounded-full bg-accent-then" aria-hidden="true" /> Then
              </p>
              <div className="mb-5 h-px w-12 bg-white/20" aria-hidden="true" />
              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">Fuel Prices Through Time</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                What happened before: completed historical periods only, each clearly dated and sourced.
                For what&apos;s happening today, see{" "}
                <a href="/live-fuel-prices" className="font-semibold underline underline-offset-2">
                  Live Fuel Prices
                </a>
                .
              </p>
            </div>
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded border border-white/10">
                <Image src={credit.src} alt={credit.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              </div>
              <PhotoCredit credit={credit} className="mt-3" />
            </div>
          </div>
        </Container>
      </section>

      <section id="compare" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Same £20, different years" title="Then vs Now" description="Choose a historical year and compare it directly against today, with every figure's period made explicit." />
          <div className="mt-10">
            <ThenVsNow />
          </div>
        </Container>
      </section>

      <section id="explore-any-year" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            number="01"
            eyebrow="Explore any year"
            title="Cost of living through the years"
            description="Fuel, pay and the wider cost of living for each year, with the affordability comparisons calculated transparently, not just raw numbers."
            rule
          />
          <div className="mt-10">
            <HistoricalExplorer />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading number="02" eyebrow="What did life cost then?" title="Fuel is one part of the cost of living" rule />
          <div className="mt-10">
            <CostOfLivingContext />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Historical affordability" title="Litres of petrol bought with one hour of pay" description="A transparent calculation, not an 'affordability score', showing the relationship between wages and fuel prices in each year." />
          <div className="mt-10 max-w-2xl">
            <WageVsPump />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="A historical comparison" title="What £20 buys" />
          <div className="mt-10 max-w-2xl">
            <WhatDid20Buy />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Data sources" title="Where this data comes from" />
          <div className="mt-10">
            <DataSourcePanel />
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-16 sm:py-20">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white">Want to know what&apos;s happening right now?</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300">Live and latest-available figures, kept separate from these historical ones.</p>
          </div>
          <LinkButton href="/live-fuel-prices" size="lg">
            Live Fuel Prices
          </LinkButton>
        </Container>
      </section>
    </>
  );
}
