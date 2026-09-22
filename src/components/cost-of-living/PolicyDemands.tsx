import { policyDemands } from "@/lib/data/policy-demands";
import { DemandStatusTag } from "@/components/our-demands/DemandStatusTag";
import { LinkButton } from "@/components/ui/Button";

export function PolicyDemands() {
  return (
    <div>
      <div className="rounded border border-petrol-200 bg-petrol-50 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-petrol-700">What FCE is asking Government to consider</p>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-700">
          These are FCE&apos;s evidence-led policy requests. They are not statements of current government
          policy. Where a proposal has not been adopted or legislated, it is clearly identified as a
          proposal.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {policyDemands.map((demand) => (
          <div key={demand.id} className="flex flex-col rounded border border-slate-200 p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl font-extrabold text-slate-200" aria-hidden="true">
                {String(demand.number).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-bold text-navy-900">{demand.title}</h3>
                {demand.statusTag ? <DemandStatusTag type={demand.statusTag} className="mt-1.5" /> : null}
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-charcoal-700">{demand.description}</p>

            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-charcoal-500">Supporting evidence</p>
            <ul className="mt-2 space-y-1.5">
              {demand.supportingPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-charcoal-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>

            {demand.evidenceHref ? (
              <div className="mt-5 pt-1">
                <LinkButton href={demand.evidenceHref} variant="secondary" size="md">
                  Evidence: {demand.evidenceLabel} →
                </LinkButton>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
