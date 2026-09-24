import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Alert } from "@/components/ui/Alert";
import { ContentTagLegend } from "@/components/ui/ContentTag";
import { CorporateProfitsGrid } from "@/components/cost-of-living/CorporateProfitsGrid";
import { BillionsVisual } from "@/components/cost-of-living/BillionsVisual";
import { ProfitsVsFuelExplorer } from "@/components/cost-of-living/ProfitsVsFuelExplorer";
import { PumpPriceBreakdownVisual } from "@/components/cost-of-living/PumpPriceBreakdownVisual";
import { FollowTheMoneyTimeline } from "@/components/cost-of-living/FollowTheMoneyTimeline";
import { WageVsPump } from "@/components/cost-of-living/WageVsPump";
import { WhatDid20Buy } from "@/components/cost-of-living/WhatDid20Buy";
import { GovernmentCollectsDashboard } from "@/components/cost-of-living/GovernmentCollectsDashboard";
import { WagesVsCostOfLiving } from "@/components/cost-of-living/WagesVsCostOfLiving";
import { WageGapExplorer } from "@/components/cost-of-living/WageGapExplorer";
import { InterestRatesSection } from "@/components/cost-of-living/InterestRatesSection";
import { BiggerPictureFlow } from "@/components/cost-of-living/BiggerPictureFlow";
import { FollowTheMoneyFlow } from "@/components/money-flow/FollowTheMoneyFlow";
import { CorporateProfitsTimeline } from "@/components/cost-of-living/CorporateProfitsTimeline";
import { ProfiteeringFAQ } from "@/components/cost-of-living/ProfiteeringFAQ";
import { CampaignStatement } from "@/components/cost-of-living/CampaignStatement";
import { SourcesPanel } from "@/components/cost-of-living/SourcesPanel";
import { LinkButton } from "@/components/ui/Button";
import { PhotoDataCallout } from "@/components/ui/PhotoDataCallout";
import { imageCredits } from "@/lib/data/image-credits";

export const metadata: Metadata = pageMetadata("/follow-the-money", {
  title: "Follow The Money",
  description:
    "The full investigation: what motorists pay, what government collects through Fuel Duty and VAT, what energy companies report, and what policy choices exist, with verified figures and sources throughout.",
});

const tocLinks = [
  { href: "#signature", label: "Follow the £50" },
  { href: "#corporate-profits", label: "Corporate profits" },
  { href: "#billions", label: "The billions visual" },
  { href: "#profits-vs-fuel", label: "Profits vs fuel prices" },
  { href: "#pump-price-breakdown", label: "Where the money goes" },
  { href: "#timeline", label: "1995 → today" },
  { href: "#wage-vs-pump", label: "Your wage vs the pump" },
  { href: "#what-did-20-buy", label: "What did £20 buy?" },
  { href: "#excessive-profits", label: "Excessive profits?" },
  { href: "#government-collects", label: "What government collects" },
  { href: "/our-demands", label: "Our demands" },
  { href: "#wages-vs-cost-of-living", label: "Are wages keeping up?" },
  { href: "#wage-gap", label: "The wage gap" },
  { href: "#interest-rates", label: "Interest rates" },
  { href: "#bigger-picture", label: "The bigger picture" },
  { href: "#profits-timeline", label: "Profits timeline" },
  { href: "#sources", label: "Our sources" },
];

