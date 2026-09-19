import { fuelDutyTimeline } from "@/lib/data/fuel-duty-timeline";
import { PolicyStatusBadge } from "@/components/ui/PolicyStatusBadge";
import { formatDate } from "@/lib/utils";

export function PolicyTimeline() {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 w-px bg-white/15 sm:left-[9px]" />
      <ol className="space-y-8">
        {fuelDutyTimeline.map((event) => (
          <li key={event.id} className="relative pl-8 sm:pl-9">
            <span
              aria-hidden="true"
              className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-navy-950 bg-petrol-500 sm:h-4.5 sm:w-4.5"
            />
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-sm font-bold text-white">{formatDate(event.date)}</span>
              <PolicyStatusBadge status={event.status} />
              {event.ratePencePerLitre !== null ? (
                <span className="text-sm font-extrabold tabular-nums text-petrol-300">{event.ratePencePerLitre.toFixed(2)}p/litre</span>
              ) : null}
            </div>
            <h3 className="mt-1.5 text-base font-bold text-white">{event.title}</h3>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-300">{event.description}</p>
            <a
              href={event.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs font-semibold text-petrol-400 underline underline-offset-2 hover:text-petrol-300"
            >
              Source: {event.source}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
