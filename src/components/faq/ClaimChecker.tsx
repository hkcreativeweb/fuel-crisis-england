"use client";

import { useState } from "react";

export type ClaimEvidence = {
  id: string;
  claim: string;
  figures: { label: string; value: string }[];
  shows: string;
  context: string;
  date: string;
  source: { name: string; url: string };
};

/**
 * "Check the claim": pick a common statement and see what the site's own
 * sourced figures show. Deliberately no true/false verdict; the evidence
 * and its limits are shown instead. Evidence is assembled on the server
 * from existing datasets and passed in.
 */
export function ClaimChecker({ claims }: { claims: ClaimEvidence[] }) {
  const [selectedId, setSelectedId] = useState(claims[0]?.id);
  const selected = claims.find((c) => c.id === selectedId) ?? claims[0];
  if (!selected) return null;

  return (
    <div>
      <fieldset>
        <legend className="text-sm font-semibold text-navy-900">Choose a claim</legend>
        <div className="mt-2 flex flex-col gap-2">
          {claims.map((c) => (
            <label
              key={c.id}
              className={
                "flex min-h-11 cursor-pointer items-center gap-3 rounded-md border px-4 py-2 text-sm font-semibold transition-colors " +
                (c.id === selected.id ? "border-navy-900 bg-navy-900 text-white" : "border-slate-300 text-navy-900 hover:bg-slate-50")
              }
            >
              <input
                type="radio"
                name="claim"
                value={c.id}
                checked={c.id === selected.id}
                onChange={() => setSelectedId(c.id)}
                className="h-4 w-4 accent-petrol-500"
              />
              &ldquo;{c.claim}&rdquo;
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 rounded border border-slate-200 bg-white p-5 sm:p-6" aria-live="polite">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-petrol-600">What the evidence shows</p>
        {selected.figures.length > 0 ? (
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {selected.figures.map((f) => (
            <div key={f.label} className="rounded bg-slate-50 p-3">
              <dt className="text-xs font-semibold text-charcoal-600">{f.label}</dt>
              <dd className="mt-1 text-lg font-extrabold tabular-nums text-navy-900">{f.value}</dd>
            </div>
          ))}
          </dl>
        ) : null}
        <p className="mt-4 text-base leading-relaxed text-navy-900">{selected.shows}</p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
          <strong>Context:</strong> {selected.context}
        </p>
        <p className="mt-3 text-xs text-charcoal-600">
          {selected.date} · Source:{" "}
          <a href={selected.source.url} target="_blank" rel="noopener noreferrer" className="-my-3 inline-block py-3 underline underline-offset-2">
            {selected.source.name}
          </a>
        </p>
      </div>
    </div>
  );
}
