import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getCurrentFuelPrices } from "@/lib/data/current-fuel-prices";
import { fuelDutyTimeline } from "@/lib/data/fuel-duty-timeline";
import { liveIndicators } from "@/lib/data/live-snapshot";
import { shortSource } from "@/lib/source-label";
import { formatDate } from "@/lib/utils";

function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" }).format(new Date(iso));
}

function Source({ name, url }: { name: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" title={name} aria-label={`Source: ${name} (opens in a new tab)`} className="inline-block py-1 font-semibold text-petrol-600 underline underline-offset-2">
      {shortSource(name)}
    </a>
  );
}

/** Weekly movement with words as well as an arrow, so it never relies on the symbol or colour alone. */
function Move({ delta }: { delta: number | null }) {
  if (delta === null) return <span>No earlier week to compare</span>;
  const rounded = Math.round(delta * 10) / 10;
  if (rounded === 0) return <span>No change this week</span>;
  const up = rounded > 0;
  return (
    <span className="font-semibold text-navy-900">
      <span aria-hidden="true">
        {up ? "▲ +" : "▼ −"}
        {Math.abs(rounded).toFixed(1)}p this week
      </span>
      <span className="sr-only">
        {up ? "Increased by " : "Decreased by "}
        {Math.abs(rounded).toFixed(1)}p this week
      </span>
    </span>
  );
}

/**
 * The first thing on the page: petrol and diesel dominant, Fuel Duty and VAT as
 * supporting cards, plus a status line that separates "when we last checked"
 * from "which week the price is for".
 */
export async function AtAGlance() {
  const prices = await getCurrentFuelPrices();
  const today = new Date().toISOString().slice(0, 10);
  const dated = fuelDutyTimeline.filter((e) => e.ratePencePerLitre !== null).sort((a, b) => a.date.localeCompare(b.date));
  const duty = [...dated].reverse().find((e) => e.date <= today);
  const nextDuty = dated.find((e) => e.date > today && e.ratePencePerLitre !== duty?.ratePencePerLitre);
  const vat = liveIndicators.find((i) => i.id === "vat-rate");

  const pump = [
    { label: "Petrol", data: prices.petrol },
    { label: "Diesel", data: prices.diesel },
  ] as const;

  return (
    <section id="at-a-glance" className="scroll-mt-24 bg-white py-12 sm:py-14">
      <Container>
        <SectionHeading eyebrow="Latest" title="At a glance" />

        <dl className="mt-5 grid gap-x-8 gap-y-2 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Data status</dt>
            <dd className={prices.awaitingUpdate ? "font-semibold text-amber-800" : "font-semibold text-navy-900"}>
              {prices.awaitingUpdate ? "Awaiting update (showing last verified figures)" : prices.stale ? "Updated, but older than expected" : "Updated successfully"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Last successfully checked</dt>
            <dd className="text-charcoal-700">{prices.lastSuccessfulUpdate ? formatDateTime(prices.lastSuccessfulUpdate) : "Not available"}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Fuel prices</dt>
            <dd className="text-charcoal-700">{prices.weekLabel}</dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-charcoal-500">
          Pump prices are weekly national averages published by GOV.UK / DESNZ. The time above is when we last checked, not when prices were measured.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {pump.map(({ label, data }) => {
            const delta = data.previous === null ? null : data.price - data.previous;
            return (
              <article key={label} aria-label={`${label} average price`} className="rounded border-2 border-navy-900 bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-navy-900">{label}</h3>
                  <StatusBadge status="latest-available" />
                </div>
                <p className="mt-3 text-5xl font-extrabold tabular-nums text-navy-900">
                  {data.price.toFixed(1)}
                  <span className="ml-1.5 text-lg font-bold text-charcoal-500">p/L</span>
                </p>
                <p className="mt-2 text-sm text-charcoal-700">
                  <Move delta={delta} />
                </p>
                <p className="mt-1 text-sm text-charcoal-600">{formatDate(data.updatedAt)} · UK average</p>
                <p className="mt-1 text-xs text-charcoal-600">
                  Source: <Source name={data.source} url={data.sourceUrl} />
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {duty ? (
            <article aria-label="Fuel Duty rate" className="rounded border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-navy-900">Fuel Duty</h3>
                <StatusBadge status="current" />
              </div>
              <p className="mt-2 text-2xl font-extrabold tabular-nums text-navy-900">
                {duty.ratePencePerLitre}
                <span className="ml-1 text-sm font-bold text-charcoal-500">p/L</span>
              </p>
              <p className="mt-1 text-xs text-charcoal-600">
                {nextDuty ? `Next confirmed change: ${nextDuty.ratePencePerLitre}p from ${formatDate(nextDuty.date)}.` : "No further change currently confirmed."}
              </p>
              <p className="mt-1 text-xs text-charcoal-600">
                Source: <Source name={duty.source} url={duty.sourceUrl} />
              </p>
            </article>
          ) : null}
          {vat ? (
            <article aria-label="VAT rate on fuel" className="rounded border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-navy-900">VAT on fuel</h3>
                <StatusBadge status="current" />
              </div>
              <p className="mt-2 text-2xl font-extrabold tabular-nums text-navy-900">{vat.value}%</p>
              <p className="mt-1 text-xs text-charcoal-600">Charged on the price including Fuel Duty.</p>
              <p className="mt-1 text-xs text-charcoal-600">
                Source: <Source name={vat.source} url={vat.sourceUrl ?? "https://www.gov.uk/vat-rates"} />
              </p>
            </article>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
