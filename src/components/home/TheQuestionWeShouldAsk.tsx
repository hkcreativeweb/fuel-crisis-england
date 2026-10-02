import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCard } from "@/components/ui/StatCard";
import { fuelDutyPenceOn } from "@/lib/data/pump-price-breakdown";

/**
 * Four figures that separate the policy-set part of the pump price from the
 * market part. The pump price is the live GOV.UK weekly average passed in
 * by the page (the same figure as the hero); the split is calculated from
 * the fixed Fuel Duty rate and 20% VAT.
 */
export function TheQuestionWeShouldAsk({ petrolPence, dataPeriod }: { petrolPence: number; dataPeriod: string }) {
  const duty = fuelDutyPenceOn(new Date().toISOString().slice(0, 10));
  const vat = petrolPence / 6; // 20% VAT is one-sixth of a VAT-inclusive price
  const tax = duty + vat;
  const market = petrolPence - tax;
  const share = (pence: number) => Math.round((pence / petrolPence) * 100);

  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="Policy and markets"
          title="The numbers behind the policy debate"
          description="How much of the current petrol price comes from tax, and how much is the remainder after tax?"
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
          <StatCard tone="light" label="Petrol" value={`${petrolPence.toFixed(1)}p/L`} caption={`UK average, ${dataPeriod.charAt(0).toLowerCase() + dataPeriod.slice(1)}`} />
          <StatCard tone="light" label="Fuel Duty + VAT" value={`${tax.toFixed(1)}p/L`} caption={`about ${share(tax)}% (calculated: Fuel Duty ${duty}p plus VAT)`} />
          <StatCard tone="light" label="Remaining price" value={`${market.toFixed(1)}p/L`} caption={`about ${share(market)}% (calculated remainder)`} />
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-charcoal-700">
          These figures are calculated from the published pump price (GOV.UK / DESNZ) and tax rates. The remainder is not a measure of industry profit. See the{" "}
          <a href="/follow-the-money" className="-my-3 inline-block py-3 font-semibold text-petrol-600 underline underline-offset-2">
            full breakdown and sources
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
