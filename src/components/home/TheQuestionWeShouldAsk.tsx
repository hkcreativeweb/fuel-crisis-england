import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCard } from "@/components/ui/StatCard";
import { fuelDutyReceiptsFullYear } from "@/lib/data/hmrc-receipts";
import { petrolPumpPriceBreakdown } from "@/lib/data/pump-price-breakdown";

/**
 * Four figures that separate the policy-set part of the pump price from the
 * market part. The pump price is the live GOV.UK weekly average passed in
 * by the page (the same figure as the hero); the split is calculated from
 * the fixed Fuel Duty rate and 20% VAT.
 */
export function TheQuestionWeShouldAsk({ petrolPence, dataPeriod }: { petrolPence: number; dataPeriod: string }) {
  const duty = petrolPumpPriceBreakdown.components.find((c) => c.label.startsWith("Fuel duty"))?.approxPencePerLitre ?? 0;
  const vat = petrolPence / 6; // 20% VAT is one-sixth of a VAT-inclusive price
  const tax = duty + vat;
  const market = petrolPence - tax;
  const share = (pence: number) => Math.round((pence / petrolPence) * 100);

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Policy and markets"
          title="The numbers behind the policy debate"
          description="How much of the pump price is shaped by policy, and how much by markets? Explore the figures and decide for yourself."
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4">
          <StatCard tone="light" label="Average petrol price" value={`${petrolPence.toFixed(1)}p`} caption={`per litre, UK, ${dataPeriod.charAt(0).toLowerCase() + dataPeriod.slice(1)}`} />
          <StatCard tone="light" label="Set by policy" value={`${tax.toFixed(1)}p`} caption={`about ${share(tax)}%: Fuel Duty ${duty}p plus VAT (calculated)`} />
          <StatCard tone="light" label="Set by markets and retailers" value={`${market.toFixed(1)}p`} caption={`about ${share(market)}%: oil, refining, delivery and retail (calculated remainder)`} />
          <StatCard tone="light" label="Fuel Duty receipts" value={`£${fuelDutyReceiptsFullYear.amountGBP}bn`} caption={fuelDutyReceiptsFullYear.periodLabel} />
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-charcoal-700">
          Petrol price from GOV.UK / DESNZ; receipts from HMRC. The split between tax and market costs is our
          calculation from those figures. See the{" "}
          <a href="/follow-the-money" className="-my-3 inline-block py-3 font-semibold text-petrol-600 underline underline-offset-2">
            full breakdown and sources
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
