"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { formatNumber } from "@/lib/utils";

/**
 * A small, honest visit counter backed by a real Redis-backed API route
 * (src/app/api/visits). Renders nothing if the count can't be loaded,
 * rather than showing a fabricated or stale number.
 */
/** Counts the visit via /api/visits. With `showCount={false}` it still counts but displays nothing. */
export function VisitCounter({ showCount = true }: { showCount?: boolean }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/visits")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.count === "number") setCount(data.count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!showCount || count === null) return null;

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-10">
      <Container>
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal-500">Fuel Crisis England</p>
          <p className="mt-2 text-2xl font-extrabold tabular-nums text-navy-900 sm:text-3xl">{formatNumber(count)} visits</p>
          <p className="mt-1 text-xs text-charcoal-500">Since launch</p>
        </div>
      </Container>
    </section>
  );
}
