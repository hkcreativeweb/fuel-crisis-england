import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FuelCostCalculator, type LiveFuelPrices } from "@/components/calculator/FuelCostCalculator";

export function CalculatorSection({ prices }: { prices: LiveFuelPrices }) {
  return (
    <section id="calculator" className="scroll-mt-24 border-y border-slate-200 bg-slate-50 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What changes when the price changes?"
          title="How much does fuel cost you?"
          description="Enter your miles and your car's fuel economy. See your cost per week, month and year, and what a 10p rise would add."
        />
        <div className="mt-10 max-w-4xl">
          <FuelCostCalculator prices={prices} />
        </div>
        <div className="mt-8">
          <LinkButton href="/save-fuel-money" variant="secondary" className="min-h-12">
            Ways to cut your fuel cost
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
