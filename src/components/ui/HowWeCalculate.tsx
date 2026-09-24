import { cn } from "@/lib/utils";

/**
 * A compact, native disclosure for the method behind a calculated or
 * derived figure. Uses <details>, so it works without JavaScript and is
 * keyboard and screen-reader accessible by default.
 */
export function HowWeCalculate({
  children,
  title = "How we calculate this",
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  title?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <details
      className={cn(
        "group rounded border text-sm",
        tone === "light" ? "border-slate-200 bg-white text-charcoal-700" : "border-white/15 text-slate-300",
        className
      )}
    >
      <summary
        className={cn(
          "flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-2 font-semibold [&::-webkit-details-marker]:hidden",
          tone === "light" ? "text-navy-900" : "text-white"
        )}
      >
        {title}
        <span aria-hidden="true" className="text-lg leading-none transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="space-y-2 px-4 pb-4 leading-relaxed">{children}</div>
    </details>
  );
}
