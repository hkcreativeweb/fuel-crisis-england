import { cn } from "@/lib/utils";

type Tone = "info" | "warning" | "success" | "error";

const toneClasses: Record<Tone, string> = {
  info: "bg-sky-50 border-sky-200 text-sky-900",
  warning: "bg-amber-50 border-amber-200 text-amber-900",
  success: "bg-emerald-50 border-emerald-200 text-emerald-900",
  error: "bg-red-50 border-red-200 text-red-900",
};

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
    <div role={tone === "error" ? "alert" : "status"} className={cn("rounded-xl border p-4 text-sm leading-relaxed", toneClasses[tone], className)}>
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div>{children}</div>
    </div>
  );
}
