"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shows a real figure and, when it scrolls into view, counts up to it over ~0.8s. The final text is always the exact
 * value (and is what server-rendering, no-JavaScript and reduced-motion visitors see); only the last few percent animate.
 */
export function CountUp({ value, decimals = 1, className }: { value: number; decimals?: number; className?: string }) {
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") return;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        const from = value * 0.9;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 800);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(from + (value - from) * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
          else setShown(value);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value.toFixed(decimals)}</span>
      <span aria-hidden="true">{shown.toFixed(decimals)}</span>
    </span>
  );
}
