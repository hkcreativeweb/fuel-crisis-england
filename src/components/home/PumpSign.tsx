import { Container } from "@/components/ui/Container";
import { getLatestUkWeeklyAverage } from "@/lib/data/desnz-weekly-prices";

function Row({ label, pence }: { label: string; pence: number }) {
  return (
    <div className="overflow-hidden rounded-lg bg-emerald-900 p-3 sm:p-4">
      <p className="text-sm font-bold text-white sm:text-lg">{label}</p>
      <p
        className="mt-1 rounded-md bg-black px-3 py-2 text-center font-mono text-4xl font-extrabold tabular-nums tracking-wider text-red-500 sm:text-6xl"
        style={{ textShadow: "0 0 14px rgba(239,68,68,0.55)" }}
      >
        £{(pence / 100).toFixed(2)}
      </p>
    </div>
  );
}

/** An original forecourt-style price board, driven by the same live GOV.UK / DESNZ weekly average as the rest of the homepage. */
export async function PumpSign() {
  const { figures } = await getLatestUkWeeklyAverage();
  return (
    <section aria-labelledby="pump-sign-title" className="border-b border-slate-200 bg-slate-50 py-8 sm:py-14">
      <Container className="grid items-center gap-6 sm:gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-petrol-600">At the pump</p>
          <h2 id="pump-sign-title" className="mt-2 text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl">
            This is what a litre costs this week.
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-charcoal-700">
            UK average pump prices from the latest GOV.UK / DESNZ weekly data. The rest of this site shows what is in that price, and where the money goes.
          </p>
        </div>
        <figure className="mx-auto w-full max-w-sm rounded-xl border-4 border-slate-300 bg-slate-100 p-3 shadow-lg">
          <div className="grid gap-3">
            <Row label="Unleaded (petrol)" pence={figures.petrol.current} />
            <Row label="Diesel" pence={figures.diesel.current} />
          </div>
          <figcaption className="mt-2 text-center text-xs text-charcoal-600">Illustration. UK weekly average, not a single station&apos;s price.</figcaption>
        </figure>
      </Container>
    </section>
  );
}
