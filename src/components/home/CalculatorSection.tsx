import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FuelCostCalculator } from "@/components/calculator/FuelCostCalculator";

export function CalculatorSection() {
  return (
    <section id="calculator" className="scroll-mt-24 border-y border-slate-200 bg-slate-50 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What changes when the price changes?"
          title="What happens when the price changes by just 10p?"
          description="Try it yourself. Enter your own mileage and fuel economy, then see what a 10p per litre change means for your year."
        />
        <div className="mt-10 max-w-4xl">
          <FuelCostCalculator showPriceChangeEffect />
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
