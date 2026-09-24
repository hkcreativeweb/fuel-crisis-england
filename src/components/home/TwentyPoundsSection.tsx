import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { availableYears, yearlySnapshots } from "@/lib/data/yearly-snapshots";

/**
 * Compact homepage version of "What £20 buys". Compares the earliest
 * verified weekly price in the site's data with today's live GOV.UK
 * average (passed in by the page). The full interactive tool lives on
 * /fuel-prices-through-time.
 */
export function TwentyPoundsSection({ petrolPence, dataPeriod }: { petrolPence: number; dataPeriod: string }) {
  const thenYear = availableYears.find((y) => yearlySnapshots[y].verified && yearlySnapshots[y].petrolPencePerLitre !== null);
  const then = thenYear ? yearlySnapshots[thenYear] : null;
  const litres = (pence: number) => ((20 * 100) / pence).toFixed(1);

  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
          <p aria-hidden="true" className="text-[6rem] font-extrabold leading-none tracking-tighter text-petrol-500 sm:text-[8rem]">
            £20
          </p>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-petrol-600">Then. Now. What changed?</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">What does £20 actually buy you?</h2>
            {then && then.petrolPencePerLitre ? (
              <dl className="mt-6 grid max-w-xl grid-cols-2 gap-4">
                <div className="rounded border border-slate-200 bg-white p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-charcoal-600">{then.pricesAsOf ?? thenYear}</dt>
                  <dd className="mt-1 text-2xl font-extrabold tabular-nums text-navy-900">
                    {litres(then.petrolPencePerLitre)} <span className="text-sm font-semibold text-charcoal-600">litres</span>
                  </dd>
                  <dd className="text-xs text-charcoal-600">at {then.petrolPencePerLitre.toFixed(1)}p a litre</dd>
                </div>
                <div className="rounded border border-navy-900 bg-white p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-charcoal-600">{dataPeriod}</dt>
                  <dd className="mt-1 text-2xl font-extrabold tabular-nums text-petrol-600">
                    {litres(petrolPence)} <span className="text-sm font-semibold text-charcoal-600">litres</span>
                  </dd>
                  <dd className="text-xs text-charcoal-600">at {petrolPence.toFixed(1)}p a litre</dd>
                </div>
              </dl>
            ) : null}
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-charcoal-700">
              Petrol, UK weekly average, GOV.UK / DESNZ. Wages changed too, so compare the years side by side before
              drawing conclusions.
            </p>
            <div className="mt-6">
              <LinkButton href="/fuel-prices-through-time" variant="secondary" className="min-h-12">
                Compare the past, with wages
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
