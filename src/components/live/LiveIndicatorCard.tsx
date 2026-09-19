import type { LiveIndicator } from "@/lib/data/live-snapshot";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";

function isDateOnly(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function LiveIndicatorCard({ indicator }: { indicator: LiveIndicator }) {
  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-charcoal-600">{indicator.label}</p>
        <StatusBadge status={indicator.status} />
      </div>

      {indicator.value !== null ? (
        <p className="mt-3 text-3xl font-extrabold tabular-nums text-navy-900">
          {indicator.value}
          <span className="ml-1.5 text-sm font-semibold text-charcoal-600">{indicator.unit}</span>
        </p>
      ) : (
        <p className="mt-3 text-lg font-semibold text-amber-800">Not yet available</p>
      )}

      <dl className="mt-4 space-y-1 border-t border-slate-100 pt-3 text-xs text-charcoal-600">
        {indicator.dataPeriod ? (
          <div className="flex justify-between gap-2">
            <dt>Data period</dt>
            <dd className="text-right font-medium text-charcoal-700">{indicator.dataPeriod}</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-2">
          <dt>Geography</dt>
          <dd className="font-medium text-charcoal-700">{indicator.geography}</dd>
        </div>
        {indicator.lastUpdated ? (
          <div className="flex justify-between gap-2">
            <dt>Last updated</dt>
            <dd className="font-medium text-charcoal-700">
              {isDateOnly(indicator.lastUpdated) ? formatDate(indicator.lastUpdated) : indicator.lastUpdated}
            </dd>
          </div>
        ) : null}
      </dl>

      {indicator.sourceUrl ? (
        <a
          href={indicator.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-xs font-semibold text-petrol-600 underline underline-offset-2"
        >
          Source: {indicator.source}
        </a>
      ) : (
        <p className="mt-3 text-xs text-charcoal-600">Source: {indicator.source}</p>
      )}
    </div>
  );
}
