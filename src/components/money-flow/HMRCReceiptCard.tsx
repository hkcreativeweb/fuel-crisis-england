"use client";

import type { HMRCReceipt, DataStatusLabel } from "@/lib/types";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { StatusBadge } from "@/components/ui/StatusBadge";

const periodTypeLabel: Record<HMRCReceipt["periodType"], string> = {
  "financial-year": "Financial year",
  "calendar-year": "Calendar year",
  "part-year": "Part-year (not a full year)",
};

const periodTypeStatus: Record<HMRCReceipt["periodType"], DataStatusLabel> = {
  "financial-year": "historical",
  "calendar-year": "historical",
  "part-year": "ytd",
};

export function HMRCReceiptCard({ receipt }: { receipt: HMRCReceipt }) {
  if (!receipt.verified || receipt.amountGBP === null) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-sm font-semibold text-slate-300">Figures will be added once verified against HMRC.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{receipt.label}</p>
        <StatusBadge status={periodTypeStatus[receipt.periodType]} />
      </div>
      <p className="mt-3 text-5xl font-extrabold tabular-nums text-white sm:text-6xl">
        £
        <AnimatedCounter
          value={receipt.amountGBP}
          formatter={(n) => n.toLocaleString("en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
        />
        {receipt.unit === "billion" ? "bn" : "m"}
      </p>
      <p className="mt-3 text-sm font-semibold text-petrol-300">{receipt.periodLabel}</p>
      <p className="mt-1 text-xs text-slate-400">
        {periodTypeLabel[receipt.periodType]}
        {receipt.isProvisional ? " · provisional figure" : ""}
      </p>
      <a
        href={receipt.sourceUrl ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-petrol-400 underline underline-offset-2 hover:text-petrol-300"
      >
        Where this number comes from: {receipt.source} &rarr;
      </a>
    </div>
  );
}
