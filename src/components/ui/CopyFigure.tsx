"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const linkButton =
  "inline-flex min-h-11 items-center text-xs font-semibold text-charcoal-500 underline decoration-slate-300 underline-offset-2 hover:text-petrol-600 hover:decoration-petrol-400";

/**
 * Copy and Share buttons for a single statistic. `text` should already
 * include the figure, what it is, its date and its source, so it still
 * makes sense when pasted elsewhere. `path` is the page (and anchor) the
 * shared link points to; no tracking parameters are ever added.
 */
export function CopyFigure({ text, path = "/", className }: { text: string; path?: string; className?: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "shared">("idle");

  const url = () => new URL(path, window.location.origin).toString();

  function flash(next: "copied" | "shared") {
    setStatus(next);
    setTimeout(() => setStatus("idle"), 1500);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${text}\n${url()}`);
      flash("copied");
    } catch {
      // Clipboard API unavailable; fail silently, no UI to break.
    }
  }

  async function share() {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "Fuel Crisis England", text, url: url() });
        flash("shared");
      } catch {
        // The person cancelled the share sheet; nothing to do.
      }
    } else {
      await copy();
    }
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <button type="button" onClick={copy} aria-label={`Copy figure: ${text}`} className={linkButton}>
        {status === "copied" ? "Copied" : "Copy"}
      </button>
      <button type="button" onClick={share} aria-label={`Share figure: ${text}`} className={linkButton}>
        {status === "shared" ? "Shared" : "Share"}
      </button>
    </span>
  );
}
