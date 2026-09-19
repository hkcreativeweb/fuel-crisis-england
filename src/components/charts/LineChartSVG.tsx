"use client";

import { useId } from "react";
import type { EconomicSeries } from "@/lib/types";

const WIDTH = 640;
const HEIGHT = 280;
const PADDING = { top: 20, right: 16, bottom: 34, left: 52 };

const PALETTE = ["#d62828", "#111827", "#2563eb", "#7c3aed", "#16a34a"];

function buildPath(values: (number | null)[], innerW: number, innerH: number, min: number, max: number) {
  const range = max - min || 1;
  let path = "";
  let started = false;

  values.forEach((v, i) => {
    if (v === null) {
      started = false;
      return;
    }
    const x = PADDING.left + (i / Math.max(1, values.length - 1)) * innerW;
    const y = PADDING.top + innerH - ((v - min) / range) * innerH;
    path += `${started ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)} `;
    started = true;
  });

  return path.trim();
}

/**
 * Rescale a series so its first non-null point becomes 100 and every
 * other point is shown relative to that baseline. Used when comparing
 * series with different units (e.g. pence/litre vs US$/barrel) — the
 * raw values are never comparable on a shared axis, only the relative
 * change from each series' own starting point is.
 */
function toIndex(values: (number | null)[]): (number | null)[] {
  const base = values.find((v): v is number => v !== null);
  if (base === undefined || base === 0) return values.map(() => null);
  return values.map((v) => (v === null ? null : (v / base) * 100));
}

/**
 * Generic multi-series line chart. Y-axis always starts at 0 (never
 * truncated) so relative differences between series are never visually
 * exaggerated. Renders nothing fancy for missing points — lines break
 * rather than interpolate across gaps. Pass `indexed` when series use
 * different units and should be compared as % change from their own
 * starting value (100) rather than on a shared raw-value axis.
 */
export function LineChartSVG({ series, periods, indexed = false }: { series: EconomicSeries[]; periods: string[]; indexed?: boolean }) {
  const gradientId = useId();
  const innerW = WIDTH - PADDING.left - PADDING.right;
  const innerH = HEIGHT - PADDING.top - PADDING.bottom;

  const seriesValues = series.map((s) => {
    const raw = periods.map((period) => s.points.find((p) => p.period === period)?.value ?? null);
    return indexed ? toIndex(raw) : raw;
  });

  const allValues = seriesValues.flat().filter((v): v is number => v !== null);
  const max = allValues.length ? Math.max(...allValues) * 1.1 : 1;
  const min = 0;

  return (
    <div>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`Line chart: ${series.map((s) => s.label).join(", ")}`} className="w-full">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PALETTE[0]} stopOpacity="0.15" />
            <stop offset="100%" stopColor={PALETTE[0]} stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3, 4].map((i) => {
          const y = PADDING.top + (i / 4) * innerH;
          const value = max - (i / 4) * (max - min);
          return (
            <g key={i}>
              <line x1={PADDING.left} x2={WIDTH - PADDING.right} y1={y} y2={y} stroke="#e2e8f0" strokeWidth="1" />
              <text x={PADDING.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#565b66">
                {value.toFixed(max < 10 ? 1 : 0)}
              </text>
            </g>
          );
        })}

        {series.map((s, sIndex) => {
          const color = PALETTE[sIndex % PALETTE.length];
          const path = buildPath(seriesValues[sIndex], innerW, innerH, min, max);
          return <path key={s.id} d={path} fill="none" stroke={color} strokeWidth="2.5" strokeDasharray={sIndex % 2 === 1 ? "5 4" : undefined} />;
        })}

        {periods.map((period, i) => {
          if (periods.length > 12 && i % Math.ceil(periods.length / 8) !== 0) return null;
          const x = PADDING.left + (i / Math.max(1, periods.length - 1)) * innerW;
          return (
            <text key={period} x={x} y={HEIGHT - 12} textAnchor="middle" fontSize="10" fill="#565b66">
              {period}
            </text>
          );
        })}
      </svg>

      <div className="mt-4 flex flex-wrap items-center gap-5 text-xs font-semibold text-charcoal-700">
        {series.map((s, i) => (
          <span key={s.id} className="inline-flex items-center gap-1.5">
            <span
              className="h-2.5 w-4 rounded-sm"
              style={{
                backgroundColor: i % 2 === 1 ? "transparent" : PALETTE[i % PALETTE.length],
                borderTop: i % 2 === 1 ? `2px dashed ${PALETTE[i % PALETTE.length]}` : undefined,
              }}
            />
            {s.label} ({indexed ? `${s.unit}, indexed` : s.unit})
          </span>
        ))}
      </div>
      {indexed ? (
        <p className="mt-2 text-[11px] text-charcoal-600">
          Each line is indexed to its own starting value = 100, so series in different units (e.g.
          pence/litre vs US$/barrel) can be compared by % change rather than raw size.
        </p>
      ) : null}
    </div>
  );
}
