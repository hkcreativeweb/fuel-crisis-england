import { SafeImage } from "@/components/ui/SafeImage";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { imageCredits } from "@/lib/data/image-credits";
import { cn } from "@/lib/utils";

/** A captioned, credited photograph. `caption` should say what the picture is (and is not) in plain words. */
export function PhotoFigure({
  id,
  caption,
  className,
  aspect = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 560px, 100vw",
  priority = false,
  position = "object-center",
  tone = "light",
}: {
  id: string;
  caption?: string;
  className?: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  position?: string;
  tone?: "light" | "dark";
}) {
  const credit = imageCredits[id];
  return (
    <figure className={className}>
      <div className={cn("relative w-full overflow-hidden rounded-lg bg-slate-200", aspect)}>
        <SafeImage src={credit.src} alt={credit.alt} fill sizes={sizes} priority={priority} className={cn("object-cover", position)} />
      </div>
      {caption ? <figcaption className={cn("mt-2 text-xs leading-snug", tone === "dark" ? "text-slate-300" : "text-charcoal-600")}>{caption}</figcaption> : null}
      <PhotoCredit credit={credit} tone={tone} className="mt-1" />
    </figure>
  );
}
