"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROMPT_DELAY_MS, dismissPrompt, petitionSigned, promptDismissed, sessionStart } from "@/lib/petition-prompt";

/** Pages where the invitation would be pointless or unwelcome: the petition itself and the admin screens. */
const isQuietPage = (path: string) => path.startsWith("/petition") || path.startsWith("/admin");

/**
 * A small, non-blocking invitation to sign the petition once a visitor has been on the site for 60 seconds. One timer for
 * the whole session (this component lives in the root layout, so navigating does not restart it, and the start time is kept
 * in sessionStorage so a reload does not either). It never appears on the petition or admin pages, after the visitor has
 * closed it, after this browser has signed, while someone is typing in a field, or while the tab is hidden.
 */
export function PetitionPrompt() {
  const pathname = usePathname();
  const pathRef = useRef(pathname);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    pathRef.current = pathname;
  }, [pathname]);

  // The one timer. It is set up once and cleaned up on unmount.
  useEffect(() => {
    if (promptDismissed() || petitionSigned()) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const attempt = () => {
      if (cancelled || promptDismissed() || petitionSigned()) return;
      const active = document.activeElement as HTMLElement | null;
      const typing = !!active && (/^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName) || active.isContentEditable);
      if (document.hidden || typing || isQuietPage(pathRef.current)) {
        timer = setTimeout(attempt, 5000); // try again shortly rather than interrupting
        return;
      }
      returnFocusTo.current = active && active !== document.body ? active : null;
      setOpen(true);
    };

    timer = setTimeout(attempt, Math.max(0, PROMPT_DELAY_MS - (Date.now() - sessionStart())));
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  function close() {
    dismissPrompt();
    setOpen(false);
    const back = returnFocusTo.current;
    if (back && document.contains(back)) back.focus();
  }

  // While open: move focus to the card, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-labelledby="petition-prompt-title"
      aria-describedby="petition-prompt-body"
      tabIndex={-1}
      className="fixed inset-x-3 bottom-3 z-[60] rounded-xl border border-white/15 bg-navy-950 p-4 text-white shadow-2xl outline-none focus:outline-none focus-visible:outline-none motion-safe:animate-[prompt-in_0.25s_ease-out] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[23rem] sm:p-5"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close this invitation"
        className="absolute right-1 top-1 inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-petrol-300"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <p className="pr-10 text-[11px] font-bold uppercase tracking-[0.14em] text-petrol-300">Fuel Crisis England</p>
      <h2 id="petition-prompt-title" className="mt-1 pr-8 text-base font-extrabold leading-snug sm:text-lg">
        You&apos;ve seen why fuel affordability matters. Now help us call for action.
      </h2>
      <p id="petition-prompt-body" className="mt-2 text-sm leading-relaxed text-slate-200">
        Fuel Crisis England is campaigning for meaningful action on fuel affordability, fuel taxation and the cost of living. Add your voice. Sign the petition today.
      </p>
      <div className="mt-3 flex gap-2">
        <Link
          href="/petition#sign-petition"
          onClick={() => dismissPrompt()}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md bg-petrol-500 px-3 text-sm font-bold text-white hover:bg-petrol-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol-300"
        >
          Sign the petition
        </Link>
        <button
          type="button"
          onClick={close}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/30 px-3 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol-300"
        >
          Maybe later
        </button>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-slate-300">An FCE campaign petition, not an official UK Parliament petition. Closing this hides it for the rest of your visit.</p>
    </div>
  );
}
