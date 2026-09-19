import { cn } from "@/lib/utils";
import type { DataStatus } from "@/lib/types";

const labels: Record<DataStatus, string> = {
  live: "Live data",
  historical: "Historical data",
  demo: "Demo data — not real",
  unavailable: "Data unavailable",
};

const classes: Record<DataStatus, string> = {
  live: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-600/20",
  historical: "bg-sky-100 text-sky-800 ring-1 ring-sky-600/20",
  demo: "bg-amber-100 text-amber-900 ring-1 ring-amber-600/30",
  unavailable: "bg-slate-100 text-slate-600 ring-1 ring-slate-400/30",
};

export function DataStatusBadge({ status, className }: { status: DataStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        classes[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );
}
