import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Alert } from "@/components/ui/Alert";
import { fuelDutyFigure, vatOnFuelFigure, type TaxFigure } from "@/lib/data/tax-info";
import { PolicyTimeline } from "@/components/money-flow/PolicyTimeline";
import { FuelDutyHistoryTable } from "@/components/money-flow/FuelDutyHistoryTable";

export const metadata: Metadata = pageMetadata("/fuel-duty-and-tax", {
  title: "Fuel Duty & Tax",
  description: "What fuel duty and VAT are, how they affect the price per litre, and the difference between a fixed tax and a percentage-based tax.",
});

function TaxFigureCard({ figure }: { figure: TaxFigure }) {
  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <p className="text-sm font-semibold text-charcoal-600">{figure.label}</p>
      {figure.verified && figure.value ? (
        <>
          <p className="mt-3 text-3xl font-extrabold tabular-nums text-navy-900">{figure.value}</p>
          {figure.effectiveFrom ? <p className="mt-1 text-xs text-charcoal-600">{figure.effectiveFrom}</p> : null}
          {figure.sourceName && figure.sourceUrl ? (
            <a href={figure.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs font-semibold text-petrol-600 underline underline-offset-2">
              Source: {figure.sourceName}
            </a>
          ) : null}
        </>
      ) : (
        <p className="mt-3 text-sm font-medium text-amber-800">
          Current tax figures will be added once verified against official sources.
        </p>
      )}
    </div>
  );
}

export default function FuelDutyAndTaxPage() {
  return (
    <>
      <section className="bg-navy-950 py-14 sm:py-16">
        <Container>
          <SectionHeading as="h1"
            tone="dark"
            eyebrow="Tax and duty"
            title="Fuel duty and VAT, explained"
            description="Two separate taxes are built into every litre of fuel you buy. Here's what they are and how they differ."
          />
        </Container>
      </section>

      <section className="bg-slate-50 py-14 sm:py-16">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            <TaxFigureCard figure={fuelDutyFigure} />
            <TaxFigureCard figure={vatOnFuelFigure} />
          </div>
          <div className="mt-6">
            {fuelDutyFigure.verified && vatOnFuelFigure.verified ? (
              <Alert tone="success" title="These figures are verified.">
                We publish current fuel duty and VAT rates only once checked against an official source
                such as GOV.UK or HM Treasury. Both figures above are cited directly. If a rate changes,
                we do not invent an updated number. The card reverts to a clear placeholder until the new
                rate is verified.
              </Alert>
            ) : (
              <Alert tone="warning" title="We do not invent tax figures.">
                We publish current fuel duty and VAT rates only once verified against an official source
                such as GOV.UK or HM Treasury. Until then, the cards above show a clear placeholder rather
                than a guessed number.
              </Alert>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-navy-900">What is fuel duty?</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-700">
                Fuel duty is a tax charged by the UK Government on every litre of petrol and diesel sold.
                It is a <strong>fixed amount per litre</strong>, set in pence rather than as a percentage, so
                you pay the same duty on a litre of fuel whether the underlying price is high or low.
                Because it&apos;s fixed, fuel duty makes up a larger share of the total price when fuel is
                cheap, and a smaller share when fuel is expensive.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy-900">What is VAT?</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-700">
                Value Added Tax (VAT) is charged as a <strong>percentage of the total fuel price,
                including fuel duty</strong>. This means VAT is applied on top of duty, not the other way
                round. Because it&apos;s percentage-based, the amount of VAT you pay rises and falls in line
                with the underlying price of fuel.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded border border-slate-200 bg-slate-50 p-7">
            <h2 className="text-lg font-bold text-navy-900">Fixed tax vs percentage-based tax</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-bold text-navy-900">Fuel duty (fixed per litre)</p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                  A set number of pence charged on every litre, regardless of price. If the fuel price
                  falls, fuel duty stays the same, so it becomes a bigger proportion of what you pay.
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-navy-900">VAT (percentage-based)</p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                  A percentage of the fuel price plus duty. If the fuel price rises, the amount of VAT
                  you pay rises too, because it&apos;s calculated as a share of a larger number.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-bold text-navy-900">Calculating the tax component</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-charcoal-700">
              Using the verified rates above: fuel duty is a flat 52.95 pence on every litre. VAT is then
              charged at 20% on the fuel price <em>including</em> that duty. For example, on a litre
              priced at 172.0p (petrol, 21 September 2026): the pre-VAT price is 172.0p ÷ 1.2 ≈ 143.3p, so
              VAT is roughly 28.7p. Added to the 52.95p duty, tax makes up around 82p of that litre,
              close to half the total pump price. See our{" "}
              <Link href="/follow-the-money#pump-price-breakdown" className="font-semibold text-petrol-600 underline underline-offset-2">
                full pump price breakdown
              </Link>{" "}
              for the complete picture, including wholesale cost and retailer margin.
            </p>
          </div>
        </Container>
      </section>

      <section id="timeline" className="scroll-mt-24 bg-navy-950 py-14 sm:py-16">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Fuel Duty is a policy choice, not a fixed law"
            title="The current era: 2022 to today"
            description="Fuel Duty rates since the Spring Statement 2022 cut, including confirmed future changes."
          />
          <div className="mt-10 max-w-3xl">
            <PolicyTimeline />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-14 sm:py-16">
        <Container>
          <SectionHeading eyebrow="The full picture" title="Fuel Duty since 1989" description="Every verified rate change from the modern duty structure's introduction to the start of the current era." />
          <div className="mt-10">
            <FuelDutyHistoryTable />
          </div>
        </Container>
      </section>
    </>
  );
}
