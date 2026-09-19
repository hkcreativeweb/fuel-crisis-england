import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-bold uppercase tracking-[0.18em]",
            tone === "light" ? "text-petrol-500" : "text-petrol-300"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-extrabold tracking-tight sm:text-4xl",
          tone === "light" ? "text-navy-900" : "text-white"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", tone === "light" ? "text-charcoal-700" : "text-slate-300")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
