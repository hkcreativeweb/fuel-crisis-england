import type { ImageCredit } from "@/lib/data/image-credits";
import { cn } from "@/lib/utils";

export function PhotoCredit({ credit, tone = "dark", className }: { credit: ImageCredit; tone?: "dark" | "light"; className?: string }) {
  const textClass = tone === "dark" ? "text-white/60" : "text-charcoal-500";
  const linkClass = tone === "dark" ? "hover:text-white/90" : "hover:text-navy-900";
  return (
    <p className={cn("text-[10px] leading-snug", textClass, className)}>
      Photo: {credit.photographer}, via{" "}
      <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className={cn("underline underline-offset-2", linkClass)}>
        {credit.source}
      </a>{" "}
      (
      <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className={cn("underline underline-offset-2", linkClass)}>
        {credit.license}
      </a>
      )
    </p>
  );
}
