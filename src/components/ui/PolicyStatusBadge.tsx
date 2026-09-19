import { cn } from "@/lib/utils";
import type { PolicyStatus } from "@/lib/types";

const labels: Record<PolicyStatus, string> = {
  current: "Current rate",
  previous: "Previous rate",
  announced: "Announced future rate",
  proposed: "Proposed — not yet confirmed",
};

const dotClasses: Record<PolicyStatus, string> = {
  current: "bg-emerald-600",
  previous: "bg-slate-400",
  announced: "bg-sky-600",
  proposed: "bg-amber-500",
};

const textClasses: Record<PolicyStatus, string> = {
  current: "text-emerald-700",
  previous: "text-slate-600",
  announced: "text-sky-700",
  proposed: "text-amber-700",
};

export function PolicyStatusBadge({ status, className }: { status: PolicyStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("h-[6px] w-[6px] rounded-full", dotClasses[status])} aria-hidden="true" />
      <span className={cn("text-[11px] font-bold uppercase tracking-[0.08em]", textClasses[status])}>{labels[status]}</span>
    </span>
  );
}
