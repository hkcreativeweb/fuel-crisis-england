import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  caption,
  tone = "dark",
  className,
}: {
  label: string;
  value: string;
  caption?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded border p-6",
        tone === "dark" ? "border-white/10 bg-navy-800/60" : "border-slate-200 bg-white",
        className
      )}
    >
      <p className={cn("text-sm font-semibold", tone === "dark" ? "text-slate-300" : "text-charcoal-600")}>{label}</p>
      <p className={cn("mt-2 text-3xl font-extrabold tabular-nums sm:text-4xl", tone === "dark" ? "text-white" : "text-navy-900")}>
        {value}
      </p>
      {caption ? <p className={cn("mt-2 text-sm", tone === "dark" ? "text-slate-400" : "text-charcoal-600")}>{caption}</p> : null}
    </div>
  );
}
