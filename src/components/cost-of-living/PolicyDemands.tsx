import { policyDemands } from "@/lib/data/policy-demands";
import { DemandStatusTag } from "@/components/our-demands/DemandStatusTag";
import { LinkButton } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { imageCredits } from "@/lib/data/image-credits";

/** An illustrative photo for each demand. Decorative: none of them shows a person who supports the campaign. */
const demandImages: Record<string, string> = {
  "fuel-duty": "forecourt-asda",
  vat: "hero-petrol-station",
  "competition-margins": "forecourt-wentworth",
  transparency: "forecourt-close",
  "crisis-oversight": "motorway-traffic",
  "protect-essential-motorists": "delivery-van",
  "transport-strategy": "community-notice-board",
};

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
          <div key={demand.id} className="reveal flex flex-col overflow-hidden rounded border border-slate-200 p-6">
            {demandImages[demand.id] ? (
              <div className="relative -mx-6 -mt-6 mb-5 aspect-[16/6] bg-navy-900/10">
                <SafeImage src={imageCredits[demandImages[demand.id]].src} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" loading="lazy" className="object-cover" />
              </div>
            ) : null}
            <div className="flex items-start gap-4">
              <span className="text-3xl font-extrabold text-slate-500" aria-hidden="true">
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

      <div className="mt-8 flex flex-col gap-3 rounded-lg bg-navy-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base font-bold">If you agree these are worth discussing, add your voice.</p>
        <LinkButton href="/petition#sign-petition" size="lg" className="min-h-12">
          Sign the petition
        </LinkButton>
      </div>

      <details className="mt-6 text-xs text-charcoal-600">
        <summary className="min-h-11 cursor-pointer font-semibold text-charcoal-700">Photo credits and licences</summary>
        <p className="mt-1">The pictures on these cards are illustrative. They show places and roads, not campaign supporters.</p>
        <div className="mt-2 space-y-0.5">
          {[...new Set(Object.values(demandImages))].map((id) => (
            <PhotoCredit key={id} credit={imageCredits[id]} tone="light" />
          ))}
        </div>
      </details>
    </div>
  );
}
