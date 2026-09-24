import { cn } from "@/lib/utils";
import type { DataStatus } from "@/lib/types";

const labels: Record<DataStatus, string> = {
  live: "Live data",
  historical: "Historical data",
  unavailable: "Data unavailable",
};

const dotClasses: Record<DataStatus, string> = {
  live: "bg-blue-600",
  historical: "bg-purple-700",
  unavailable: "bg-slate-300",
};

const textClasses: Record<DataStatus, string> = {
  live: "text-blue-700",
  historical: "text-purple-700",
  unavailable: "text-slate-500",
};

export function DataStatusBadge({ status, className }: { status: DataStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("h-[6px] w-[6px] rounded-full", dotClasses[status])} aria-hidden="true" />
      <span className={cn("text-[11px] font-bold uppercase tracking-[0.08em]", textClasses[status])}>{labels[status]}</span>
    </span>
  );
}
