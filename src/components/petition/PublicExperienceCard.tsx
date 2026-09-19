import type { PublicExperience } from "@/lib/types";
import { driverCategoryLabels } from "@/lib/data/public-experiences";
import { formatDate } from "@/lib/utils";

export function PublicExperienceCard({ experience }: { experience: PublicExperience }) {
  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-bold text-navy-900">{experience.areaOrCounty}</span>
        {experience.moderationStatus === "example" ? (
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900 ring-1 ring-amber-600/30">
            Example — not a real submission
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20">
            Moderated submission
          </span>
        )}
      </div>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-petrol-600">
        {driverCategoryLabels[experience.category]}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-charcoal-700">{experience.impactSummary}</p>
      <p className="mt-4 text-xs text-charcoal-600">Submitted {formatDate(experience.submittedOn)}</p>
    </div>
  );
}
