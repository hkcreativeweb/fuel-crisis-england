"use client";

import { useId, useState } from "react";
import type { FuelPricePoint } from "@/lib/types";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";
import { Alert } from "@/components/ui/Alert";

const WIDTH = 640;
const HEIGHT = 280;
const PADDING = { top: 20, right: 16, bottom: 32, left: 44 };

function buildPath(points: FuelPricePoint[], key: "petrolPencePerLitre" | "dieselPencePerLitre", min: number, max: number) {
  const innerW = WIDTH - PADDING.left - PADDING.right;
  const innerH = HEIGHT - PADDING.top - PADDING.bottom;
  const range = max - min || 1;

  return points
    .map((p, i) => {
      const x = PADDING.left + (i / Math.max(1, points.length - 1)) * innerW;
      const y = PADDING.top + innerH - ((p[key] - min) / range) * innerH;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

type Series = "both" | "petrol" | "diesel";
const seriesOptions: { id: Series; label: string }[] = [
  { id: "both", label: "Both" },
  { id: "petrol", label: "Petrol" },
  { id: "diesel", label: "Diesel" },
];

export function FuelPriceChart({ realData }: { realData: FuelPricePoint[] }) {
  const gradientId = useId();
  const [series, setSeries] = useState<Series>("both");
  const showPetrol = series !== "diesel";
  const showDiesel = series !== "petrol";

  const data = realData;
  const hasData = data.length > 0;

  const allValues = hasData ? data.flatMap((p) => [...(showPetrol ? [p.petrolPencePerLitre] : []), ...(showDiesel ? [p.dieselPencePerLitre] : [])]) : [];
  const min = hasData ? Math.min(...allValues) - 3 : 0;
  const max = hasData ? Math.max(...allValues) + 3 : 1;

  return (
    <div className="rounded border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-navy-900">Historical fuel prices</h3>
        <DataStatusBadge status={hasData ? "historical" : "unavailable"} />
      </div>

      {hasData ? (
        <>
          <div role="group" aria-label="Fuel shown on the chart" className="mt-4 inline-flex rounded-md border border-slate-300 p-0.5">
            {seriesOptions.map((o) => (
              <button
                key={o.id}
                type="button"
                aria-pressed={series === o.id}
                onClick={() => setSeries(o.id)}
                className={"min-h-11 rounded px-4 text-sm font-semibold transition-colors " + (series === o.id ? "bg-navy-900 text-white" : "text-charcoal-700 hover:bg-slate-100")}
              >
                {o.label}
              </button>
            ))}
          </div>
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`Line chart of ${series === "both" ? "petrol and diesel" : series} prices over time`} className="mt-4 w-full">
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0f7577" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0f7577" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[0, 1, 2, 3].map((i) => {
              const y = PADDING.top + (i / 3) * (HEIGHT - PADDING.top - PADDING.bottom);
              const value = max - (i / 3) * (max - min);
              return (
                <g key={i}>
                  <line x1={PADDING.left} x2={WIDTH - PADDING.right} y1={y} y2={y} stroke="#e2e8f0" strokeWidth="1" />
                  <text x={PADDING.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#565b66">
                    {value.toFixed(0)}p
                  </text>
                </g>
              );
            })}

            {showPetrol ? (
              <>
                <path d={`${buildPath(data, "petrolPencePerLitre", min, max)} L${WIDTH - PADDING.right},${HEIGHT - PADDING.bottom} L${PADDING.left},${HEIGHT - PADDING.bottom} Z`} fill={`url(#${gradientId})`} stroke="none" />
                <path d={buildPath(data, "petrolPencePerLitre", min, max)} fill="none" stroke="#0f7577" strokeWidth="2.5" />
              </>
            ) : null}
            {showDiesel ? <path d={buildPath(data, "dieselPencePerLitre", min, max)} fill="none" stroke="#172033" strokeWidth="2.5" strokeDasharray="5 4" /> : null}

            {data.map((p, i) => {
              const innerW = WIDTH - PADDING.left - PADDING.right;
              const x = PADDING.left + (i / Math.max(1, data.length - 1)) * innerW;
              return (
                <text key={p.date} x={x} y={HEIGHT - 10} textAnchor="middle" fontSize="10" fill="#565b66">
                  {new Date(p.date).toLocaleDateString("en-GB", { month: "short" })}
                </text>
              );
            })}
          </svg>

          <div className="mt-4 flex flex-wrap items-center gap-5 text-xs font-semibold text-charcoal-700">
            {showPetrol ? (
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-petrol-500" /> Petrol
              </span>
            ) : null}
            {showDiesel ? (
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-4 border-t-2 border-dashed border-navy-900" /> Diesel
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-charcoal-600">
            UK weekly average pump prices, pence per litre, one point per month (latest week in each month).
            Source: GOV.UK / DESNZ weekly road fuel prices.{" "}
            <a href="/api/fuel-prices/csv" className="font-semibold text-petrol-600 underline underline-offset-2">
              Download the full weekly series (CSV)
            </a>
          </p>
        </>
      ) : (
        <div className="mt-4">
          <Alert tone="warning" title="Historical prices could not be loaded from GOV.UK right now.">
            Please try again later. We do not show estimated figures in their place.
          </Alert>
        </div>
      )}
    </div>
  );
}
