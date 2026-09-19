import Image from "next/image";
import type { ImageCredit } from "@/lib/data/image-credits";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { cn } from "@/lib/utils";

export function PhotoDataCallout({
  credit,
  stat,
  statLabel,
  prompt,
  href,
  className,
  minHeight = "min-h-[280px]",
}: {
  credit: ImageCredit;
  stat: string;
  statLabel: string;
  prompt: string;
  href?: string;
  className?: string;
  minHeight?: string;
}) {
  const Wrapper = href ? "a" : "div";
  return (
    <div className={cn("group relative overflow-hidden rounded", minHeight, className)}>
      <Image src={credit.src} alt={credit.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/10" />

      <Wrapper {...(href ? { href } : {})} className="absolute inset-0 flex flex-col justify-end p-6 pb-14 sm:p-8 sm:pb-16">
        <p className="text-4xl font-extrabold tabular-nums text-white sm:text-5xl">{stat}</p>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-slate-300">{statLabel}</p>
        <p className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-petrol-500 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
          {prompt}
        </p>
      </Wrapper>

      <PhotoCredit credit={credit} className="absolute inset-x-6 bottom-4 sm:inset-x-8" />
    </div>
  );
}
