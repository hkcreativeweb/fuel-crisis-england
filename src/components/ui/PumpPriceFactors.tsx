import { ContentTag } from "@/components/ui/ContentTag";
import { BudgetNote } from "@/components/ui/BudgetNote";
import { fuelDutyTimeline } from "@/lib/data/fuel-duty-timeline";
import { formatDate, cn } from "@/lib/utils";

const DUTY_SOURCE = "https://www.gov.uk/government/publications/amended-fuel-duty-rates-for-2026-to-2027/amended-fuel-duty-rates-2026-to-2027";
const VAT_SOURCE = "https://www.gov.uk/vat-rates";

type Factor = { title: string; who: "government" | "market"; lines: string[]; more: string };

/** Fuel Duty as it stands today, read from the same dated timeline as the rest of the site so it cannot drift. */
function dutyFactor(): Factor {
  const today = new Date().toISOString().slice(0, 10);
  const dated = fuelDutyTimeline.filter((e) => e.ratePencePerLitre !== null).sort((a, b) => a.date.localeCompare(b.date));
  const current = [...dated].reverse().find((e) => e.date <= today);
  const next = dated.find((e) => e.date > today);
  return {
    title: "Fuel Duty",
    who: "government",
    lines: [
      "A flat tax charged per litre, set by government.",
      current ? `${current.ratePencePerLitre}p a litre now.` : "Rate set by government.",
      ...(next ? [`Scheduled: ${next.ratePencePerLitre}p from ${formatDate(next.date)}.`] : []),
    ],
    more: "Fuel Duty is charged per litre whatever the price, so it is a larger share of the pump price when fuel is cheap and a smaller share when fuel is dear.",
  };
}

const factors: Factor[] = [
  { title: "Oil, refining and shipping", who: "market", lines: ["International crude oil prices and the exchange rate.", "Refining and delivery to the forecourt."], more: "These costs move with world markets and are not set by the UK government. They are already inside the weekly price we show. We do not publish a split of this part, because no verified public split exists." },
  { title: "Retailer margin", who: "market", lines: ["What the forecourt keeps to cover its costs and profit.", "Set by each retailer, in a market the CMA monitors."], more: "The Competition and Markets Authority reports market-wide average margins. They vary by retailer, place and week. Our Follow the Money page shows the latest CMA figure." },
  dutyFactor(),
  { title: "VAT", who: "government", lines: ["20% charged on the price including Fuel Duty.", "Set by government."], more: "Because VAT is charged on a price that already includes Fuel Duty, a change to the duty also changes the VAT collected. At 20%, VAT is one-sixth of the VAT-inclusive pump price." },
];

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center font-semibold text-petrol-600 underline underline-offset-2">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * A plain diagram of what sits behind a pump price and who can change each part. It shows which parts exist and who sets
 * them, not how big each part is: the sizes change week to week, and we do not invent a breakdown here.
 */
export function PumpPriceFactors({ id = "pump-price-factors" }: { id?: string }) {
  return (
    <div id={id} className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
      <h3 className="text-lg font-bold text-navy-900">What is in a pump price, and who can change it?</h3>
      <p className="mt-1 text-sm text-charcoal-700">Four parts add up to the price on the forecourt sign. The boxes show what each part is, not how big it is; the proportions change from week to week.</p>

      <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Parts of the pump price">
        {factors.map((f, i) => (
          <li key={f.title} className={cn("rounded-md border p-4", f.who === "government" ? "border-petrol-300 bg-petrol-50" : "border-slate-200 bg-slate-50")}>
            <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">
              {i + 1}. {f.who === "government" ? "Set by government" : "Set by the market"}
            </p>
            <p className="mt-1 text-base font-extrabold text-navy-900">{f.title}</p>
            <ul className="mt-2 space-y-1 text-sm leading-snug text-charcoal-700">
              {f.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <details className="group mt-1">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1 text-xs font-semibold text-petrol-600 [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">More about this</span>
                <span className="hidden group-open:inline">Show less</span>
              </summary>
              <p className="pb-1 text-sm leading-snug text-charcoal-700">{f.more}</p>
            </details>
          </li>
        ))}
      </ol>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-slate-200 p-4">
          <p className="text-sm font-bold text-navy-900">Government can influence</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-snug text-charcoal-700">
            <li>The rate of Fuel Duty.</li>
            <li>The rate of VAT.</li>
            <li>How closely fuel pricing and competition are monitored, and how transparent prices are (for example through the Fuel Finder scheme).</li>
          </ul>
        </div>
        <div className="rounded-md border border-slate-200 p-4">
          <p className="text-sm font-bold text-navy-900">Government cannot directly control</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-snug text-charcoal-700">
            <li>The world price of crude oil.</li>
            <li>Exchange rates, refining and shipping costs.</li>
            <li>The price any individual retailer chooses to charge.</li>
          </ul>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-charcoal-700">
        <ContentTag type="campaign-commentary" className="mr-2" />
        Taxes are only part of the price, and not every rise at the pump comes from them. FCE&apos;s case is that the parts government does set should be decided with the evidence in view, and that prices should be more transparent.
      </p>

      <p className="mt-3 text-xs leading-relaxed text-charcoal-600">
        Sources: <ExtLink href={DUTY_SOURCE}>GOV.UK, Amended Fuel Duty rates 2026 to 2027</ExtLink> · <ExtLink href={VAT_SOURCE}>GOV.UK, VAT rates</ExtLink>. Fuel Duty is scheduled to rise to 55.95p on 1 January 2027 and 57.95p on 1 March 2027 under current legislation; final rates are to be confirmed at Budget 2026.
      </p>
      <BudgetNote className="mt-2" />
    </div>
  );
}
