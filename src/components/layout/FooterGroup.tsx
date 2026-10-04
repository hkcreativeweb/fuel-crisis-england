"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const QUERY = "(min-width: 640px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * A footer link group: a collapsible section on phones (so the footer stays short) and an
 * always-open column from 640px up. The links are in the HTML either way.
 */
export function FooterGroup({ title, children }: { title: string; children: ReactNode }) {
  const wide = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
  return (
    <details open={wide || undefined} className="group border-b border-white/10 sm:border-0">
      <summary
        onClick={(e) => {
          if (wide) e.preventDefault();
        }}
        className="flex min-h-11 cursor-pointer list-none items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-white sm:min-h-0 sm:cursor-default [&::-webkit-details-marker]:hidden"
      >
        {title}
        <span aria-hidden="true" className="text-base leading-none text-slate-400 transition-transform group-open:rotate-45 sm:hidden">
          +
        </span>
      </summary>
      {children}
    </details>
  );
}
