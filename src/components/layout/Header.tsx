"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { homeNavItem, navCategories, primaryCtaHref, primaryCtaLabel, type NavCategory } from "@/lib/site-config";
import { liveIndicators } from "@/lib/data/live-snapshot";
import { cn } from "@/lib/utils";

const petrol = liveIndicators.find((i) => i.id === "petrol-price");

function isCategoryActive(category: NavCategory, pathname: string): boolean {
  return category.href === pathname || category.items.some((item) => item.href.split("#")[0] === pathname);
}

function DesktopDropdown({ category, pathname }: { category: NavCategory; pathname: string }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = isCategoryActive(category, pathname);

  function openNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function closeSoon() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1 px-3.5 py-2 text-[13px] font-semibold tracking-wide transition-colors",
          active ? "text-white" : "text-slate-300 hover:text-white"
        )}
      >
        <span className="relative">
          {category.label}
          <span
            className={cn(
              "absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-petrol-500 transition-transform duration-200",
              (active || open) && "scale-x-100"
            )}
            aria-hidden="true"
          />
        </span>
        <svg viewBox="0 0 12 8" className={cn("h-2.5 w-2.5 shrink-0 transition-transform duration-150", open && "rotate-180")} fill="none" aria-hidden="true">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className={cn(
          "absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3 transition-all duration-150",
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#F8F7F4] p-2 shadow-xl shadow-navy-950/20">
          {category.items.map((item) => {
            const itemActive = item.href.split("#")[0] === pathname;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-xl px-3.5 py-2.5 transition-colors",
                  itemActive ? "bg-petrol-500/10" : "hover:bg-white"
                )}
              >
                <span className={cn("block text-sm font-bold", itemActive ? "text-petrol-600" : "text-navy-900")}>{item.label}</span>
                {item.description ? <span className="mt-0.5 block text-xs leading-snug text-charcoal-600">{item.description}</span> : null}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MobileCategory({ category, pathname, onNavigate }: { category: NavCategory; pathname: string; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const active = isCategoryActive(category, pathname);

  return (
    <li className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className={cn("flex w-full items-center justify-between px-1 py-4 text-left text-base font-semibold", active ? "text-white" : "text-slate-200")}
      >
        {category.label}
        <svg viewBox="0 0 12 8" className={cn("h-3 w-3 shrink-0 text-slate-400 transition-transform duration-150", expanded && "rotate-180")} fill="none" aria-hidden="true">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {expanded ? (
        <ul className="pb-3">
          {category.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/95 backdrop-blur supports-[backdrop-filter]:bg-navy-950/85">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-4 transition-[height] duration-200 sm:px-6 lg:px-8",
          scrolled ? "h-14" : "h-[68px]"
        )}
      >
        <div className="flex shrink-0 items-center gap-3">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Logo compact />
          </Link>
          <a
            href="https://www.hkcreativeweb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden whitespace-nowrap border-l border-white/15 pl-3 text-[11px] font-medium text-slate-400 hover:text-slate-200 xl:inline-block"
          >
            Created by HK Creative
          </a>
        </div>

        <nav aria-label="Primary" className="hidden xl:flex xl:items-center">
          <Link
            href={homeNavItem.href}
            className={cn(
              "px-3.5 py-2 text-[13px] font-semibold tracking-wide transition-colors",
              pathname === "/" ? "text-white" : "text-slate-300 hover:text-white"
            )}
          >
            {homeNavItem.label}
          </Link>
          {navCategories.map((category) => (
            <DesktopDropdown key={category.label} category={category} pathname={pathname} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/live-fuel-prices"
            className="hidden items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent-live sm:inline-flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-live" aria-hidden="true" />
            Live
            {petrol ? <span className="text-slate-400">&middot; {petrol.value}p</span> : null}
          </Link>

          <Link
            href={primaryCtaHref}
            className="hidden rounded-full bg-petrol-500 px-4 py-2 text-[13px] font-bold text-white transition-colors hover:bg-petrol-600 xl:inline-block"
          >
            {primaryCtaLabel}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="inline-flex items-center justify-center rounded-md p-2 text-white xl:hidden"
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav id="mobile-menu" aria-label="Mobile" className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-white/10 bg-navy-950 px-4 pb-6 xl:hidden">
          <ul>
            <li className="border-b border-white/10">
              <Link
                href={homeNavItem.href}
                onClick={() => setMobileOpen(false)}
                className={cn("block px-1 py-4 text-base font-semibold", pathname === "/" ? "text-white" : "text-slate-200")}
              >
                {homeNavItem.label}
              </Link>
            </li>
            {navCategories.map((category) => (
              <MobileCategory key={category.label} category={category} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            ))}
          </ul>
          <Link
            href={primaryCtaHref}
            onClick={() => setMobileOpen(false)}
            className="mt-5 block rounded-full bg-petrol-500 px-5 py-3 text-center text-sm font-bold text-white"
          >
            {primaryCtaLabel}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
