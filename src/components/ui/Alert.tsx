import { cn } from "@/lib/utils";

type Tone = "info" | "warning" | "success" | "error";

const toneClasses: Record<Tone, string> = {
  info: "border-sky-500 text-charcoal-700",
  warning: "border-amber-500 text-charcoal-700",
  success: "border-emerald-600 text-charcoal-700",
  error: "border-red-600 text-charcoal-700",
};

const titleClasses: Record<Tone, string> = {
  info: "text-sky-800",
  warning: "text-amber-800",
  success: "text-emerald-800",
  error: "text-red-800",
};

/**
 * An editorial notice: a thin coloured left rule against a plain
 * background, not a filled coloured box. Reserve `tone="error"` for
 * genuine failures — most factual caveats should use "info"/"warning".
 */
export function Alert({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: Tone;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div role={tone === "error" ? "alert" : "status"} className={cn("border-l-2 py-1 pl-4 text-sm leading-relaxed", toneClasses[tone], className)}>
      {title ? <p className={cn("mb-1 font-semibold", titleClasses[tone])}>{title}</p> : null}
      <div>{children}</div>
    </div>
  );
}
