"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { siteConfig } from "@/lib/site-config";
import { petitionPath } from "@/lib/data/take-action-config";
import { cn } from "@/lib/utils";

const petitionUrl = `${siteConfig.url}${petitionPath}`;
const message = "I've signed the Fuel Crisis England petition. Add your voice and share your experience:";

const shareLinks = {
  whatsapp: `https://wa.me/?text=${encodeURIComponent(`${message} ${petitionUrl}`)}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(petitionUrl)}`,
  x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(petitionUrl)}`,
};

const buttonClass =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold tracking-tight transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol-500";
const primary = "bg-petrol-500 text-white hover:bg-petrol-600 active:bg-petrol-600";
const secondary = "border border-slate-300 bg-white text-navy-900 hover:border-navy-900 active:bg-slate-50";

/** Shown after a successful petition submission: confirms the signature, then invites sharing. */
export function PetitionThanks({ signatureCount }: { signatureCount: number | null }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(petitionUrl);
      setCopied("copied");
    } catch {
      setCopied("failed");
    }
    window.setTimeout(() => setCopied("idle"), 3000);
  }

  return (
    <div className="space-y-6">
      <Alert tone="success" title="Your signature has been received.">
        <p>
          {signatureCount !== null ? `You're signature number ${signatureCount}. ` : ""}
          Your experience has been saved privately. We don&apos;t currently publish experiences on the site. If you agreed to public display and we start doing so, it would only be shown
          after review, without your name, email or postcode.
        </p>
      </Alert>

      <section aria-labelledby="thanks-title" className="rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-7">
        <h2 id="thanks-title" ref={headingRef} tabIndex={-1} className="text-2xl font-extrabold tracking-tight text-navy-900 outline-none sm:text-3xl">
          Thank you for signing.
        </h2>
        <p className="mt-2 text-base leading-relaxed text-charcoal-700">Your voice matters. Now help us reach more people.</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className={cn(buttonClass, primary)}>
            Share on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className={cn(buttonClass, secondary)}>
            Share on Facebook<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={shareLinks.x} target="_blank" rel="noopener noreferrer" className={cn(buttonClass, secondary)}>
            Share on X<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button type="button" onClick={copyLink} className={cn(buttonClass, secondary)}>
            Copy petition link
          </button>
        </div>
        <p role="status" aria-live="polite" className="mt-2 min-h-5 text-sm font-semibold text-emerald-800">
          {copied === "copied" ? "Link copied!" : copied === "failed" ? `Couldn't copy automatically. The link is ${petitionUrl}` : ""}
        </p>

        <p className="mt-3 text-xs leading-relaxed text-charcoal-600">
          This is Fuel Crisis England&apos;s own petition. We are an independent initiative, and this is not an official UK Parliament petition.
        </p>

        <Link href="/" className={cn(buttonClass, secondary, "mt-5 sm:w-auto")}>
          Back to Fuel Crisis England
        </Link>
      </section>
    </div>
  );
}
