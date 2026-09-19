import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { yearlySnapshots } from "@/lib/data/yearly-snapshots";
import { FollowOneLitre } from "@/components/why-expensive/FollowOneLitre";
import { GlobalOilPricesCard } from "@/components/why-expensive/GlobalOilPricesCard";
import { ExchangeRateExample } from "@/components/why-expensive/ExchangeRateExample";
import { CrudeOilNotPetrol } from "@/components/why-expensive/CrudeOilNotPetrol";
import { FallsSlowerThanRises } from "@/components/why-expensive/FallsSlowerThanRises";
import { CompetitionMargins } from "@/components/why-expensive/CompetitionMargins";
import { TaxTransparentCalc } from "@/components/why-expensive/TaxTransparentCalc";
import { FollowTheMoneyTimeline } from "@/components/cost-of-living/FollowTheMoneyTimeline";
import { BuildThePumpPrice } from "@/components/why-expensive/BuildThePumpPrice";
import { HundredMileJourney } from "@/components/why-expensive/HundredMileJourney";
import { WageVsPump } from "@/components/cost-of-living/WageVsPump";
import { FollowTheMoneyFlow } from "@/components/money-flow/FollowTheMoneyFlow";
import { OilDownPumpDown } from "@/components/why-expensive/OilDownPumpDown";
import { CorporateProfitsGrid } from "@/components/cost-of-living/CorporateProfitsGrid";
import { GovernmentCollectsDashboard } from "@/components/cost-of-living/GovernmentCollectsDashboard";
import { BigFCEQuestionChain } from "@/components/why-expensive/BigFCEQuestionChain";
import { PumpToAnnualCost } from "@/components/why-expensive/PumpToAnnualCost";
import { StopAndThink } from "@/components/ui/StopAndThink";
import { PhotoDataCallout } from "@/components/ui/PhotoDataCallout";
import { imageCredits } from "@/lib/data/image-credits";
import { FCEClosingMessage } from "@/components/why-expensive/FCEClosingMessage";

export const metadata: Metadata = {
  title: "Why Is Fuel So Expensive?",
  description: "An evidence-led investigation into every component of the UK pump price: crude oil, exchange rates, refining, wholesale, distribution, retailer margins, Fuel Duty and VAT.",
};

const now = yearlySnapshots["2026"];

const tocLinks = [
  { href: "#one-litre", label: "Follow one litre" },
  { href: "#global-oil", label: "Global oil prices" },
  { href: "#exchange-rate", label: "The pound vs the dollar" },
  { href: "#refining", label: "Crude oil is not petrol" },
  { href: "#falls-slower", label: "Rocket and feather?" },
  { href: "#competition", label: "Competition & retail margins" },
  { href: "#tax-question", label: "The tax question" },
  { href: "#timeline", label: "Historical comparison" },
  { href: "#human-cost", label: "From the pump to the year" },
  { href: "#build-it", label: "Build the pump price" },
  { href: "#tools", label: "More tools" },
  { href: "#profits", label: "The profit question" },
  { href: "#government-revenue", label: "Government revenue" },
  { href: "#who-responsible", label: "Who is responsible?" },
];

