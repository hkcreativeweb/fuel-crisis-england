import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Alert } from "@/components/ui/Alert";
import { LinkButton } from "@/components/ui/Button";
import { LiveIndicatorCard } from "@/components/live/LiveIndicatorCard";
import { YearInProgressCard } from "@/components/live/YearInProgressCard";
import { LocalPriceVariation } from "@/components/live/LocalPriceVariation";
import { FollowTheMoneyFlow } from "@/components/money-flow/FollowTheMoneyFlow";
import { liveIndicators } from "@/lib/data/live-snapshot";

export const metadata: Metadata = {
  title: "Live Fuel Prices",
  description: "What is happening now: live and latest-available UK fuel prices, tax rates, wages, and economic indicators — each clearly labelled with its exact data period, geography and source.",
};

export default function LiveFuelPricesPage() {
  return (
    <>
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-live/40 bg-accent-live/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-live">
            <span className="h-2 w-2 rounded-full bg-accent-live" aria-hidden="true" /> NOW
          </p>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">Live Fuel Prices</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            What is happening right now — not an annual average, not a historical figure. Every number
            below is either a genuine live snapshot or explicitly the latest published figure, labelled
            accordingly.
          </p>
          <div className="mt-8">
            <Alert tone="warning" title="A live figure is not a yearly figure.">
              A current petrol price tells you the price today — it does not tell you what 2026 will
              average across the whole year. For completed years and long-run trends, see{" "}
              <a href="/fuel-prices-through-time" className="font-semibold underline underline-offset-2">
                Fuel Prices Through Time
              </a>
              .
            </Alert>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="What is happening now" title="Live and latest-available indicators" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {liveIndicators.map((indicator) => (
              <LiveIndicatorCard key={indicator.id} indicator={indicator} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="2026 is not over yet" title="The year in progress" description="Three genuinely different things: today's price, the year-to-date average, and the full-year average. Only one of these exists right now." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <YearInProgressCard fuel="petrol" />
            <YearInProgressCard fuel="diesel" />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Where does your money go today?" title="Live Follow the Money" description="Uses today's verified pump price and current tax rates." />
          <div className="mt-10 max-w-2xl rounded-3xl border border-slate-200 bg-navy-950 p-6 sm:p-8">
            <FollowTheMoneyFlow defaultAmount={50} />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="An honest question" title="Why can two petrol stations charge different prices?" />
          <div className="mt-10">
            <LocalPriceVariation />
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-16 sm:py-20">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white">Want the long-run picture?</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              See how today compares with completed historical years, side by side.
            </p>
          </div>
          <LinkButton href="/fuel-prices-through-time" size="lg">
            Then vs Now
          </LinkButton>
        </Container>
      </section>
    </>
  );
}
