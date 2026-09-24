import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { EVComparisonCalculator } from "@/components/ev/EVComparisonCalculator";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { imageCredits } from "@/lib/data/image-credits";

export const metadata: Metadata = {
  title: "Traditional Fuel vs Electric",
  description: "Is an electric car actually cheaper to run? An interactive calculator comparing petrol/diesel and electric ownership costs, based on your own assumptions.",
};

const credit = imageCredits["ev-charging-hub"];

const iceMaintenance = ["Engine oil & oil filter", "Air filters", "Spark plugs (petrol)", "Exhaust & emissions components", "Timing belt/chain", "Gearbox servicing", "Brakes", "Tyres"];
const evMaintenance = ["Tyres", "Brakes (often lower wear, regenerative braking)", "Suspension", "Cabin filter", "Coolant/service items", "Battery health & warranty checks"];

export default function FuelVsElectricPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="absolute inset-0">
          <Image src={credit.src} alt={credit.alt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-navy-950/80" />
        </div>
        <Container className="relative">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-petrol-300">Traditional Fuel vs Electric</p>
          <div className="mb-5 h-px w-12 bg-white/20" aria-hidden="true" />
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">Is an electric car actually cheaper to run?</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            We don&apos;t answer that for you. Enter your own numbers below and see the difference for
            yourself, purchase price included, not just fuel versus charging.
          </p>
          <p className="mt-4 max-w-2xl text-sm font-semibold text-slate-200">
            Different drivers, different answers. The result depends on your mileage, tariff and car.
          </p>
          <PhotoCredit credit={credit} className="mt-10" />
        </Container>
      </section>

      <section className="bg-slate-50 py-14 sm:py-20">
        <Container>
          <EVComparisonCalculator />
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <SectionHeading eyebrow="Running costs beyond fuel" title="Maintenance" description="Maintenance requirements differ by vehicle, mileage and manufacturer. Neither list is exhaustive, and EVs are not maintenance-free." rule number="01" />
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Petrol / diesel, typically includes</p>
              <ul className="mt-3 space-y-2 text-sm text-charcoal-700">
                {iceMaintenance.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-navy-900" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-petrol-600">Electric, typically includes</p>
              <ul className="mt-3 space-y-2 text-sm text-charcoal-700">
                {evMaintenance.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-petrol-500" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-charcoal-700">
            Enter your own maintenance estimate in the calculator&apos;s advanced settings rather than
            relying on a generic figure. Your actual costs depend on the specific vehicle, its age, and how
            it&apos;s driven.
          </p>
        </Container>
      </section>

      <section className="bg-slate-50 py-14 sm:py-16">
        <Container>
          <SectionHeading eyebrow="How the calculation works" title="Methodology" rule number="02" />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-charcoal-700">
            Total ownership cost is purchase price plus running costs (energy, maintenance, insurance and
            tax) multiplied by the ownership period. Running costs depend on annual mileage, efficiency
            (mpg or kWh/100 miles), energy prices, and your home/public charging mix. Every figure shown is
            calculated directly from your inputs with no hidden adjustments. Change any input and the
            results, chart and break-even point update immediately.
          </p>
          <div className="mt-6">
            <LinkButton href="/sources" variant="secondary">
              Sources &amp; methodology
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
