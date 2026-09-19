import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={cn("h-8 w-8 shrink-0", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="10" fill="#d62828" />
      <path
        d="M13 30V13a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v17"
        stroke="#f8f7f4"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13 30h10" stroke="#f8f7f4" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M23 17h2.2a1.8 1.8 0 0 1 1.8 1.8v6.7a1.5 1.5 0 0 0 3 0v-6a3 3 0 0 0-.9-2.14L27 15.3"
        stroke="#f8f7f4"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 17h4" stroke="#f8f7f4" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
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
    <span role="img" aria-label="FCE — Fuel Crisis England" className={cn("inline-flex items-center gap-2.5", className)}>
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
