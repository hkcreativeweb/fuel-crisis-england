import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { liveIndicators } from "@/lib/data/live-snapshot";
import { imageCredits } from "@/lib/data/image-credits";
import { formatDate } from "@/lib/utils";

const petrol = liveIndicators.find((i) => i.id === "petrol-price")!;
const credit = imageCredits["forecourt-close"];

export function Hero() {
  return (
    <section className="border-b border-slate-200 bg-background">
      <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-petrol-600">FCE — Fuel Crisis England</p>
          <div className="mt-3 h-px w-12 bg-navy-900/20" aria-hidden="true" />
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight text-navy-900 sm:text-5xl lg:text-[3.4rem]">
            Fuel isn&apos;t just a number on a pump.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-charcoal-700">
            Follow the money from crude oil to the forecourt, and see what happens to your household
            budget — with every figure traced to its source.
          </p>

          <div className="mt-8 border-t border-slate-200 pt-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-live">
              <span className="mr-1.5 inline-block h-[6px] w-[6px] rounded-full bg-accent-live align-middle" aria-hidden="true" />
              Latest UK petrol
            </p>
            <p className="mt-1.5 text-5xl font-extrabold tabular-nums text-navy-900">
              {petrol.value}<span className="text-2xl font-bold text-charcoal-500">p/L</span>
            </p>
            <p className="mt-1 text-sm text-charcoal-500">Updated {formatDate(petrol.lastUpdated)}</p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <LinkButton href="/follow-the-money" size="lg">
              Where Does The Money Go?
            </LinkButton>
            <LinkButton href="/fuel-prices-through-time" variant="secondary" size="lg">
              Compare Then &amp; Now
            </LinkButton>
          </div>
        </div>

        <div>
          <div className="relative aspect-[5/4] overflow-hidden">
            <Image src={credit.src} alt={credit.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <PhotoCredit credit={credit} tone="light" className="mt-2" />
        </div>
      </Container>
    </section>
  );
}
