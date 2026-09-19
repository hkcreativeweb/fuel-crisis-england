import { cn } from "@/lib/utils";
import type { DataStatusLabel } from "@/lib/types";

const labels: Record<DataStatusLabel, string> = {
  live: "LIVE",
  "latest-available": "LATEST AVAILABLE",
  ytd: "YTD",
  historical: "HISTORICAL",
  estimate: "ESTIMATE",
  projection: "PROJECTION",
  "not-yet-available": "NOT YET AVAILABLE",
};

const dotClasses: Record<DataStatusLabel, string> = {
  live: "bg-blue-600",
  "latest-available": "bg-slate-500",
  ytd: "bg-violet-600",
  historical: "bg-purple-700",
  estimate: "bg-amber-500",
  projection: "bg-pink-500",
  "not-yet-available": "bg-slate-300",
};

const badgeClasses: Record<DataStatusLabel, string> = {
  live: "bg-blue-100 text-blue-800 ring-blue-600/20",
  "latest-available": "bg-blue-50 text-slate-700 ring-slate-400/30",
  ytd: "bg-violet-100 text-violet-800 ring-violet-600/20",
  historical: "bg-purple-100 text-purple-800 ring-purple-600/20",
  estimate: "bg-amber-100 text-amber-900 ring-amber-600/30",
  projection: "bg-pink-100 text-pink-800 ring-pink-600/20",
  "not-yet-available": "bg-slate-50 text-slate-500 ring-slate-300/40",
};

const detailText: Record<DataStatusLabel, string> = {
  live: "Updated today",
  "latest-available": "Most recent published figure",
  ytd: "Year to date",
  historical: "Completed period",
  estimate: "Calculated, not directly published",
  projection: "A forward-looking estimate, not an actual reported figure",
  "not-yet-available": "Not yet published",
};

export function StatusBadge({ status, showDetail = false, className }: { status: DataStatusLabel; showDetail?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex flex-col items-start gap-0.5", className)}>
      <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold tracking-wide ring-1", badgeClasses[status])}>
        <span className={cn("h-1.5 w-1.5 rounded-full", dotClasses[status])} aria-hidden="true" />
        {labels[status]}
      </span>
      {showDetail ? <span className="text-[11px] text-charcoal-500">{detailText[status]}</span> : null}
    </span>
  );
}
