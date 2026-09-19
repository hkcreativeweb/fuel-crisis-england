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
    <section className="relative overflow-hidden bg-navy-950">
      <div className="absolute inset-0">
        <Image src={credit.src} alt={credit.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
      </div>

      <Container className="relative py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="mb-5 inline-flex items-center rounded-full border border-petrol-500/40 bg-petrol-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-petrol-300">
              FCE — Fuel Crisis England
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
              WHY IS FUEL SO EXPENSIVE?
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-200">
              Follow the money from crude oil to the forecourt — and see what happens to your household
              budget.
            </p>

            <div className="mt-8 inline-flex flex-col gap-1 rounded-2xl border border-white/15 bg-navy-950/60 px-5 py-4 backdrop-blur-sm">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-live">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-live" aria-hidden="true" />
                Live fuel price
              </span>
              <span className="text-4xl font-extrabold tabular-nums text-white">
                {petrol.value}
                <span className="text-xl font-bold text-slate-300">p/litre</span>
              </span>
              <span className="text-xs text-slate-400">Petrol, UK average — updated {formatDate(petrol.lastUpdated)}</span>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LinkButton href="/follow-the-money" size="lg">
                Where Does The Money Go?
              </LinkButton>
              <LinkButton href="/fuel-prices-through-time" variant="outline-light" size="lg">
                Compare Then &amp; Now
              </LinkButton>
              <LinkButton href="/save-fuel-money" variant="outline-light" size="lg">
                Save Fuel &amp; Money
              </LinkButton>
            </div>
          </div>
        </div>

        <PhotoCredit credit={credit} className="mt-14" />
      </Container>
    </section>
  );
}
