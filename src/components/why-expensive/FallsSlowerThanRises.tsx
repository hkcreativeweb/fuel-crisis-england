import { Alert } from "@/components/ui/Alert";
import { StatusBadge } from "@/components/ui/StatusBadge";

const reasons = [
  "Retailers bought their current stock at an earlier wholesale price, before any fall.",
  "Inventory already purchased has to be sold through before cheaper stock arrives.",
  "Wholesale prices themselves can move at a different pace than crude oil.",
  "Refining margins can change independently of the crude oil price.",
  "Distribution costs (transport, storage, terminals) don't move with crude oil at all.",
  "Retailer operating costs (staff, rent, energy, card fees) are largely fixed in the short term.",
  "The level of local competition can affect how quickly a retailer chooses to cut prices.",
  "Fuel Duty is a fixed amount per litre, so it doesn't fall at all when wholesale costs fall.",
  "Currency movements can offset or amplify a change in the dollar oil price.",
];

export function FallsSlowerThanRises() {
  return (
    <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status="historical" />
        <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-600">
          &ldquo;Rocket and feather&rdquo; pricing — what regulators actually found
        </p>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-charcoal-700">
        &ldquo;Rocket and feather&rdquo; describes a pattern where retail prices rise quickly when wholesale
        costs increase (like a rocket) but fall only slowly when wholesale costs decrease (like a feather).
        Do not assume this applies everywhere, all the time — here is what has actually been measured, and
        when.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-slate-200 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-navy-900">RAC analysis, diesel &amp; petrol — Oct–Dec 2022</p>
          <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
            Petrol wholesale costs fell <strong>23p/litre</strong> over 9 weeks (mid-Oct to mid-Dec 2022) but
            pump prices fell only <strong>18p/litre</strong>. Diesel wholesale costs fell{" "}
            <strong>32p/litre</strong> over 8 weeks, while pump prices fell only <strong>20p/litre</strong>.
            Average retailer margin on petrol rose from 8.7p (2021) to 13.5p (2022); diesel margin rose from
            8.8p to 10.3p.
          </p>
          <p className="mt-2 text-[11px] text-charcoal-600">
            Source:{" "}
            <a href="https://media.rac.co.uk/rac-analysis-confirms-fuel-prices-fell-by-a-feather-and-didnt-fully-reflect-enormous-wholesale-price-drops-3230274" target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
              RAC, 28 January 2023
            </a>
          </p>
        </div>

        <div className="rounded-md border border-slate-200 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-navy-900">CMA road fuel market study — final report, 2023</p>
          <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
            The CMA found evidence of a rocket-and-feather pattern <strong>specifically for diesel</strong>{" "}
            during 2022, with no equivalent evidence for diesel before that year. Treat this as diesel-specific
            evidence from a defined period, not a permanent or universal feature of the market.
          </p>
          <p className="mt-2 text-[11px] text-charcoal-600">Source: CMA road fuel market study, final report, 3 July 2023 (secondary reporting cross-checked across independent outlets).</p>
        </div>
      </div>

      <div className="mt-6 rounded-md bg-slate-50 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status="latest-available" />
          <p className="text-xs font-bold uppercase tracking-wide text-navy-900">CMA Enhanced Road Fuel Monitoring — August 2026 (data to end June 2026)</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
          The CMA&apos;s most recent monitoring report documents a similar asymmetric pattern in 2026: over
          May–June 2026, petrol margins &ldquo;generally remain[ed] below their pre-conflict level&rdquo;, while
          diesel margins &ldquo;tended to remain above their pre-conflict level...falling to pre-conflict levels
          only at the end of June.&rdquo; The CMA said this &ldquo;suggests that retailer responses to
          reductions in wholesale diesel costs may have been more delayed&rdquo; — attributed partly to
          &ldquo;passive pricing strategies&rdquo;, not to a deliberate change in strategy to exploit the
          situation.
        </p>
        <p className="mt-2 text-[11px] text-charcoal-600">
          Source:{" "}
          <a href="https://www.gov.uk/government/publications/enhanced-road-fuel-monitoring-report-august-2026" target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
            CMA Enhanced Road Fuel Monitoring report, 18 August 2026
          </a>
        </p>
      </div>

      <h3 className="mt-8 text-lg font-bold text-navy-900">Possible contributing reasons</h3>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {reasons.map((reason) => (
          <li key={reason} className="flex items-start gap-2.5 text-sm text-charcoal-700">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-petrol-500" aria-hidden="true" />
            {reason}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Alert tone="warning" title="What the evidence does — and doesn't — show.">
          Regulators have found clear, quantified evidence of asymmetric pricing for diesel in specific
          periods (2022 and again in 2026). We have not found equivalent quantified evidence that this is a
          permanent, universal, or deliberately engineered feature of the whole market, or that it applies
          equally to petrol. The CMA&apos;s own next report (due Autumn 2026) will assess pass-through
          timeliness in more detail.
        </Alert>
      </div>
    </div>
  );
}
