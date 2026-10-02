import type { LiveIndicator } from "@/lib/data/live-snapshot";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { shortSource } from "@/lib/source-label";
import { formatDate } from "@/lib/utils";

function isDateOnly(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/** Compact dashboard card: value up front, a consistent Period / Geography / Source layout, extra detail on demand. */
export function LiveIndicatorCard({ indicator }: { indicator: LiveIndicator }) {
  const dated = indicator.lastUpdated && isDateOnly(indicator.lastUpdated) ? formatDate(indicator.lastUpdated) : indicator.lastUpdated;
  const dateLabel =
    indicator.status === "current" ? "Last checked" : indicator.status === "latest-available" || indicator.status === "ytd" ? "Latest figure dated" : indicator.status === "estimate" ? "Calculated from data dated" : "Last updated";

  return (
    <article aria-label={indicator.label} className="flex h-full flex-col rounded border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-semibold text-charcoal-700">{indicator.label}</h4>
        <StatusBadge status={indicator.status} />
      </div>

      {indicator.value !== null ? (
        <p className="mt-2 text-2xl font-extrabold tabular-nums text-navy-900">
          {indicator.value}
          <span className="ml-1.5 text-sm font-semibold text-charcoal-600">{indicator.unit}</span>
        </p>
      ) : (
        <p className="mt-2 text-lg font-semibold text-amber-800">Not yet available</p>
      )}

      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t border-slate-100 pt-3 text-xs">
        <dt className="text-charcoal-500">Period</dt>
        <dd className="font-medium text-charcoal-700">{indicator.dataPeriod || dated || "Not stated"}</dd>
        <dt className="text-charcoal-500">Geography</dt>
        <dd className="font-medium text-charcoal-700">{indicator.geography}</dd>
        <dt className="text-charcoal-500">Source</dt>
        <dd className="font-medium">
          {indicator.sourceUrl ? (
            <a
              href={indicator.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={indicator.source}
              aria-label={`Source: ${indicator.source} (opens in a new tab)`}
              className="inline-block py-1 text-petrol-600 underline underline-offset-2"
            >
              {shortSource(indicator.source)}
            </a>
          ) : (
            <span className="text-charcoal-700" title={indicator.source}>
              {shortSource(indicator.source)}
            </span>
          )}
        </dd>
      </dl>

      {dated || indicator.source.length > 40 ? (
        <details className="mt-2 text-xs text-charcoal-600">
          <summary className="cursor-pointer py-1 font-semibold text-charcoal-700">More detail</summary>
          <p className="mt-1">
            {dated ? (
              <>
                {dateLabel}: {dated}.{" "}
              </>
            ) : null}
            Full source: {indicator.source}.
          </p>
        </details>
      ) : null}
    </article>
  );
}