export default function FollowTheMoneyPage() {
  return (
    <>
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-petrol-300">The full investigation</p>
          <div className="mb-5 h-px w-12 bg-white/20" aria-hidden="true" />
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Follow the money.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            What motorists pay, what government collects, what energy companies report, how the numbers
            have changed since 1995, and what policy choices exist, with verified figures, clear
            sourcing, and evidence rather than assumptions.
          </p>

          <div className="mt-8 rounded border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">How to read this page</p>
            <div className="mt-3">
              <ContentTagLegend />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Every claim below is labelled as one of these. We do not present campaign commentary or
              public opinion as if it were a verified figure.
            </p>
          </div>

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

      <section id="signature" className="scroll-mt-24 bg-charcoal-900 py-16 sm:py-20">
        <Container>
          <SectionHeading tone="dark" eyebrow="One payment, traced" title="Follow the £50" description="Enter an amount, then watch it move through the system: tax, industry, and retail." />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <PhotoDataCallout
              credit={imageCredits["forecourt-close"]}
              stat="£50"
              statLabel="A typical fuel purchase"
              prompt="Where does it go?"
              minHeight="min-h-[240px] lg:min-h-full"
            />
            <div className="rounded border border-white/10 bg-white/5 p-6 sm:p-8">
              <FollowTheMoneyFlow defaultAmount={50} />
            </div>
          </div>
        </Container>
      </section>

      <section id="corporate-profits" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="How much are companies making?" title="Billions, But From What?" description="Verified annual financial results for five major energy companies, with each accounting measure clearly labelled." />
          <div className="mt-10">
            <CorporateProfitsGrid />
          </div>
        </Container>
      </section>

      <section id="billions" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Making big numbers make sense" title="What does a billion pounds actually look like?" />
          <div className="mt-10 max-w-2xl">
            <BillionsVisual />
          </div>
        </Container>
      </section>

      <section id="profits-vs-fuel" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Explore the trends" title="Corporate Profits vs Fuel Prices" description="An interactive comparison, not proof of cause and effect." />
          <div className="mt-10">
            <ProfitsVsFuelExplorer />
          </div>
        </Container>
      </section>

      <section id="pump-price-breakdown" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Where does your money go?" title="Where does the money from a litre of fuel go?" description="A verified breakdown of an average litre's pump price, with the date, source, and methodology for every figure." />
          <div className="mt-10 max-w-2xl">
            <PumpPriceBreakdownVisual />
          </div>
        </Container>
      </section>

      <section id="timeline" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="The site's signature interactive feature" title="Follow The Money: 1995 → Today" description="Move the slider to see how fuel prices, tax, wages and inflation have changed." />
          <div className="mt-10">
            <FollowTheMoneyTimeline />
          </div>
        </Container>
      </section>

      <section id="wage-vs-pump" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="How much of your working hour buys fuel?" title="Your Wage vs The Pump" description="Minimum hourly wage ÷ fuel price, using each rate's actual effective date." />
          <div className="mt-10 max-w-2xl">
            <WageVsPump />
          </div>
        </Container>
      </section>

      <section id="what-did-20-buy" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="A historical comparison" title="What Did £20 Buy?" />
          <div className="mt-10 max-w-2xl">
            <WhatDid20Buy />
          </div>
        </Container>
      </section>

      <section id="excessive-profits" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="An honest question" title="Are Energy Companies Making Excessive Profits?" description="We don't answer yes or no. Here's what 'excessive profit', 'profiteering' and 'windfall profits' actually mean, and the evidence available." />
          <div className="mt-10 max-w-3xl">
            <ProfiteeringFAQ />
          </div>
        </Container>
      </section>

      <section id="government-collects" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="A large dashboard" title="What Does Government Collect?" />
          <div className="mt-10">
            <GovernmentCollectsDashboard />
          </div>
        </Container>
      </section>

      <section className="scroll-mt-24 bg-navy-950 py-16 sm:py-20">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-petrol-300">What we are asking for</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Our Public Policy Demands</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              Freezing Fuel Duty, reviewing fuel taxation, investigating excessive profits, and more, with
              clear explainers on what government can and can&apos;t do quickly.
            </p>
          </div>
          <LinkButton href="/our-demands" size="lg">
            See Our Demands
          </LinkButton>
        </Container>
      </section>

      <section id="wages-vs-cost-of-living" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Are wages keeping up?" title="Are Wages Keeping Up?" description="How wages, inflation, and the minimum wage compare over time." />
          <div className="mt-10">
            <WagesVsCostOfLiving />
          </div>
        </Container>
      </section>

      <section id="wage-gap" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="What do we mean by this?" title="The Wage Gap" description="'Wage gap' can mean several different things. Choose a specific comparison below rather than one ambiguous measure." />
          <div className="mt-10">
            <WageGapExplorer />
          </div>
        </Container>
      </section>

      <section id="interest-rates" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Borrowing, saving, and inflation" title="Interest Rates & The Cost of Living" />
          <div className="mt-10">
            <InterestRatesSection />
          </div>
        </Container>
      </section>

      <section id="bigger-picture" className="scroll-mt-24 bg-navy-950 py-16 sm:py-20">
        <Container>
          <SectionHeading tone="dark" eyebrow="How it all connects" title="What Does It Mean For Ordinary People?" />
          <div className="mt-10">
            <BiggerPictureFlow />
          </div>
        </Container>
      </section>

      <section id="profits-timeline" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="The full picture, not just the highlights" title="Corporate Profits Timeline" description="Shell and BP's annual results since 2015, including the weaker years, not just the strongest ones." />
          <div className="mt-10">
            <CorporateProfitsTimeline />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <CampaignStatement />
        </Container>
      </section>

      <section id="sources" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Fact-checked, always" title="Our Sources" />
          <div className="mt-10">
            <SourcesPanel />
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-16 sm:py-20">
        <Container className="text-center">
          <p className="text-2xl font-extrabold text-white sm:text-3xl">
            Ask questions. Follow the money. Check the evidence.{" "}
            <span className="text-petrol-400">Make your voice heard.</span>
          </p>
          <div className="mt-8">
            <Alert tone="info" className="mx-auto max-w-2xl text-left">
              This page gives you the data, sources, and explanations to understand the situation yourself.
              It does not tell you what conclusion to reach.
            </Alert>
          </div>
          <div className="mt-8">
            <LinkButton href="/ask-your-mp" size="lg">
              Ask Your MP
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
