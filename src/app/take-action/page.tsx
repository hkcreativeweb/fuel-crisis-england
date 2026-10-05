import type { Metadata } from "next";
import { IndependenceNotice } from "@/components/ui/IndependenceNotice";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Alert } from "@/components/ui/Alert";
import { PumpPriceBreakdownVisual } from "@/components/cost-of-living/PumpPriceBreakdownVisual";
import { CopyTextButton, InterestForm, ShareButtons } from "@/components/take-action/TakeActionClient";
import { getLatestUkWeeklyAverage, desnzWeeklySource } from "@/lib/data/desnz-weekly-prices";
import { fuelDutyTimeline } from "@/lib/data/fuel-duty-timeline";
import { trendArrow, trendDirection, type WeeklyFigure } from "@/lib/data/hero-fuel-snapshot";
import { mpMessageTemplate, petitionPath, plannedProtest } from "@/lib/data/take-action-config";
import { formatDate } from "@/lib/utils";
import { ContactDetails } from "@/components/ui/ContactDetails";
import { siteConfig } from "@/lib/site-config";
import { PetitionCounter } from "@/components/petition/PetitionCounter";
import { LatestNewsPreview } from "@/components/news/LatestNewsPreview";
import { FuelPricesUpdated } from "@/components/ui/FuelPricesUpdated";
import { PetitionBanner } from "@/components/petition/PetitionBanner";

export const metadata: Metadata = {
  title: "Take Action | Fuel Crisis England",
  description:
    "Learn about the UK fuel-price situation, follow fuel news, contact your MP and register your interest in peaceful civic action.",
};

// Re-check the official weekly figures regularly so the page never sticks on an old week.
export const revalidate = 10800;

const demands = [
  "Immediate action to reduce the pressure of fuel prices on households and businesses.",
  "Review fuel duty and other fuel-related taxation during periods of exceptional fuel-price increases.",
  "Greater transparency around fuel pricing from refinery to forecourt.",
  "Stronger monitoring of competition in the fuel retail market.",
  "Better support for people whose work depends on driving.",
  "Clearer public information about fuel prices, taxation and market conditions.",
];

const sources = [
  { name: "GOV.UK: Weekly road fuel prices (DESNZ)", url: "https://www.gov.uk/government/statistics/weekly-road-fuel-prices" },
  { name: "GOV.UK: Fuel Duty rates", url: "https://www.gov.uk/government/publications/amended-fuel-duty-rates-for-2026-to-2027/amended-fuel-duty-rates-2026-to-2027" },
  { name: "UK Parliament: Find your MP", url: "https://members.parliament.uk/FindYourMP" },
  { name: "RAC Fuel Watch", url: "https://www.rac.co.uk/drive/advice/fuel-watch/" },
];

function Stat({ label, figure, fromLive }: { label: string; figure: WeeklyFigure; fromLive: boolean }) {
  const dir = trendDirection(figure);
  const delta = figure.previous === null ? null : figure.current - figure.previous;
  return (
    <Card>
      <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold tabular-nums text-navy-900">
        {figure.current.toFixed(1)}
        <span className="ml-1 text-base font-bold text-charcoal-500">p/litre</span>
      </p>
      <p className="mt-2 text-sm text-charcoal-700">
        {delta === null ? "No earlier week to compare" : `${trendArrow(dir)} ${delta > 0 ? "+" : delta < 0 ? "−" : "±"}${Math.abs(delta).toFixed(1)}p vs ${figure.previousDataPeriod.replace(/^Week/, "week")}`}
      </p>
      <p className="mt-1 text-xs text-charcoal-500">
        {figure.dataPeriod} · {fromLive ? "Updated" : "Last updated"} {formatDate(figure.lastUpdated)}
      </p>
    </Card>
  );
}

function ExternalIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default async function TakeActionPage() {
  const { figures, fromLiveSource } = await getLatestUkWeeklyAverage();

  // Duty is picked by date, so a confirmed change becomes "current" on the day it takes effect.
  const today = new Date().toISOString().slice(0, 10);
  const dated = fuelDutyTimeline.filter((e) => e.ratePencePerLitre !== null).sort((a, b) => a.date.localeCompare(b.date));
  const duty = [...dated].reverse().find((e) => e.date <= today);
  const nextDuty = dated.find((e) => e.date > today && e.ratePencePerLitre !== duty?.ratePencePerLitre);

  return (
    <>
      <section className="bg-navy-950 py-14 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            tone="dark"
            eyebrow="Take Action"
            title="Fuel Prices Are Affecting Everyone. It's Time to Be Heard."
            description="Fuel costs affect commuters, families, delivery drivers, tradespeople, businesses and anyone who depends on a vehicle. This page explains how you can raise your concerns and take part in peaceful civic action."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="#register" size="lg" className="min-h-12">
              Join the Campaign
            </LinkButton>
            <LinkButton href="#contact-mp" variant="outline-light" size="lg" className="min-h-12">
              Contact Your MP
            </LinkButton>
            <LinkButton href="/planned-protest" variant="outline-light" size="lg" className="min-h-12">
              Planned Protest <span aria-hidden="true">→</span>
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-200 bg-white py-6">
        <Container>
          <IndependenceNotice className="max-w-3xl" />
        </Container>
      </section>

      <section id="current" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Current data"
            title="The Fuel Price Situation Now"
            description="Weekly UK averages from the official GOV.UK / DESNZ series. These are weekly national averages, not real-time pump prices."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat label="Petrol average" figure={figures.petrol} fromLive={fromLiveSource} />
            <Stat label="Diesel average" figure={figures.diesel} fromLive={fromLiveSource} />
            <Card>
              <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Fuel Duty rate</p>
              <p className="mt-2 text-3xl font-extrabold tabular-nums text-navy-900">
                {duty?.ratePencePerLitre?.toFixed(2)}
                <span className="ml-1 text-base font-bold text-charcoal-500">p/litre</span>
              </p>
              <p className="mt-2 text-sm text-charcoal-700">
                {nextDuty ? `Confirmed to change to ${nextDuty.ratePencePerLitre?.toFixed(2)}p from ${formatDate(nextDuty.date)}.` : "No further change currently confirmed."}
              </p>
              <p className="mt-1 text-xs text-charcoal-500">In force since {duty ? formatDate(duty.date) : "—"}</p>
            </Card>
          </div>
          <FuelPricesUpdated className="mt-4" />
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-charcoal-600">
            <StatusBadge status={fromLiveSource ? "latest-available" : "historical"} />
            <span>
              Source:{" "}
              <a href={desnzWeeklySource.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
                {desnzWeeklySource.name}
              </a>
              {" · "}
              <a href={duty?.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
                GOV.UK Fuel Duty rates
              </a>
            </span>
          </div>
          {!fromLiveSource ? (
            <Alert tone="warning" className="mt-4">
              The official source could not be reached just now, so these are the most recent figures we verified, shown as &quot;Last updated&quot; and not as current.
            </Alert>
          ) : null}
          <p className="mt-3 text-xs text-charcoal-500">
            Historical prices are kept separate on our{" "}
            <a href="/fuel-prices-through-time" className="font-semibold text-petrol-600 underline underline-offset-2">
              Fuel Prices Through Time
            </a>{" "}
            page and are never mixed with the figures above.
          </p>
        </Container>
      </section>

      <section id="money" className="scroll-mt-24 bg-slate-50 py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Where the money goes"
            title="What Makes Up the Pump Price"
            description="Wholesale cost, Fuel Duty, VAT and retailer margin. Each breakdown below carries its own date and sources."
          />
          <div className="mt-8">
            <PumpPriceBreakdownVisual />
          </div>
        </Container>
      </section>

      <section id="demands" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <Container>
          <SectionHeading eyebrow="Campaign" title="What We Are Calling For" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {demands.map((d) => (
              <li key={d} className="flex items-start gap-3 rounded border border-slate-200 bg-white p-4 text-sm leading-relaxed text-charcoal-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-petrol-500" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-charcoal-600">
            These are FCE&apos;s requests, not government policy.{" "}
            <a href="/our-demands" className="font-semibold text-petrol-600 underline underline-offset-2">
              Read the evidence behind each one
            </a>
            .
          </p>
        </Container>
      </section>

      <section id="evidence" className="scroll-mt-24 bg-slate-50 py-14 sm:py-16">
        <Container>
          <SectionHeading eyebrow="Check the evidence" title="Check the figures yourself" description="Every figure is linked to its original source and labelled as official data, a calculation or an estimate." />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/live-fuel-prices" variant="secondary" size="lg" className="min-h-12">
              Live fuel prices
            </LinkButton>
            <LinkButton href="/follow-the-money" variant="secondary" size="lg" className="min-h-12">
              Follow the money
            </LinkButton>
            <LinkButton href="/sources" variant="secondary" size="lg" className="min-h-12">
              Sources &amp; methodology
            </LinkButton>
          </div>
        </Container>
      </section>

      <div id="news" className="scroll-mt-24">
        <LatestNewsPreview count={3} />
      </div>

      <section id="contact-mp" className="scroll-mt-24 bg-slate-50 py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Raise it directly"
            title="Contact Your MP"
            description="Your MP can raise fuel prices with the Government. Find who represents you, then adapt the message below. We do not send or collect messages."
          />
          <div className="mt-6">
            <LinkButton href="https://members.parliament.uk/FindYourMP" size="lg" className="min-h-12">
              Find Your MP <ExternalIcon />
            </LinkButton>
          </div>
          <Card className="mt-6 max-w-3xl">
            <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-charcoal-700">{mpMessageTemplate}</pre>
            <div className="mt-4">
              <CopyTextButton text={mpMessageTemplate} label="Copy message" />
            </div>
          </Card>
        </Container>
      </section>

      <section id="petition" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <Container>
          <SectionHeading eyebrow="Add your voice" title="Sign the FCE petition" />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-700">
            FCE&apos;s petition calls for transparency and answers on fuel affordability. It is Fuel Crisis England&apos;s own petition, not an official UK
            Parliament petition, and signing it does not guarantee any particular outcome.
          </p>
          <div className="mt-5 max-w-md">
            <PetitionCounter tone="light" />
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={petitionPath} size="lg" className="min-h-12">
              Sign FCE&apos;s petition
            </LinkButton>
            <LinkButton href="/have-your-say#uk-petitions" variant="secondary" size="lg" className="min-h-12">
              Official UK Parliament petitions
            </LinkButton>
          </div>
          <div className="mt-10 border-t border-slate-200 pt-8">
            <h3 className="text-xl font-extrabold text-navy-900">Have your say</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal-700">Leave a public comment. Comments are moderated before they appear.</p>
            <div className="mt-4">
              <LinkButton href="/have-your-say" variant="secondary" size="lg" className="min-h-12">
                Have your say <span aria-hidden="true">→</span>
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>

      <section id="protest" className="scroll-mt-24 bg-slate-50 py-14 sm:py-16">
        <Container>
          <SectionHeading eyebrow="Peaceful civic action" title="Peaceful civic participation" />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-700">
            We are currently planning a peaceful and lawful public demonstration to raise awareness of fuel costs and their impact on households, workers and businesses. Status: {plannedProtest.status}. Date, time and location: to be announced.
          </p>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-relaxed text-navy-900">
            Any demonstration should remain peaceful, lawful and respectful of other road users, residents, emergency services and the wider community.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/planned-protest" size="lg" className="min-h-12">
              Planned Protest <span aria-hidden="true">→</span>
            </LinkButton>
            <LinkButton href="/make-a-change#peaceful-protest" variant="secondary" size="lg" className="min-h-12">
              Peaceful protest guidance <span aria-hidden="true">→</span>
            </LinkButton>
          </div>
        </Container>
      </section>

      <section id="register" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <Container>
          <SectionHeading eyebrow="Stay informed" title="Register Your Interest" />
          <div className="mt-8 max-w-2xl">
            <InterestForm />
            <p className="mt-6 text-sm text-charcoal-700">Prefer to get in touch directly?</p>
            <ContactDetails className="mt-1 text-sm" />
          </div>
        </Container>
      </section>

      <section id="share" className="scroll-mt-24 bg-slate-50 py-14 sm:py-16">
        <Container>
          <SectionHeading eyebrow="Share" title="Help Spread the Word" />
          <div className="mt-6">
            <ShareButtons />
          </div>
        </Container>
      </section>

      <section id="contact" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <Container>
          <SectionHeading eyebrow="Get in touch" title="Contact Fuel Crisis England" description="Have a question, want to get involved, or want updates about planned campaign activity? Contact Fuel Crisis England." />
          <ContactDetails className="mt-5 text-base" />
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={siteConfig.contact.phoneHref} size="lg" className="min-h-12">
              Call Us
            </LinkButton>
            <LinkButton href={`mailto:${siteConfig.contact.email}`} variant="secondary" size="lg" className="min-h-12">
              Email Us
            </LinkButton>
          </div>
        </Container>
      </section>

      <section id="sources" className="scroll-mt-24 bg-slate-50 py-14 sm:py-16">
        <Container>
          <SectionHeading eyebrow="Transparency" title="Sources & Methodology" />
          <ul className="mt-6 space-y-2 text-sm">
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
                  {s.name} <ExternalIcon />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-charcoal-700">
            Fuel prices are weekly UK averages from GOV.UK / DESNZ, fetched automatically; Fuel Duty comes from GOV.UK and legislation.gov.uk. News links go to the original publishers. Full methodology is on our{" "}
            <a href="/sources" className="font-semibold text-petrol-600 underline underline-offset-2">
              Sources &amp; Methodology
            </a>{" "}
            page.
          </p>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-navy-900">
            {siteConfig.independence.full} Linking to an organisation&apos;s information or news coverage does not mean it endorses, or is affiliated with, Fuel Crisis England.
          </p>
        </Container>
      </section>









      <PetitionBanner variant="crowd" />
    </>
  );
}
