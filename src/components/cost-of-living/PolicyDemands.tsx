import { policyDemands } from "@/lib/data/policy-demands";
import { fuelDutyTimeline } from "@/lib/data/fuel-duty-timeline";
import { cmaMarginPoints, cmaMarginSource } from "@/lib/data/cma-margins";
import { ContentTag } from "@/components/ui/ContentTag";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PolicyStatusBadge } from "@/components/ui/PolicyStatusBadge";
import { formatDate } from "@/lib/utils";

const currentDuty = fuelDutyTimeline.find((e) => e.status === "current");
const previousDuty = fuelDutyTimeline.find((e) => e.id === "pre-2022-base-rate");
const announcedDuty = fuelDutyTimeline.filter((e) => e.status === "announced");

function FuelDutyDataCard() {
  return (
    <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">The current position, verified</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <StatusBadge status="live" />
          <p className="mt-1.5 text-lg font-extrabold tabular-nums text-navy-900">{currentDuty?.ratePencePerLitre?.toFixed(2)}p/litre</p>
          <p className="text-xs text-charcoal-600">Current rate, in force since {currentDuty ? formatDate(currentDuty.date) : "—"}</p>
        </div>
        <div>
          <StatusBadge status="historical" />
          <p className="mt-1.5 text-lg font-extrabold tabular-nums text-navy-900">{previousDuty?.ratePencePerLitre?.toFixed(2)}p/litre</p>
          <p className="text-xs text-charcoal-600">Previous rate, {previousDuty ? formatDate(previousDuty.date) : "—"} to 23 March 2022</p>
        </div>
      </div>
      {announcedDuty.length > 0 ? (
        <div className="mt-3 border-t border-slate-200 pt-3">
          <p className="text-xs font-semibold text-charcoal-600">Officially confirmed future changes:</p>
          <ul className="mt-1.5 space-y-1">
            {announcedDuty.map((e) => (
              <li key={e.id} className="flex items-center gap-2 text-xs text-charcoal-700">
                <PolicyStatusBadge status={e.status} />
                <span className="font-bold tabular-nums text-navy-900">{e.ratePencePerLitre?.toFixed(2)}p</span>
                <span>from {formatDate(e.date)}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="mt-3 text-xs text-charcoal-600">
        Source:{" "}
        <a href={currentDuty?.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
          GOV.UK / legislation.gov.uk
        </a>
        {" "}— full history on our{" "}
        <a href="/fuel-duty-and-tax" className="font-semibold text-petrol-600 underline underline-offset-2">
          Fuel Duty &amp; Tax
        </a>{" "}
        page.
      </p>
    </div>
  );
}

function CompetitionDataCard() {
  const latest = cmaMarginPoints[cmaMarginPoints.length - 1];
  return (
    <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status="latest-available" />
        <p className="text-xs font-bold uppercase tracking-wide text-charcoal-600">Latest CMA margin data</p>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold tabular-nums text-navy-900">{latest.allRetailersPencePerLitre}p</p>
          <p className="text-xs text-charcoal-600">All retailers, {latest.period}</p>
        </div>
        <div>
          <p className="text-lg font-extrabold tabular-nums text-navy-900">{latest.supermarketsPencePerLitre}p</p>
          <p className="text-xs text-charcoal-600">Supermarkets, {latest.period}</p>
        </div>
        <div>
          <p className="text-lg font-extrabold tabular-nums text-navy-900">{latest.nonSupermarketsPencePerLitre}p</p>
          <p className="text-xs text-charcoal-600">Non-supermarkets, {latest.period}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-charcoal-600">
        Source:{" "}
        <a href={cmaMarginSource.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
          {cmaMarginSource.name}
        </a>
        {" "}— full data on our{" "}
        <a href="/why-is-fuel-expensive#competition" className="font-semibold text-petrol-600 underline underline-offset-2">
          Why Is Fuel So Expensive?
        </a>{" "}
        page.
      </p>
    </div>
  );
}

export function PolicyDemands() {
  return (
    <div>
      <div className="rounded border border-petrol-200 bg-petrol-50 p-5">
        <ContentTag type="campaign-commentary" />
        <p className="mt-3 text-sm leading-relaxed text-charcoal-700">
          The items below are Fuel Crisis England&apos;s own campaign demands — clearly presented as{" "}
          <strong>FCE&apos;s requests</strong>, not established government policy or verified fact. Government
          does not control every part of the price at the pump: global oil markets, exchange rates,
          refining, wholesale markets, distribution and retail competition all matter. But Government does
          directly control Fuel Duty policy, and can make decisions about taxation, regulation and
          transparency. We&apos;ve tried to be explicit about what each demand would actually require.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {policyDemands.map((demand) => (
          <div key={demand.id} className="rounded border border-slate-200 p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-petrol-600">Demand {demand.number} — {demand.title}</p>
            <h3 className="mt-1 text-lg font-bold text-navy-900">{demand.tagline}</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{demand.statement}</p>
            <ul className="mt-4 space-y-1.5">
              {demand.explanationPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-charcoal-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            {demand.id === "fuel-duty" ? <FuelDutyDataCard /> : null}
            {demand.id === "competition-margins" ? <CompetitionDataCard /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
