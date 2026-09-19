import { cn } from "@/lib/utils";

export type ContentTagType = "verified-figure" | "government-statistic" | "economic-analysis" | "campaign-commentary" | "public-opinion";

const labels: Record<ContentTagType, string> = {
  "verified-figure": "Verified financial figure",
  "government-statistic": "Government / official statistic",
  "economic-analysis": "Economic analysis",
  "campaign-commentary": "Campaign commentary",
  "public-opinion": "Public opinion",
};

const classes: Record<ContentTagType, string> = {
  "verified-figure": "bg-emerald-100 text-emerald-800 ring-emerald-600/20",
  "government-statistic": "bg-sky-100 text-sky-800 ring-sky-600/20",
  "economic-analysis": "bg-violet-100 text-violet-800 ring-violet-600/20",
  "campaign-commentary": "bg-petrol-100 text-petrol-600 ring-petrol-600/20",
  "public-opinion": "bg-slate-100 text-slate-700 ring-slate-400/30",
};

export function ContentTag({ type, className }: { type: ContentTagType; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1", classes[type], className)}>
      {labels[type]}
    </span>
  );
}

export function ContentTagLegend() {
  const types: ContentTagType[] = ["verified-figure", "government-statistic", "economic-analysis", "campaign-commentary", "public-opinion"];
  return (
    <div className="flex flex-wrap gap-2">
      {types.map((t) => (
        <ContentTag key={t} type={t} />
      ))}
    </div>
  );
}
