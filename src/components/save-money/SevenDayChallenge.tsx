"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "fuel-crisis-england.seven-day-challenge";

const challengeItems = [
  "Checked tyre pressures",
  "Removed unnecessary boot weight",
  "Planned journeys",
  "Combined errands",
  "Avoided unnecessary idling",
  "Driven more smoothly",
  "Checked fuel prices before filling up",
  "Used a route planner",
  "Recorded this week's mileage",
];

const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedState: Record<string, boolean> = {};

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function notify() {
  listeners.forEach((l) => l());
}

function getSnapshot(): Record<string, boolean> {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedState = raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
    } catch {
      cachedState = {};
    }
  }
  return cachedState;
}

const EMPTY_STATE: Record<string, boolean> = {};

function getServerSnapshot(): Record<string, boolean> {
  return EMPTY_STATE;
}

function toggle(item: string) {
  const current = getSnapshot();
  const next = { ...current, [item]: !current[item] };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable — fail silently.
  }
  notify();
}

export function SevenDayChallenge() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const completedCount = challengeItems.filter((item) => state[item]).length;
  const allComplete = completedCount === challengeItems.length;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-navy-900">
          {completedCount} of {challengeItems.length} complete
        </p>
        <div className="h-2.5 w-40 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-petrol-500 transition-[width] duration-500"
            style={{ width: `${(completedCount / challengeItems.length) * 100}%` }}
          />
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        {challengeItems.map((item) => (
          <li key={item}>
            <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 text-sm text-charcoal-700 hover:bg-slate-50">
              <input
                type="checkbox"
                checked={!!state[item]}
                onChange={() => toggle(item)}
                className="mt-0.5 h-4 w-4 rounded border-slate-400 text-petrol-500 focus:ring-petrol-400"
              />
              <span className={state[item] ? "text-charcoal-400 line-through" : "text-navy-900"}>{item}</span>
            </label>
          </li>
        ))}
      </ul>

      {allComplete ? (
        <div className="mt-6 rounded-2xl bg-petrol-50 p-5 text-center">
          <p className="text-base font-bold text-petrol-700">Your fuel-saving checklist is complete.</p>
          <p className="mt-1 text-xs text-charcoal-600">
            Well done — though completing this checklist doesn&apos;t guarantee a particular financial
            saving, since that depends on your own driving, vehicle, and journeys.
          </p>
        </div>
      ) : null}

      <p className="mt-4 text-xs text-charcoal-600">Saved only in this browser, using local storage.</p>
    </div>
  );
}
