import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Alert } from "@/components/ui/Alert";
import { LinkButton } from "@/components/ui/Button";
import { priceFactors } from "@/lib/data/price-factors";

export const metadata: Metadata = {
  title: "Why Are Prices Rising?",
  description: "A plain-English, fact-based explanation of the factors behind petrol and diesel prices: crude oil, refining, duty, VAT, exchange rates, and more.",
};

export default function WhyPricesRisingPage() {
  return (
    <>
      <section className="bg-navy-950 py-14 sm:py-16">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Understand the issue"
            title="Why are fuel prices rising?"
            description="Petrol and diesel prices are shaped by a chain of factors, from global oil markets to the tax and margin added at the pump. Here's each one explained in plain English."
          />
        </Container>
      </section>

      <section className="bg-white py-10">
        <Container>
          <Alert tone="info" title="What's verified fact, research, or opinion?">
            The explanations below describe well-established, verified mechanisms in energy and fuel
            markets — how crude oil, refining, tax, and competition generally affect pump prices. They
            are not a substitute for official statistics. Where we reference specific figures (such as
            fuel duty or VAT rates), we only publish them once verified against an official source — see
            our{" "}
            <Link href="/fuel-duty-and-tax" className="font-semibold text-petrol-600 underline underline-offset-2">
              Fuel Duty &amp; Tax page
            </Link>
            . Any commentary that goes beyond established fact is a campaign view, not an official
            finding, and is presented as such.
          </Alert>
        </Container>
      </section>

      <section className="bg-white pb-16 pt-4 sm:pb-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {priceFactors.map((factor) => (
              <div key={factor.slug} id={factor.slug} className="scroll-mt-24 rounded border border-slate-200 p-7">
                <h2 className="text-xl font-bold text-navy-900">{factor.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-700">{factor.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-charcoal-900 py-14 sm:py-16">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Want the tax breakdown specifically?</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              Fuel duty and VAT are two of the biggest single factors in what you pay per litre. See the dedicated page for verified figures.
            </p>
          </div>
          <LinkButton href="/fuel-duty-and-tax" size="lg">
            Fuel Duty &amp; Tax page
          </LinkButton>
        </Container>
      </section>
    </>
  );
}
