import { cn } from "@/lib/utils";
import type { PolicyStatus } from "@/lib/types";

const labels: Record<PolicyStatus, string> = {
  current: "Current rate",
  previous: "Previous rate",
  announced: "Announced future rate",
  proposed: "Proposed — not yet confirmed",
};

const classes: Record<PolicyStatus, string> = {
  current: "bg-emerald-100 text-emerald-800 ring-emerald-600/20",
  previous: "bg-slate-100 text-slate-600 ring-slate-400/30",
  announced: "bg-sky-100 text-sky-800 ring-sky-600/20",
  proposed: "bg-amber-100 text-amber-900 ring-amber-600/30",
};

export function PolicyStatusBadge({ status, className }: { status: PolicyStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1", classes[status], className)}>
      {labels[status]}
    </span>
  );
}
