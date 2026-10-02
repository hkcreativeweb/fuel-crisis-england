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
        <span aria-hidden="true">📞</span> {phoneDisplay}
      </a>
      <a href={`mailto:${email}`} className={link}>
        <span aria-hidden="true">✉️</span> {email}
      </a>
    </address>
  );
}
