import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  number,
  title,
  description,
  align = "left",
  tone = "light",
  rule = false,
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  /** A two-digit editorial section number, e.g. "01". Rendered before the eyebrow. */
  number?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** Adds a thin horizontal rule between the eyebrow and the headline. */
  rule?: boolean;
  /** Heading level for the title. Use "h1" only for a page's main heading. */
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow || number ? (
        <p
          className={cn(
            "mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]",
            align === "center" && "justify-center",
            tone === "light" ? "text-petrol-600" : "text-petrol-300"
          )}
        >
          {number ? <span className="tabular-nums text-charcoal-400">{number}</span> : null}
          {eyebrow}
        </p>
      ) : null}
      {rule ? (
        <div className={cn("mb-4 h-px w-12 bg-current opacity-30", tone === "light" ? "text-navy-900" : "text-white")} aria-hidden="true" />
      ) : null}
      <Heading
        className={cn(
          "text-3xl font-extrabold tracking-tight sm:text-4xl",
          tone === "light" ? "text-navy-900" : "text-white"
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", tone === "light" ? "text-charcoal-700" : "text-slate-300")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
