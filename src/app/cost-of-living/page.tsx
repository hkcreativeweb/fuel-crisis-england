import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { FuelCostCalculator } from "@/components/calculator/FuelCostCalculator";
import { impactGroups } from "@/lib/data/impact-groups";
import { imageCredits } from "@/lib/data/image-credits";

export const metadata: Metadata = {
  title: "Cost-of-Living Impact",
  description: "How rising petrol and diesel prices affect families, commuters, delivery drivers, tradespeople, small businesses, and rural communities across England.",
};

const credit = imageCredits["commute-traffic"];

export default function ImpactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-14 sm:py-16">
        <div className="absolute inset-0">
          <Image src={credit.src} alt={credit.alt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-navy-950/78" />
        </div>
        <Container className="relative">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-cost">Real impact</p>
          <div className="mb-5 h-px w-12 bg-white/20" aria-hidden="true" />
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">How fuel prices affect people</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">
            Fuel costs aren&apos;t an abstract statistic — they shape household budgets, working hours, and
            business margins across England.
          </p>
          <PhotoCredit credit={credit} className="mt-10" />
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <Container>
          <SectionHeading number="04" eyebrow="Who this affects" title="Eight groups, one shared exposure" rule />
          <div className="mt-10 divide-y divide-slate-200 border-t border-slate-200">
            {impactGroups.map((group, i) => (
              <div key={group.title} className="grid gap-2 py-7 sm:grid-cols-[2.5rem_1fr_1.4fr] sm:gap-8">
                <p className="text-sm font-bold tabular-nums text-charcoal-400">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="text-lg font-bold text-navy-900">{group.title}</h2>
                <div>
                  <p className="text-sm leading-relaxed text-charcoal-700">{group.summary}</p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-500 italic">{group.example}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="calculator" className="scroll-mt-24 bg-slate-50 py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Work it out"
            title="Fuel cost calculator"
            description="Enter your miles per week, your vehicle's fuel economy, the fuel price, and the number of weeks to estimate your costs."
          />
          <div className="mt-8 max-w-3xl">
            <FuelCostCalculator />
          </div>
        </Container>
      </section>
    </>
  );
}
