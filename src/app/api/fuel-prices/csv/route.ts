import { desnzWeeklySource, fetchDesnzWeeklyRows } from "@/lib/data/desnz-weekly-prices";

/**
 * The full GOV.UK / DESNZ UK weekly pump price series (2018 onwards) as a
 * CSV download, with source and status metadata in the leading comment
 * lines. Served straight from the same cached fetch the site uses, so it
 * is never staler than the figures shown on the page.
 */
export async function GET() {
  let rows;
  try {
    rows = await fetchDesnzWeeklyRows();
  } catch {
    return new Response("The GOV.UK data could not be loaded right now. Please try again later.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const latest = rows[rows.length - 1].date;
  const lines = [
    `# Source: ${desnzWeeklySource.name} (${desnzWeeklySource.url})`,
    "# Geography: United Kingdom, national weekly average",
    "# Unit: pence per litre, including Fuel Duty and VAT",
    "# Status: official statistics (historical weekly series), not real-time pump prices",
    "# Date column: week commencing (Monday)",
    `# Latest week in this file: ${latest}. Downloaded from fuelcrisisengland.co.uk; figures unchanged from source.`,
    "week_commencing,petrol_ulsp_pence_per_litre,diesel_ulsd_pence_per_litre",
    ...rows.map((r) => `${r.date},${r.petrol},${r.diesel}`),
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="uk-weekly-fuel-prices-to-${latest}.csv"`,
    },
  });
}
