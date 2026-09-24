import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Alert } from "@/components/ui/Alert";

const affected = [
  "Food deliveries",
  "Supermarket prices",
  "Parcels and online shopping",
  "Tradespeople",
  "Taxi drivers",
  "Delivery drivers",
  "Commuters",
  "School and family journeys",
  "Public transport operating costs",
  "Business expenses",
  "Heating and energy costs",
  "Household budgets",
];

const chain = [
  "Higher fuel costs",
  "Higher delivery and transport costs",
  "Higher business operating costs",
  "Higher prices for goods and services",
  "More pressure on households",
  "Less disposable income",
];

export function FuelIsNotJustAFuelProblem() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Beyond the forecourt"
          title="When fuel costs rise, the impact travels further"
          description="When petrol and diesel become more expensive, the impact does not stop at the pump. Higher transport costs can ripple outward into daily life."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {affected.map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-3.5 py-1.5 text-sm font-medium text-charcoal-700">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-10 rounded border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">The knock-on effect</p>
          <div className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            {chain.map((step, i) => (
              <div key={step} className="flex items-center gap-2 sm:gap-3">
                <div className="rounded-md border border-petrol-200 bg-white px-4 py-3 text-center text-sm font-semibold text-navy-900 sm:w-44">
                  {step}
                </div>
                {i < chain.length - 1 ? (
                  <span aria-hidden="true" className="rotate-90 text-lg font-bold text-petrol-500 sm:rotate-0">
                    &rarr;
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Alert tone="warning" title="The exact effect varies by industry and circumstance.">
            This chain describes a general economic mechanism, not a fixed rule — the actual impact on any
            specific price or business depends on many factors. Claims about inflation, transport costs,
            and household budgets on this site are drawn from ONS and other official statistics, cited
            inline.
          </Alert>
        </div>
      </Container>
    </section>
  );
}
