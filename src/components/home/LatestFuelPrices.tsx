import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FuelPricesUpdated } from "@/components/ui/FuelPricesUpdated";
import { InternationalContext, UkPriceCards } from "@/components/home/HeroFuelDataStrip";
import { getLatestUkWeeklyAverage } from "@/lib/data/desnz-weekly-prices";

/** The first section after the hero: live UK petrol and diesel, then the secondary US benchmark. */
export async function LatestFuelPrices() {
  const { figures } = await getLatestUkWeeklyAverage();
  return (
    <section id="latest-prices" className="scroll-mt-24 border-b border-slate-200 bg-white py-8 sm:py-14">
      <Container>
        <SectionHeading eyebrow="Now" title="Latest fuel prices" description="Latest available UK pump-price data from GOV.UK / DESNZ." />
        <div className="mt-6">
          <UkPriceCards ukWeekly={figures} />
        </div>
        <FuelPricesUpdated className="mt-4 max-w-2xl" />
        <Link href="/live-fuel-prices#this-week" className="group mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-petrol-600">
          See what&apos;s changed this week
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
        <InternationalContext />
      </Container>
    </section>
  );
}
