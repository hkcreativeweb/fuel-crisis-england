import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  tone = "light",
}: {
  className?: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "rounded border p-6",
        tone === "light" ? "border-slate-200 bg-white" : "border-white/10 bg-navy-800/60",
        className
      )}
    >
      {children}
    </div>
  );
}
