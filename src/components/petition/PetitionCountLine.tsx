"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { formatNumber } from "@/lib/utils";

/**
 * A compact "N of 25,000 signed" line with a thin progress bar. The count comes from the same
 * Redis counter as the petition page, fetched when the page loads so it stays live on cached pages.
 * Nothing is shown until a real figure arrives: never an estimate.
 */
export function PetitionCountLine({ className }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null);
  const target = siteConfig.petitionTarget;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/petition", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count: number | null } | null) => {
        if (!cancelled && data && typeof data.count === "number") setCount(data.count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const progress = count === null ? 0 : Math.min(100, (count / target) * 100);

  return (
    <div className={className} aria-live="polite">
      {count === null ? (
        <p className="min-h-5 text-sm font-semibold text-charcoal-700">&nbsp;</p>
      ) : (
        <>
          <p className="text-sm font-semibold text-navy-900">
            <span className="tabular-nums">{formatNumber(count)}</span> of <span className="tabular-nums">{formatNumber(target)}</span> signed
          </p>
          <div
            className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Petition progress toward target"
          >
            <div className="h-full rounded-full bg-petrol-500" style={{ width: `${progress}%` }} />
          </div>
        </>
      )}
    </div>
  );
}
