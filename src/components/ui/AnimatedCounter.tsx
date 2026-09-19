"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({
  value,
  duration = 1200,
  formatter,
  className,
}: {
  value: number;
  duration?: number;
  formatter?: (n: number) => string;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const effectiveDuration = prefersReducedMotion ? 0 : duration;

    let raf: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = effectiveDuration === 0 ? 1 : Math.min(1, elapsed / effectiveDuration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {formatter ? formatter(display) : Math.round(display).toLocaleString("en-GB")}
    </span>
  );
}
