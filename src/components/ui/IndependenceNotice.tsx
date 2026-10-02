import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const { full, badge } = siteConfig.independence;

/**
 * The independence statement, from one central definition in site-config.ts.
 * "full": the complete wording, with the "Independent & Community-Led" heading (Planned Protest).
 * "badge": a compact INDEPENDENT INITIATIVE box.
 * "text": the full wording as plain text, for pages that need it inline (About, Contact).
 * Tone "dark" is for navy backgrounds.
 */
export function IndependenceNotice({ variant = "badge", tone = "light", className }: { variant?: "full" | "badge" | "text"; tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  if (variant === "text") {
    return <p className={cn("text-sm leading-relaxed sm:text-base", dark ? "text-slate-300" : "text-charcoal-700", className)}>{full}</p>;
  }
  return (
    <aside
      aria-label="Independence statement"
      className={cn("rounded-md border-l-4 border-petrol-500 px-4 py-3", dark ? "bg-white/5 text-slate-200" : "bg-slate-50 text-charcoal-700", className)}
    >
      <p className={cn("text-xs font-bold uppercase tracking-[0.12em]", dark ? "text-petrol-300" : "text-petrol-600")}>
        {variant === "full" ? "Independent & Community-Led" : "Independent initiative"}
      </p>
      <p className="mt-1 text-sm leading-relaxed">{variant === "full" ? full : badge}</p>
    </aside>
  );
}
