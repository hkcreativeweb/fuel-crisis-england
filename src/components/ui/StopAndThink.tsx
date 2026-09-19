import { cn } from "@/lib/utils";

/**
 * A short, evidence-led statement designed to make visitors pause —
 * never an unsupported accusation. See AGENTS/brief: "the evidence
 * itself should create the impact."
 */
export function StopAndThink({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={cn("scroll-mt-24 border-y-2 border-petrol-500/30 bg-navy-950 py-10", className)}>
      <p className="mx-auto max-w-3xl px-6 text-center text-2xl font-extrabold leading-snug text-white sm:text-3xl">
        {children}
      </p>
    </div>
  );
}
