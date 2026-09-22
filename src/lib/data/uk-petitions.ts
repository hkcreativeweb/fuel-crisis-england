/**
 * Official UK Parliament petitions relating to fuel duty, VAT on fuel and
 * fuel affordability. Verified manually against https://petition.parliament.uk
 * on 22 September 2026 — signature counts and closing dates are a snapshot
 * from that date, not live data (see PetitionsSection's "as of" note).
 *
 * To update: re-check each URL on petition.parliament.uk, update the
 * signatureCount/closingDate/status fields, and add or remove entries as
 * petitions open, close or new ones are published. Only list petitions
 * confirmed "Open" on the official site.
 */
export type UkPetition = {
  id: string;
  title: string;
  summary: string;
  url: string;
  signatureCount: number;
  closingDateIso: string;
  verifiedOnIso: string;
};

export const ukFuelPetitions: UkPetition[] = [
  {
    id: "763674",
    title: "Suspend fuel duty and VAT on fuel until the Iran conflict ends",
    summary:
      "Calls on the Government to suspend fuel duty and VAT on petrol, diesel and domestic gas until the Iran conflict ends, to reduce the impact of rising global oil and gas prices on UK households and businesses.",
    url: "https://petition.parliament.uk/petitions/763674",
    signatureCount: 482,
    closingDateIso: "2026-10-10",
    verifiedOnIso: "2026-09-22",
  },
  {
    id: "764175",
    title: "Reduce fuel duty and remove VAT on petrol and diesel",
    summary:
      "Calls on the Government to reduce fuel duty and remove VAT from petrol and diesel, arguing fuel prices are significantly increased by both, adding to cost-of-living pressure on drivers and businesses.",
    url: "https://petition.parliament.uk/petitions/764175",
    signatureCount: 183,
    closingDateIso: "2026-10-14",
    verifiedOnIso: "2026-09-22",
  },
  {
    id: "766432",
    title: "Cut Fuel Duty by 20p per Litre to Reduce the Cost of Living.",
    summary:
      "Calls for fuel duty to be cut by 20p per litre, arguing this would lower everyday costs and support drivers while the Treasury would still retain a substantial share of fuel tax revenue.",
    url: "https://petition.parliament.uk/petitions/766432",
    signatureCount: 97,
    closingDateIso: "2026-11-01",
    verifiedOnIso: "2026-09-22",
  },
  {
    id: "764577",
    title: "Reduce fuel duty tax to at least half of the current rates",
    summary:
      "Calls on the Government to reduce fuel duty by at least half, arguing this would ease the cost-of-living burden on people who rely on fuel for work and education commutes.",
    url: "https://petition.parliament.uk/petitions/764577",
    signatureCount: 69,
    closingDateIso: "2026-10-23",
    verifiedOnIso: "2026-09-22",
  },
];
