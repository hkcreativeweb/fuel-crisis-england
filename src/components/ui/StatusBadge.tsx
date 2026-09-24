import { cn } from "@/lib/utils";
import type { DataStatusLabel } from "@/lib/types";

const labels: Record<DataStatusLabel, string> = {
  live: "Live",
  current: "Current rate",
  "latest-available": "Latest available",
  ytd: "YTD",
  historical: "Historical",
  estimate: "Estimate",
  projection: "Projection",
  "not-yet-available": "Not yet available",
};

const dotClasses: Record<DataStatusLabel, string> = {
  live: "bg-blue-500",
  current: "bg-emerald-600",
  "latest-available": "bg-slate-500",
  ytd: "bg-violet-500",
  historical: "bg-purple-600",
  estimate: "bg-amber-500",
  projection: "bg-pink-500",
  "not-yet-available": "bg-slate-300",
};

const textClassesLight: Record<DataStatusLabel, string> = {
  live: "text-blue-700",
  current: "text-emerald-700",
  "latest-available": "text-slate-600",
  ytd: "text-violet-700",
  historical: "text-purple-700",
  estimate: "text-amber-700",
  projection: "text-pink-700",
  "not-yet-available": "text-slate-500",
};

const textClassesDark: Record<DataStatusLabel, string> = {
  live: "text-blue-300",
  current: "text-emerald-300",
  "latest-available": "text-slate-300",
  ytd: "text-violet-300",
  historical: "text-purple-300",
  estimate: "text-amber-300",
  projection: "text-pink-300",
  "not-yet-available": "text-slate-400",
};

const detailText: Record<DataStatusLabel, string> = {
  live: "Fetched automatically from the official source",
  current: "Official rate currently in force, not a live data feed",
  "latest-available": "Most recent published figure",
  ytd: "Year to date",
  historical: "Completed period",
  estimate: "Calculated, not directly published",
  projection: "A forward-looking estimate, not an actual reported figure",
  "not-yet-available": "Not yet published",
};

/**
 * A typographic status indicator — a coloured dot plus an uppercase
 * label, never a filled pill. Colour lives in the dot and the text,
 * not a background fill, so this reads as metadata rather than a UI
 * chrome element. Pass `tone="dark"` when placing this on a dark
 * (navy) background so the text stays legible.
 */
export function StatusBadge({
  status,
  showDetail = false,
  tone = "light",
  className,
}: {
  status: DataStatusLabel;
  showDetail?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const textClasses = tone === "dark" ? textClassesDark : textClassesLight;
  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-1.5", className)}>
      <span className="inline-flex items-center gap-1.5">
        <span className={cn("h-[6px] w-[6px] rounded-full", dotClasses[status])} aria-hidden="true" />
        <span className={cn("text-[11px] font-bold uppercase tracking-[0.08em]", textClasses[status])}>{labels[status]}</span>
      </span>
      {showDetail ? <span className={cn("text-[11px]", tone === "dark" ? "text-slate-400" : "text-charcoal-500")}>— {detailText[status]}</span> : null}
    </span>
  );
}
