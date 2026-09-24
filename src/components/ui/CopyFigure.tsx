"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** A small "Copy figure" button that copies a clean text version of a statistic to the clipboard. */
export function CopyFigure({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable; fail silently, no UI to break.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy figure: ${text}`}
      className={cn("text-xs font-semibold text-charcoal-500 underline decoration-slate-300 underline-offset-2 hover:text-petrol-600 hover:decoration-petrol-400", className)}
    >
      {copied ? "Copied" : "Copy figure"}
    </button>
  );
}
