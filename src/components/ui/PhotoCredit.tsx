import type { ImageCredit } from "@/lib/data/image-credits";
import { cn } from "@/lib/utils";

export function PhotoCredit({ credit, className }: { credit: ImageCredit; className?: string }) {
  return (
    <p className={cn("text-[10px] leading-snug text-white/60", className)}>
      Photo: {credit.photographer}, via{" "}
      <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/90">
        {credit.source}
      </a>{" "}
      (
      <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/90">
        {credit.license}
      </a>
      )
    </p>
  );
}
