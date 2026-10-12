import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const { phoneDisplay, phoneHref, email } = siteConfig.contact;

/** Official FCE phone and email as tappable links. Tone "dark" is for navy backgrounds. */
export function ContactDetails({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const link = cn(
    "inline-flex min-h-11 items-center gap-2 break-all font-semibold underline-offset-2 hover:underline sm:min-h-0",
    tone === "dark" ? "text-slate-200" : "text-petrol-600"
  );
  return (
    <address className={cn("flex flex-col gap-1 not-italic", className)}>
      <a href={phoneHref} className={link}>
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg> {phoneDisplay}
      </a>
      <a href={`mailto:${email}`} className={link}>
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg> {email}
      </a>
    </address>
  );
}
