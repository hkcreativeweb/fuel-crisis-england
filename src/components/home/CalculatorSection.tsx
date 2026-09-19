import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FuelCostCalculator } from "@/components/calculator/FuelCostCalculator";

export function CalculatorSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="See it in numbers"
          title="What does fuel really cost you?"
          description="Enter your own driving details to estimate your weekly, monthly, and annual fuel spend."
        />
        <div className="mt-8 max-w-3xl">
          <FuelCostCalculator />
        </div>
      </Container>
    </section>
  );
}