export default function WhyIsFuelExpensivePage() {
  return (
    <>
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-why">The price you see</p>
          <div className="mb-6 h-px w-12 bg-white/20" aria-hidden="true" />
          <div className="flex flex-wrap items-end gap-6">
            <p className="text-6xl font-extrabold tabular-nums text-white sm:text-7xl">
              {now.petrolPencePerLitre?.toFixed(1)}p
            </p>
            <p className="mb-2 text-lg text-slate-300">per litre, petrol — {now.year}</p>
          </div>
          <h1 className="mt-6 max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Why is fuel so expensive?
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            The price at the pump is the result of several different costs, taxes and market factors. Not
            a simplistic answer — the full chain, examined honestly.
          </p>
          <nav aria-label="Section contents" className="mt-8 flex flex-wrap gap-2">
            {tocLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:border-petrol-400 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <section id="one-litre" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Where does the money from one litre go?" title="Follow one litre" description="Eight stops between the oil field and your fuel tank — clearly split between market costs and tax." />
          <div className="mt-10">
            <FollowOneLitre />
          </div>
        </Container>
      </section>

      <section id="global-oil" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="So why can it still cost so much?" title="The big question" />
          <div className="mt-10">
            <GlobalOilPricesCard />
          </div>
        </Container>
      </section>

      <section id="exchange-rate" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Why does the exchange rate matter?" title="The pound vs the dollar" />
          <div className="mt-10 max-w-2xl">
            <ExchangeRateExample />
          </div>
        </Container>
      </section>

      <section id="refining" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Crude oil is not petrol" title="Refining costs" />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <PhotoDataCallout
              credit={imageCredits.refinery}
              stat="CRUDE ≠ PETROL"
              statLabel="Refining turns crude oil into usable fuel"
              prompt="See the chain"
              href="#one-litre"
            />
            <CrudeOilNotPetrol />
          </div>
        </Container>
      </section>

      <section id="falls-slower" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="An investigative question" title="Do prices rise faster than they fall?" description="The 'rocket and feather' question — evidence-led, not assumed." />
          <div className="mt-10">
            <FallsSlowerThanRises />
          </div>
        </Container>
      </section>

      <section id="competition" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="What are forecourts making?" title="Competition and retail margins" />
          <div className="mt-10">
            <CompetitionMargins />
          </div>
        </Container>
      </section>

      <section id="tax-question" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="How much of the price is tax?" title="The tax question" />
          <div className="mt-10 max-w-2xl">
            <TaxTransparentCalc />
          </div>
        </Container>
      </section>

      <section id="timeline" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Why is fuel more expensive than it used to be?" title="Price vs purchasing power" description="Not just what the price was — what it meant relative to income at the time." />
          <div className="mt-10">
            <FollowTheMoneyTimeline />
          </div>
        </Container>
      </section>

      <section id="build-it" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Make it interactive" title="Build the Pump Price" description="Drag the sliders to explore a hypothetical price." />
          <div className="mt-10 max-w-2xl">
            <BuildThePumpPrice />
          </div>
        </Container>
      </section>

      <StopAndThink>A litre is small. The bill isn&apos;t.</StopAndThink>

      <section id="human-cost" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="The number on the pump is only one part of the story"
            title="From the pump to the year"
            description="A small per-litre number becomes a much larger annual one — shown against real earnings figures."
          />
          <div className="mt-10">
            <PumpToAnnualCost />
          </div>
        </Container>
      </section>

      <section id="tools" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="More ways to explore" title="More tools" />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-base font-bold text-navy-900">100-Mile Journey</h3>
              <HundredMileJourney />
            </div>
            <div>
              <h3 className="mb-4 text-base font-bold text-navy-900">One Hour of Work</h3>
              <WageVsPump />
            </div>
            <div>
              <h3 className="mb-4 text-base font-bold text-navy-900">Follow £50</h3>
              <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
                <FollowTheMoneyFlow defaultAmount={50} />
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-base font-bold text-navy-900">Oil Down — Pump Down?</h3>
              <OilDownPumpDown />
            </div>
          </div>
        </Container>
      </section>

      <StopAndThink>Global profit isn&apos;t UK pump profit.</StopAndThink>

      <section id="profits" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="And then there's the profit question" title="Billions — but from what?" />
          <div className="mt-10">
            <CorporateProfitsGrid />
          </div>
        </Container>
      </section>

      <StopAndThink>Revenue isn&apos;t profit.</StopAndThink>

      <section id="government-revenue" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="What does government collect?" title="Government revenue, not government profit" description="Tax receipts form part of public revenue and help fund public spending — a different thing from company profit." />
          <div className="mt-10">
            <GovernmentCollectsDashboard />
          </div>
        </Container>
      </section>

      <section id="who-responsible" className="scroll-mt-24 bg-navy-950 py-16 sm:py-20">
        <Container>
          <SectionHeading tone="dark" eyebrow="The big FCE question" title="So who is responsible for the price?" />
          <div className="mt-10">
            <BigFCEQuestionChain />
          </div>
        </Container>
      </section>

      <section className="bg-charcoal-900 py-16 sm:py-20">
        <Container>
          <FCEClosingMessage />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <LinkButton href="/follow-the-money" size="lg">
              Follow The Money
            </LinkButton>
            <LinkButton href="/our-demands" variant="outline-light" size="lg">
              See Our Demands
            </LinkButton>
            <LinkButton href="/sources" variant="outline-light" size="lg">
              See The Sources
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
