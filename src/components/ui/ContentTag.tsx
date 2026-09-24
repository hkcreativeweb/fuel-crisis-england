import { cn } from "@/lib/utils";

export type ContentTagType =
  | "verified-figure"
  | "government-statistic"
  | "economic-analysis"
  | "illustrative-scenario"
  | "campaign-proposal"
  | "campaign-commentary"
  | "public-opinion";

const labels: Record<ContentTagType, string> = {
  "verified-figure": "Verified financial figure",
  "government-statistic": "Government / official statistic",
  "economic-analysis": "Economic analysis",
  "illustrative-scenario": "Illustrative scenario",
  "campaign-proposal": "FCE campaign proposal",
  "campaign-commentary": "Campaign commentary",
  "public-opinion": "Public opinion",
};

const dotClasses: Record<ContentTagType, string> = {
  "verified-figure": "bg-emerald-600",
  "government-statistic": "bg-sky-600",
  "economic-analysis": "bg-violet-600",
  "illustrative-scenario": "bg-amber-500",
  "campaign-proposal": "bg-petrol-500",
  "campaign-commentary": "bg-petrol-500",
  "public-opinion": "bg-slate-400",
};

/** A typographic content-type label — dot + small caps text, not a filled pill. */
export function ContentTag({ type, className }: { type: ContentTagType; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("h-[6px] w-[6px] rounded-full", dotClasses[type])} aria-hidden="true" />
      <span className="text-xs font-bold uppercase tracking-[0.08em] text-charcoal-600">{labels[type]}</span>
    </span>
  );
}

export function ContentTagLegend() {
  const types: ContentTagType[] = [
    "verified-figure",
    "government-statistic",
    "economic-analysis",
    "illustrative-scenario",
    "campaign-proposal",
    "campaign-commentary",
    "public-opinion",
  ];
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {types.map((t) => (
        <ContentTag key={t} type={t} />
      ))}
    </div>
  );
}
