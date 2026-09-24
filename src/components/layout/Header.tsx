"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { navCategories, utilityNav, type NavCategory } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Category = (typeof navCategories)[number];

function pathOf(href: string): string {
  return href.split("#")[0];
}

/**
 * A section is current when you're on its main page or one of its whole-page
 * links. Links to part of another page (with a #) don't count, so only one
 * category is ever marked current.
 */
function isCategoryActive(category: NavCategory, pathname: string): boolean {
  return pathOf(category.href) === pathname || category.items.some((item) => !item.href.includes("#") && item.href === pathname);
}

const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol-300";

/**
 * One desktop dropdown. Open state lives in the Header so only one menu is
 * open at a time. A closed panel is `invisible` (visibility: hidden), which
 * removes its links from the tab order and from assistive technology, not
 * just from view.
 */
function DesktopDropdown({
  category,
  pathname,
  open,
  onToggle,
  onOpen,
  onClose,
  triggerRef,
}: {
  category: Category;
  pathname: string;
  open: boolean;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
}) {
  const panelId = useId();
  const active = isCategoryActive(category, pathname);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function hoverOpen() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    onOpen();
  }
  function hoverClose() {
    closeTimer.current = setTimeout(onClose, 150);
  }

  return (
    <div className="relative" onMouseEnter={hoverOpen} onMouseLeave={hoverClose}>
      <button
        ref={triggerRef}
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={active ? "true" : undefined}
        className={cn(
          "flex min-h-11 items-center gap-1 whitespace-nowrap rounded-md px-2.5 text-[13px] font-semibold tracking-wide transition-colors hover:text-accent-orange xl:px-3.5",
          active ? "text-white" : "text-slate-300",
          focusRing
        )}
      >
        <span className="relative">
          {category.label}
          <span
            className={cn(
              "absolute -bottom-1.5 left-0 h-[2px] w-full origin-left bg-petrol-500 transition-transform duration-200",
              open || active ? "scale-x-100" : "scale-x-0"
            )}
            aria-hidden="true"
          />
        </span>
        <svg viewBox="0 0 12 8" className={cn("h-2.5 w-2.5 shrink-0 transition-transform duration-150", open && "rotate-180")} fill="none" aria-hidden="true">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        id={panelId}
        className={cn(
          // Visibility switches instantly (never animated) so an open menu is usable at once and a closed one
          // leaves the tab order at once; only the fade and slide are animated.
          "absolute top-full z-50 w-80 pt-2 transition-[opacity,transform] duration-150",
          category.align === "right" ? "right-0" : "left-0",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        )}
      >
        <ul className="overflow-hidden rounded border border-slate-200 bg-[#F8F7F4] p-2 shadow-lg shadow-navy-950/10">
          {category.items.map((item) => {
            const itemActive = pathOf(item.href) === pathname && !item.href.includes("#");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={itemActive ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-3.5 py-2.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-petrol-500",
                    itemActive ? "bg-petrol-500/10" : "hover:bg-white"
                  )}
                >
                  <span className={cn("block text-sm font-bold", itemActive ? "text-petrol-600" : "text-navy-900")}>{item.label}</span>
                  {item.description ? <span className="mt-0.5 block text-xs leading-snug text-charcoal-600">{item.description}</span> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function MobileCategory({ category, pathname, onNavigate }: { category: Category; pathname: string; onNavigate: () => void }) {
  const panelId = useId();
  const active = isCategoryActive(category, pathname);
  const [expanded, setExpanded] = useState(active);

  return (
    <li className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={panelId}
        aria-current={active ? "true" : undefined}
        className={cn(
          "flex min-h-12 w-full items-center justify-between rounded-md px-3 text-left text-base font-semibold transition-colors hover:text-accent-orange",
          active ? "text-white" : "text-slate-200",
          focusRing
        )}
      >
        <span className="flex items-center gap-2">
          {active ? <span className="h-1.5 w-1.5 rounded-full bg-petrol-500" aria-hidden="true" /> : null}
          {category.label}
        </span>
        <svg viewBox="0 0 12 8" className={cn("h-3 w-3 shrink-0 text-slate-400 transition-transform duration-150", expanded && "rotate-180")} fill="none" aria-hidden="true">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <ul id={panelId} hidden={!expanded} className="pb-3">
        {category.items.map((item) => {
          const itemActive = pathOf(item.href) === pathname && !item.href.includes("#");
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={itemActive ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center rounded-lg px-3 text-sm font-medium hover:bg-white/5 hover:text-white",
                  itemActive ? "text-white" : "text-slate-300",
                  focusRing
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [barHeight, setBarHeight] = useState(68);
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the bar's real height (it shrinks on scroll) so the mobile menu fills exactly the space below it.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const observer = new ResizeObserver(() => setBarHeight(bar.offsetHeight));
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  const closeMobile = useCallback((restoreFocus: boolean) => {
    setMobileOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  // Close any open menu when the route changes (e.g. after following a link).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- navigation is an external event; menus must reset when it happens
    setOpenCategory(null);
    setMobileOpen(false);
  }, [pathname]);

  // Desktop dropdowns: close on Escape (returning focus to the trigger) and on a click outside the nav.
  useEffect(() => {
    if (!openCategory) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      const trigger = triggerRefs.current[openCategory!];
      setOpenCategory(null);
      trigger?.focus();
    }
    function onPointerDown(e: PointerEvent) {
      if (!desktopNavRef.current?.contains(e.target as Node)) setOpenCategory(null);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openCategory]);

  // Mobile menu: move focus in, keep it inside the header, lock page scroll, close on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const header = headerRef.current;
    const firstItem = mobileMenuRef.current?.querySelector<HTMLElement>("a, button");
    firstItem?.focus();

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMobile(true);
        return;
      }
      if (e.key !== "Tab" || !header) return;
      const focusables = [...header.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter(
        (el) => el.offsetParent !== null
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [mobileOpen, closeMobile]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/95 backdrop-blur supports-[backdrop-filter]:bg-navy-950/85">
      <div
        ref={barRef}
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-200 sm:px-6 lg:px-8",
          scrolled ? "h-14" : "h-[68px]"
        )}
      >
        <Link href="/" aria-label="Fuel Crisis England — Home" className={cn("shrink-0 rounded-md", focusRing)}>
          <Logo compact />
        </Link>

        <nav ref={desktopNavRef} aria-label="Main" className="hidden lg:flex lg:items-center lg:gap-0.5 xl:gap-1">
          {navCategories.map((category) => (
            <DesktopDropdown
              key={category.label}
              category={category}
              pathname={pathname}
              open={openCategory === category.label}
              onToggle={() => setOpenCategory((current) => (current === category.label ? null : category.label))}
              onOpen={() => setOpenCategory(category.label)}
              onClose={() => setOpenCategory((current) => (current === category.label ? null : current))}
              triggerRef={(el) => {
                triggerRefs.current[category.label] = el;
              }}
            />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/live-fuel-prices#this-week"
            className={cn(
              "hidden min-h-11 items-center gap-1.5 rounded-md px-1 text-xs font-bold uppercase tracking-wider text-accent-live sm:inline-flex",
              focusRing
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-live" aria-hidden="true" />
            This week
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => (mobileOpen ? closeMobile(false) : setMobileOpen(true))}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={cn("inline-flex h-11 w-11 items-center justify-center rounded-md text-white lg:hidden", focusRing)}
          >
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
        <nav
          ref={mobileMenuRef}
          id="mobile-menu"
          aria-label="Main"
          style={{ maxHeight: `calc(100dvh - ${barHeight}px)` }}
          className="overflow-y-auto overscroll-contain border-t border-white/10 bg-navy-950 px-4 pb-6 lg:hidden"
        >
          <ul>
            {navCategories.map((category) => (
              <MobileCategory key={category.label} category={category} pathname={pathname} onNavigate={() => closeMobile(false)} />
            ))}
          </ul>
          <ul className="mt-4 grid grid-cols-2 gap-x-4">
            <li className="sm:hidden">
              <Link href="/live-fuel-prices#this-week" onClick={() => closeMobile(false)} className={cn("flex min-h-11 items-center text-sm font-semibold text-accent-live", focusRing)}>
                This week
              </Link>
            </li>
            {utilityNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => closeMobile(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn("flex min-h-11 items-center text-sm font-medium text-slate-400 hover:text-white", focusRing)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
