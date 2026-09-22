import { cn } from "@/lib/utils";
import type { DemandStatusTagType } from "@/lib/data/policy-demands";

const labels: Record<DemandStatusTagType, string> = {
  "current-policy": "Current policy",
  "fce-proposal": "FCE proposal",
  "future-announced": "Future announced change",
  evidence: "Evidence",
};

const dotClasses: Record<DemandStatusTagType, string> = {
  "current-policy": "bg-emerald-600",
  "fce-proposal": "bg-petrol-500",
  "future-announced": "bg-sky-600",
  evidence: "bg-slate-500",
};

const textClasses: Record<DemandStatusTagType, string> = {
  "current-policy": "text-emerald-700",
  "fce-proposal": "text-petrol-600",
  "future-announced": "text-sky-700",
  evidence: "text-slate-600",
};

/** A small typographic status tag, only used where the label is factually accurate. */
export function DemandStatusTag({ type, className }: { type: DemandStatusTagType; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("h-[6px] w-[6px] rounded-full", dotClasses[type])} aria-hidden="true" />
      <span className={cn("text-[11px] font-bold uppercase tracking-[0.08em]", textClasses[type])}>{labels[type]}</span>
    </span>
  );
}
