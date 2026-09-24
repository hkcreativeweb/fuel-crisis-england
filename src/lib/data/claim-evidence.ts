import "server-only";

import type { ClaimEvidence } from "@/components/faq/ClaimChecker";
import { getLatestUkWeeklyAverage, desnzWeeklySource } from "@/lib/data/desnz-weekly-prices";
import { fuelDutyTimeline } from "@/lib/data/fuel-duty-timeline";
import { europeFuelPrices, europeFuelPriceSource } from "@/lib/data/europe-fuel-prices";
import { cmaMarginPoints, cmaMarginSource, cmaPassThroughFindings } from "@/lib/data/cma-margins";
import { formatDate } from "@/lib/utils";

/**
 * Evidence for the "Check the claim" tool. Every number is read from an
 * existing, sourced dataset on this site; nothing here is typed in fresh.
 * Claims are common statements people make about fuel prices, written
 * neutrally, with no true/false verdict.
 */
export async function getClaimEvidence(): Promise<ClaimEvidence[]> {
  const { figures } = await getLatestUkWeeklyAverage();
  const petrol = figures.petrol.current;
  const today = new Date().toISOString().slice(0, 10);
  const dated = fuelDutyTimeline.filter((e) => e.ratePencePerLitre !== null).sort((a, b) => a.date.localeCompare(b.date));
  const duty = [...dated].reverse().find((e) => e.date <= today);
  const dutyRate = duty?.ratePencePerLitre ?? 0;
  const vat = petrol / 6; // 20% VAT is one-sixth of a VAT-inclusive price
  const taxShare = Math.round(((dutyRate + vat) / petrol) * 100);
  const upcoming = dated.filter((e) => e.date > today && e.ratePencePerLitre !== dutyRate);
  // When the current rate first took effect, and what it replaced (a cut or a rise).
  const sinceIndex = (() => {
    let i = dated.indexOf(duty!);
    while (i > 0 && dated[i - 1].ratePencePerLitre === dutyRate) i--;
    return i;
  })();
  const since = dated[sinceIndex];
  const previousRate = sinceIndex > 0 ? dated[sinceIndex - 1].ratePencePerLitre : null;
  const diesel = figures.diesel.current;

  const byPetrol = [...europeFuelPrices].sort((a, b) => b.petrol.totalEUR - a.petrol.totalEUR);
  const ukRank = byPetrol.findIndex((c) => c.isUK) + 1;
  const uk = byPetrol[ukRank - 1];
  const top = byPetrol[0];

  const latestMargins = cmaMarginPoints[cmaMarginPoints.length - 1];
  const marginPeriods = cmaMarginPoints.filter((p) => p.supermarketsPencePerLitre !== null && p.nonSupermarketsPencePerLitre !== null);
  const supermarketLower = marginPeriods.filter((p) => p.supermarketsPencePerLitre! < p.nonSupermarketsPencePerLitre!).length;
  const weekLabel = figures.petrol.dataPeriod;

  return [
    {
      id: "mostly-tax",
      claim: "Most of what I pay at the pump is tax.",
      figures: [
        { label: "Average petrol price", value: `${petrol.toFixed(1)}p` },
        { label: "Fuel Duty", value: `${dutyRate}p` },
        { label: "VAT (calculated)", value: `${vat.toFixed(1)}p` },
      ],
      shows: `Tax is about ${taxShare}% of the average petrol price: close to half, but not most of it.`,
      context:
`Fuel Duty is a fixed amount per litre, so its share falls when pump prices rise and grows when they fall. VAT is always one-sixth of the pump price. Diesel is ${diesel.toFixed(1)}p, so tax is about ${Math.round(((dutyRate + diesel / 6) / diesel) * 100)}% of a diesel litre.`,
      date: `${weekLabel}; Fuel Duty rate in force`,
      source: { name: desnzWeeklySource.name, url: desnzWeeklySource.url },
    },
    {
      id: "duty-keeps-rising",
      claim: "Fuel Duty keeps going up.",
      figures: [
        { label: "Current rate", value: `${dutyRate}p` },
        ...(previousRate !== null ? [{ label: "Previous rate", value: `${previousRate}p` }] : []),
        ...upcoming.slice(0, 1).map((e) => ({ label: `From ${formatDate(e.date)}`, value: `${e.ratePencePerLitre}p` })),
      ],
      shows: `Fuel Duty has been ${dutyRate}p a litre since ${since ? formatDate(since.date) : "its last change"}${
        previousRate !== null ? `, when it was ${previousRate > dutyRate ? "cut" : "raised"} from ${previousRate}p` : ""
      }. It has not changed since.${
        upcoming.length ? ` Increases are now confirmed in law: ${upcoming.map((e) => `${e.ratePencePerLitre}p from ${formatDate(e.date)}`).join(", then ")}.` : ""
      }`,
      context: "Whether a rate is current, confirmed or only proposed is labelled on the full Fuel Duty timeline.",
      date: duty ? duty.title : "Current rate",
      source: { name: duty?.source ?? "GOV.UK", url: duty?.sourceUrl ?? "https://www.gov.uk" },
    },
    {
      id: "most-expensive-in-europe",
      claim: "The UK has the most expensive petrol in Europe.",
      figures: [
        { label: "UK rank (1 = most expensive)", value: `${ukRank} of ${byPetrol.length}` },
        { label: "UK petrol", value: `€${uk.petrol.totalEUR.toFixed(2)}/L` },
        { label: `Most expensive (${top.country})`, value: `€${top.petrol.totalEUR.toFixed(2)}/L` },
      ],
      shows: `In that week, UK petrol was the ${ukRank}${ukRank === 1 ? "st" : ukRank === 2 ? "nd" : ukRank === 3 ? "rd" : "th"} most expensive of ${byPetrol.length} countries (the UK and the 27 EU members).`,
      context:
        "Prices are converted to euros, so exchange-rate moves change the ranking. Wages and living costs also differ between countries, so a lower price isn't necessarily more affordable.",
      date: `Week of ${formatDate(europeFuelPriceSource.dataDate)}`,
      source: { name: europeFuelPriceSource.name, url: europeFuelPriceSource.url },
    },
    {
      id: "supermarkets-margins",
      claim: "Supermarkets make less per litre than other forecourts.",
      figures: [
        { label: `Supermarkets, ${latestMargins.period}`, value: `${latestMargins.supermarketsPencePerLitre}p` },
        { label: `Other retailers, ${latestMargins.period}`, value: `${latestMargins.nonSupermarketsPencePerLitre}p` },
        { label: "All retailers", value: `${latestMargins.allRetailersPencePerLitre}p` },
      ],
      shows: `${
        supermarketLower === marginPeriods.length
          ? "In each period shown, supermarkets' average petrol margin per litre was lower than other retailers'"
          : `Supermarkets' average petrol margin was lower in ${supermarketLower} of ${marginPeriods.length} periods shown`
      } (${marginPeriods.map((p) => `${p.period}: ${p.supermarketsPencePerLitre}p vs ${p.nonSupermarketsPencePerLitre}p`).join("; ")}).`,
      context:
        "A margin isn't profit: it has to cover staff, rent, energy and card fees. Individual stations vary, and a higher price isn't automatically wrongdoing.",
      date: `Published ${cmaMarginSource.publicationDate}`,
      source: { name: cmaMarginSource.name, url: cmaMarginSource.url },
    },
    {
      id: "falls-as-fast",
      claim: "When oil prices fall, pump prices fall just as fast.",
      figures: [],
      shows: cmaPassThroughFindings.petrol,
      context: cmaPassThroughFindings.nextReport,
      date: `Published ${cmaMarginSource.publicationDate}`,
      source: { name: cmaMarginSource.name, url: cmaMarginSource.url },
    },
  ];
}
