import { cn } from "@/lib/utils";

/**
 * A collapsed-by-default block for detailed material that supports a page
 * but doesn't need to be read by everyone (full tables, extra tools, long
 * source lists). Native <details>, so it works without JavaScript and the
 * content stays in the page for search engines and find-in-page.
 */
export function Expandable({
  summary,
  hint,
  children,
  tone = "light",
  className,
}: {
  summary: string;
  hint?: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <details className={cn("group rounded border", tone === "light" ? "border-slate-300 bg-white" : "border-white/20", className)}>
      <summary
        className={cn(
          "flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 sm:px-5 [&::-webkit-details-marker]:hidden",
          tone === "light" ? "text-navy-900 hover:bg-slate-50" : "text-white hover:bg-white/5"
        )}
      >
        <span>
          <span className="block text-base font-bold">{summary}</span>
          {hint ? <span className={cn("mt-0.5 block text-sm", tone === "light" ? "text-charcoal-600" : "text-slate-300")}>{hint}</span> : null}
        </span>
        <span aria-hidden="true" className="shrink-0 text-xl leading-none transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="border-t border-inherit px-4 py-5 sm:px-5">{children}</div>
    </details>
  );
}
