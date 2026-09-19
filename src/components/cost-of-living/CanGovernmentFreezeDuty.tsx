import { PolicyStatusBadge } from "@/components/ui/PolicyStatusBadge";
import { fuelDutyTimeline } from "@/lib/data/fuel-duty-timeline";
import { ContentTag } from "@/components/ui/ContentTag";

const current = fuelDutyTimeline.find((e) => e.status === "current");
const previous = fuelDutyTimeline.find((e) => e.id === "pre-2022-base-rate");
const announced = fuelDutyTimeline.find((e) => e.id === "2027-01-announced");

const explainerPoints = [
  "Fuel Duty is set by government policy, not by a fixed formula or natural law.",
  "The Chancellor and HM Treasury play a central role in proposing rate changes.",
  "Changes are normally announced through fiscal policy events (Budgets, Autumn Statements) and implemented under the relevant legal framework — usually a statutory instrument or Finance Act provision.",
  "Parliament and public-finance processes may be involved, depending on how the change is implemented.",
  "A freeze is a policy choice, not something that happens automatically — it requires a decision to maintain the existing rate rather than let a scheduled increase take effect.",
  "A freeze does not necessarily reduce the underlying wholesale price of fuel — it only prevents or delays a tax-rate increase for the period covered.",
];

export function CanGovernmentFreezeDuty() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-4">
          <PolicyStatusBadge status="previous" />
          <p className="mt-2 text-xl font-extrabold tabular-nums text-navy-900">{previous?.ratePencePerLitre?.toFixed(2)}p</p>
          <p className="text-xs text-charcoal-600">Pre-2022 base rate</p>
        </div>
        <div className="rounded-xl bg-emerald-50 p-4">
          <PolicyStatusBadge status="current" />
          <p className="mt-2 text-xl font-extrabold tabular-nums text-navy-900">{current?.ratePencePerLitre?.toFixed(2)}p</p>
          <p className="text-xs text-charcoal-600">Current rate</p>
        </div>
        <div className="rounded-xl bg-sky-50 p-4">
          <PolicyStatusBadge status="announced" />
          <p className="mt-2 text-xl font-extrabold tabular-nums text-navy-900">{announced?.ratePencePerLitre?.toFixed(2)}p</p>
          <p className="text-xs text-charcoal-600">From 1 January 2027</p>
        </div>
        <div className="rounded-xl bg-petrol-50 p-4">
          <ContentTag type="campaign-commentary" />
          <p className="mt-2 text-xl font-extrabold text-petrol-700">Freeze</p>
          <p className="text-xs text-charcoal-600">Our campaign demand — not government policy</p>
        </div>
      </div>

      <ul className="mt-8 space-y-3">
        {explainerPoints.map((point) => (
          <li key={point} className="flex items-start gap-3 text-sm text-charcoal-700">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
