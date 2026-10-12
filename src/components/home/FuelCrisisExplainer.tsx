import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";

/**
 * The campaign's core idea in plain words, kept short for the homepage. The fuller version, with the tax diagram,
 * is on /about#fuel-crisis.
 */
export function FuelCrisisExplainer() {
  return (
    <section id="what-is-a-fuel-crisis" className="scroll-mt-24 border-b border-slate-200 bg-slate-50 py-10 sm:py-14">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
          <div>
            <SectionHeading eyebrow="Our campaign" title="What do we mean by a fuel crisis?" />
            <p className="mt-4 text-base leading-relaxed text-charcoal-700">
              A fuel crisis is not just about running out of petrol or diesel. It is also about what happens when fuel becomes too expensive for ordinary people to afford.
            </p>
            <p className="mt-3 text-base leading-relaxed text-charcoal-700">
              For commuters, families, delivery drivers, tradespeople and small businesses, fuel can be an essential expense rather than an optional purchase. Even when fuel is available, rising prices put pressure on household budgets, work and everyday life.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/about#fuel-crisis" className="min-h-12">
                Read the full explanation <span aria-hidden="true">→</span>
              </LinkButton>
              <LinkButton href="/fuel-duty-and-tax#pump-price-factors" variant="secondary" className="min-h-12">
                What is in the pump price?
              </LinkButton>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-charcoal-700">
              The price at the pump reflects several things: international oil prices, refining and distribution costs, retailer margins and government taxation. Fuel Duty and VAT are important parts of the tax picture, and government decisions can influence what motorists pay.
            </p>
            <p className="mt-4 border-l-4 border-petrol-500 pl-4 text-base font-bold leading-snug text-navy-900">
              Finding a cheaper petrol station helps, but it does not solve the wider affordability problem.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-charcoal-600">
              Fuel Crisis England campaigns for practical action on fuel affordability, fairer outcomes for motorists and greater transparency about fuel prices and taxation. See{" "}
              <Link href="/our-demands" className="font-semibold text-petrol-600 underline underline-offset-2">
                our policy demands
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
