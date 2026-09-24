import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { HeroFuelDataStrip } from "@/components/home/HeroFuelDataStrip";
import { getLatestUkWeeklyAverage } from "@/lib/data/desnz-weekly-prices";
import { imageCredits } from "@/lib/data/image-credits";

const credit = imageCredits["forecourt-close"];

const manifestoLines: { lead: string; rest: string }[] = [
  { lead: "Save", rest: "fuel." },
  { lead: "Save", rest: "money." },
  { lead: "Follow", rest: "the money." },
  { lead: "Demand", rest: "accountability." },
];

const exploreLinks: { label: string; href: string }[] = [
  { label: "Understand the price.", href: "/live-fuel-prices" },
  { label: "Understand the costs.", href: "/why-is-fuel-expensive" },
  { label: "Understand the tax.", href: "/fuel-duty-and-tax" },
  { label: "Understand the supply chain.", href: "/why-is-fuel-expensive#one-litre" },
  { label: "Understand the impact.", href: "/cost-of-living" },
  { label: "Check the evidence.", href: "/sources" },
  { label: "Ask the questions.", href: "/ask-your-mp" },
];

export async function Hero() {
  const { figures: ukWeekly } = await getLatestUkWeeklyAverage();
  return (
    <section className="border-b border-slate-200 bg-background">
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-petrol-600">FCE: Fuel Crisis England</p>
          <div className="mt-3 h-px w-12 bg-navy-900/20" aria-hidden="true" />
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-navy-900 sm:text-5xl lg:text-[3.1rem]">
            Fuel isn&apos;t just a number on a pump.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-charcoal-700">
            Every litre has a story. Follow the oil, costs, taxes and decisions behind the price you
            pay, and check the figures for yourself.
          </p>

          <HeroFuelDataStrip ukWeekly={ukWeekly} />

          <div className="relative mt-8 aspect-[16/10] max-w-lg overflow-hidden">
            <Image src={credit.src} alt={credit.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <PhotoCredit credit={credit} tone="light" className="mt-2 max-w-lg" />
        </div>

        <div className="lg:border-l lg:border-petrol-500/15 lg:pl-12">
          <div className="space-y-0.5">
            {manifestoLines.map((line) => (
              <p
                key={line.rest}
                className="text-2xl font-extrabold uppercase leading-[1.15] tracking-tight text-navy-900 sm:text-3xl lg:text-2xl xl:text-3xl"
              >
                <span className="text-petrol-500">{line.lead}</span> {line.rest}
              </p>
            ))}
          </div>

          <div className="mt-8 h-px w-full bg-slate-200" aria-hidden="true" />

          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal-500">Start exploring</p>
          <nav aria-label="Explore Fuel Crisis England" className="mt-3">
            <ul className="border-t border-slate-200">
              {exploreLinks.map((item) => (
                <li key={item.href} className="border-b border-slate-200">
                  <Link href={item.href} className="group flex items-center justify-between gap-4 py-3.5">
                    <span className="text-[15px] font-medium text-navy-800 transition-all duration-200 group-hover:font-semibold group-hover:text-petrol-600 group-hover:underline group-hover:decoration-petrol-500 group-hover:decoration-[1.5px] group-hover:underline-offset-4">
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 -translate-x-1 text-lg text-charcoal-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-petrol-500 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#explore-evidence"
            className="group mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-charcoal-500 transition-colors hover:text-petrol-600"
          >
            Explore the evidence
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
