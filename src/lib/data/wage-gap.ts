import type { WageGapMeasure } from "@/lib/types";

function emptySeries(id: string, label: string, unit: string) {
  return {
    id,
    label,
    unit,
    nominal: true,
    points: [],
    source: "Not yet verified",
    sourceUrl: null,
    asOf: null,
    status: "unavailable" as const,
  };
}

/**
 * "Wage gap" means different things depending on what's being compared.
 * We define each measurement explicitly rather than using the phrase
 * ambiguously, per the site's accuracy policy.
 */
export const wageGapMeasures: WageGapMeasure[] = [
  {
    id: "min-vs-median",
    title: "Minimum wage vs median wage",
    explanation:
      "Compares the statutory minimum hourly rate to the median hourly wage across all employees. This shows how far the wage floor sits below typical pay — it does not measure how many people are paid the minimum, or how pay is distributed above it.",
    series: [emptySeries("min-vs-median", "Minimum wage as % of median wage", "%")],
  },
  {
    id: "low-vs-high-paid",
    title: "Low-paid workers vs high-paid workers",
    explanation:
      "Compares earnings at a low percentile of the pay distribution (e.g. the 10th percentile) against a high percentile (e.g. the 90th percentile). This is a common way economists measure overall pay inequality, sometimes called the '90:10 ratio'.",
    series: [emptySeries("low-vs-high", "90:10 earnings ratio", "ratio")],
  },
  {
    id: "average-vs-executive",
    title: "Average earnings vs executive compensation",
    explanation:
      "Compares typical employee pay at a company or across the economy to the total compensation of senior executives or CEOs. This measures a different thing again — internal pay dispersion within organisations, rather than the pay floor or the whole distribution.",
    series: [emptySeries("avg-vs-exec", "CEO-to-median-worker pay ratio", "ratio")],
  },
  {
    id: "pay-growth-vs-inflation",
    title: "Pay growth vs inflation",
    explanation:
      "Compares how fast wages are rising to how fast prices are rising (CPI/CPIH). If pay growth is below inflation, real (inflation-adjusted) pay is falling even if the pound amount on a payslip is going up.",
    series: [
      emptySeries("wage-growth", "Nominal wage growth", "% per year"),
      emptySeries("inflation-rate", "Inflation rate (CPI)", "% per year"),
    ],
  },
  {
    id: "income-distribution",
    title: "Income distribution",
    explanation:
      "Looks at how total household income is shared across the population — for example the share held by the top and bottom fifths of households. This is a broader measure of inequality than any single pay comparison, and includes income from sources other than wages.",
    series: [emptySeries("income-distribution", "Income share by quintile", "%")],
  },
];
