import "server-only";

import { getLatestUkWeeklyAverage, desnzWeeklySource } from "@/lib/data/desnz-weekly-prices";
import { fuelDutyTimeline } from "@/lib/data/fuel-duty-timeline";
import { cmaMarginPoints, cmaMarginSource } from "@/lib/data/cma-margins";
import { fuelDutyReceiptsFullYear } from "@/lib/data/hmrc-receipts";
import { formatDate } from "@/lib/utils";

export type MPTopic = {
  id: string;
  label: string;
  /** A neutral, sourced statement of fact, built from the site's own data. */
  fact: string | null;
  /** An open question asking for the Government's position, not arguing for one. */
  question: string;
  source: { name: string; url: string } | null;
};

/**
 * Topics for the Ask Your MP message. Each fact is read from an existing
 * dataset (so it matches the rest of the site), and each question asks for
 * information or a position without telling the reader what to think.
 */
export async function getMPTopics(): Promise<MPTopic[]> {
  const { figures } = await getLatestUkWeeklyAverage();
  const today = new Date().toISOString().slice(0, 10);
  const dated = fuelDutyTimeline.filter((e) => e.ratePencePerLitre !== null).sort((a, b) => a.date.localeCompare(b.date));
  const duty = [...dated].reverse().find((e) => e.date <= today);
  const upcoming = dated.filter((e) => e.date > today && e.ratePencePerLitre !== duty?.ratePencePerLitre);
  const margins = [...cmaMarginPoints].reverse().find((p) => p.supermarketsPencePerLitre !== null && p.nonSupermarketsPencePerLitre !== null);
  const week = figures.petrol.dataPeriod.charAt(0).toLowerCase() + figures.petrol.dataPeriod.slice(1);

  return [
    {
      id: "fuel-duty",
      label: "Fuel Duty",
      fact: duty
        ? `Fuel Duty is currently ${duty.ratePencePerLitre}p a litre${
            upcoming.length ? `, and is due to change to ${upcoming.map((e) => `${e.ratePencePerLitre}p from ${formatDate(e.date)}`).join(" and ")}` : ""
          }. HMRC reports Fuel Duty receipts of about £${fuelDutyReceiptsFullYear.amountGBP} billion in the ${fuelDutyReceiptsFullYear.periodLabel.toLowerCase()}.`
        : null,
      question:
        "What is the Government's assessment of the effect of Fuel Duty, including any scheduled changes, on households and businesses in this constituency?",
      source: duty ? { name: duty.source, url: duty.sourceUrl } : null,
    },
    {
      id: "vat",
      label: "VAT on fuel",
      fact: "VAT of 20% is charged on the price of road fuel, including the Fuel Duty already added.",
      question: "What is the Government's position on how VAT applies to road fuel, and has it assessed the combined effect of Fuel Duty and VAT on motorists?",
      source: { name: "GOV.UK: VAT rates", url: "https://www.gov.uk/vat-rates" },
    },
    {
      id: "affordability",
      label: "Fuel affordability",
      fact: `The UK average petrol price was ${figures.petrol.current.toFixed(1)}p a litre and diesel ${figures.diesel.current.toFixed(1)}p in the ${week}.`,
      question: "What assessment has been made of fuel costs for lower-income households and for people who depend on driving for work or care?",
      source: { name: desnzWeeklySource.name, url: desnzWeeklySource.url },
    },
    {
      id: "transparency",
      label: "Fuel price transparency",
      fact: "Fuel retailers are required to report price changes to the Government's Fuel Finder open-data scheme.",
      question: "How is the Government monitoring the Fuel Finder scheme, and how will drivers be able to use the data to compare prices?",
      source: { name: "GOV.UK: Fuel Finder", url: "https://www.gov.uk/government/collections/fuel-finder" },
    },
    {
      id: "retail-pricing",
      label: "Retail pricing",
      fact: margins
        ? `The Competition and Markets Authority reported average petrol margins of ${margins.supermarketsPencePerLitre}p a litre at supermarkets and ${margins.nonSupermarketsPencePerLitre}p at other retailers in ${margins.period}.`
        : null,
      question: "What steps, if any, are planned to monitor retail margins and how quickly changes in costs are passed on to drivers?",
      source: { name: cmaMarginSource.name, url: cmaMarginSource.url },
    },
    {
      id: "rural",
      label: "Rural transport",
      fact: null,
      question: "What consideration is being given to people in rural areas who have limited alternatives to driving?",
      source: null,
    },
  ];
}
