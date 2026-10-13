import { EnlargeableImage } from "@/components/ui/EnlargeableImage";
import Link from "next/link";
import { PetitionCountLine } from "@/components/petition/PetitionCountLine";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { CountUp } from "@/components/ui/CountUp";
import { LastUpdatedLine } from "@/components/home/LastUpdatedLine";
import { getLatestUkWeeklyAverage } from "@/lib/data/desnz-weekly-prices";
import { ukWeeklyAverageSource } from "@/lib/data/hero-fuel-snapshot";
import { imageCredits } from "@/lib/data/image-credits";
import { formatDate } from "@/lib/utils";

const photo = imageCredits["forecourt-wentworth"];

function change(current: number, previous: number | null): string {
  if (previous === null) return "no previous week to compare";
  const d = current - previous;
  if (Math.abs(d) < 0.05) return "unchanged on the previous week";
  return `${d > 0 ? "up" : "down"} ${Math.abs(d).toFixed(1)}p on the previous week`;
}

/** Photographic hero: a real UK forecourt behind the headline, with the verified weekly prices and the main actions. */
export async function Hero() {
  const { figures } = await getLatestUkWeeklyAverage();
  const rows = [
    { label: "Petrol", figure: figures.petrol },
    { label: "Diesel", figure: figures.diesel },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <SafeImage src={photo.src} alt="" fill priority sizes="100vw" className="-z-10 object-cover object-[70%_60%] opacity-80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/20" aria-hidden="true" />

      <Container className="grid gap-8 py-10 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-petrol-300">FCE: Fuel Crisis England</p>
          <div className="mt-3 h-px w-12 bg-white/30" aria-hidden="true" />
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.1rem]">
            Follow the figures.
            <span className="block text-petrol-300">Understand the price.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-200">
            Fuel Crisis England brings together fuel prices, taxes, costs, history and public information in one place.
          </p>
          <p className="mt-4 max-w-md border-l-2 border-petrol-300 pl-4 text-base font-semibold leading-snug text-white">
            A fuel crisis is also about affordability, taxation and the cost of living, not only about whether fuel is on the shelf.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LinkButton href="/petition#sign-petition" size="lg" className="min-h-12">
              Sign the petition
            </LinkButton>
            <LinkButton href="/live-fuel-prices" variant="outline-light" size="lg" className="min-h-12">
              Explore fuel prices
            </LinkButton>
            <LinkButton href="/about#fuel-crisis" variant="outline-light" size="lg" className="min-h-12">
              Why this matters
            </LinkButton>
          </div>
          <div className="mt-5 max-w-sm border-t border-white/15 pt-4">
            <PetitionCountLine tone="dark" />
            <p className="mt-1 text-xs text-slate-300">Real signatures on our own campaign petition. <Link href="/sources" className="font-semibold text-white underline underline-offset-2">Check the sources</Link></p>
          </div>
          <LastUpdatedLine tone="dark" className="mt-2" />
        </div>

        <div className="space-y-5">
          <div className="rounded-lg border border-white/15 bg-navy-950/70 p-5 backdrop-blur sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-300">UK weekly average pump prices</p>
            <div className="mt-3 grid grid-cols-2 gap-4">
              {rows.map(({ label, figure }) => (
                <div key={label}>
                  <p className="text-sm font-semibold text-slate-200">{label}</p>
                  <p className="mt-1 text-4xl font-extrabold tabular-nums sm:text-5xl">
                    <CountUp value={figure.current} decimals={1} />
                    <span className="ml-1 text-base font-bold text-slate-300">p/L</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-300">{change(figure.current, figure.previous)}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-300">
              {figures.petrol.dataPeriod}, published {formatDate(figures.petrol.lastUpdated)}.{" "}
              <a href={ukWeeklyAverageSource.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline underline-offset-2">
                GOV.UK / DESNZ<span className="sr-only"> (opens in a new tab)</span>
              </a>
              . National averages, not the price at any one station.
            </p>
          </div>

          <figure className="flex items-center gap-4 rounded-lg border border-white/15 bg-white p-3 text-navy-900">
            <EnlargeableImage
              src="/images/bus-fare-cartoon.webp"
              alt="A cartoon character beside a petrol station price board showing £2.09 unleaded and £2.19 diesel, pointing at a bus and saying: Don't worry about petrol prices, it's now £2 to catch the bus."
              width={1024}
              height={940}
              sizes="(min-width: 640px) 128px, 96px"
              className="h-auto w-full rounded"
              buttonClassName="w-24 shrink-0 sm:w-32"
            />
            <figcaption className="text-xs leading-snug text-charcoal-700">
              <span className="font-bold text-navy-900">Editorial cartoon.</span> Satire, not a statement of fact; the prices in it are illustrative. Fuel Crisis England is independent and not affiliated with any political party.
            </figcaption>
          </figure>
        </div>
      </Container>
      <Container className="pb-4">
        <PhotoCredit credit={photo} />
      </Container>
    </section>
  );
}
