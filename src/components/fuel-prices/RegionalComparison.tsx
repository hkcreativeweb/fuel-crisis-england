"use client";

import { useState } from "react";
import type { RegionalPrice } from "@/lib/types";
import { demoRegionalFuelPrices } from "@/lib/data/fuel-prices";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";
import { Alert } from "@/components/ui/Alert";
import { formatPencePerLitre } from "@/lib/utils";

export function RegionalComparison({ realData }: { realData: RegionalPrice[] }) {
  const [showDemo, setShowDemo] = useState(false);
  const data = showDemo ? demoRegionalFuelPrices : realData;
  const hasData = data.length > 0;

  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-navy-900">Regional comparison</h3>
        <DataStatusBadge status={hasData ? (showDemo ? "demo" : "live") : "unavailable"} />
      </div>

      {hasData ? (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-charcoal-600">
                <th scope="col" className="py-2.5 pr-4">Region</th>
                <th scope="col" className="py-2.5 pr-4">Petrol</th>
                <th scope="col" className="py-2.5">Diesel</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.region} className="border-b border-slate-100 last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-navy-900">{row.region}</td>
                  <td className="py-2.5 pr-4 tabular-nums text-charcoal-700">{formatPencePerLitre(row.petrolPencePerLitre)}</td>
                  <td className="py-2.5 tabular-nums text-charcoal-700">{formatPencePerLitre(row.dieselPencePerLitre)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {showDemo ? (
            <p className="mt-3 text-xs font-semibold text-amber-700">
              This table is showing labelled demo data for interface preview only. It is not real price data.
            </p>
          ) : null}
        </div>
      ) : (
        <div className="mt-4">
          <Alert tone="info" title="Regional price data will appear here once a reliable regional data source is connected.">
            No fabricated regional figures are shown.
          </Alert>
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowDemo((v) => !v)}
        className="mt-5 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-navy-900 hover:bg-slate-50"
      >
        {showDemo ? "Hide demo preview" : "Preview interface with demo data"}
      </button>
    </div>
  );
}
