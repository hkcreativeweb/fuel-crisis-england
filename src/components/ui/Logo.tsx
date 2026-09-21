import Image from "next/image";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/fuel-pump-icon.png"
      alt=""
      aria-hidden="true"
      width={40}
      height={40}
      className={cn("h-8 w-8 shrink-0 rounded-[10px] object-cover", className)}
    />
  );
}

/**
 * The FCE two-line brand lockup: "FCE" large and bold, with
 * "Fuel Crisis England" directly underneath in smaller text. The whole
 * mark carries a single accessible label so screen readers announce it
 * once, rather than reading "FCE Fuel Crisis England" as disconnected
 * fragments.
 */
export function Logo({ className, dark = false, compact = false }: { className?: string; dark?: boolean; compact?: boolean }) {
  return (
    <span role="img" aria-label="FCE: Fuel Crisis England" className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={compact ? "h-7 w-7" : "h-9 w-9"} />
      <span aria-hidden="true" className="flex flex-col leading-none">
        <span className={cn("font-extrabold tracking-tight", compact ? "text-lg" : "text-xl sm:text-2xl", dark ? "text-navy-900" : "text-white")}>
          FCE
        </span>
        <span className={cn("mt-0.5 font-semibold tracking-wide text-petrol-400", compact ? "text-[9px]" : "text-[10px] sm:text-xs")}>
          Fuel Crisis England
        </span>
      </span>
    </span>
  );
}
