/**
 * Fuel duty and VAT figures are only ever shown when sourced from a
 * verified, cited official publication (e.g. GOV.UK / HMRC / HM Treasury).
 */
export type TaxFigure = {
  label: string;
  verified: boolean;
  value: string | null;
  effectiveFrom: string | null;
  sourceName: string | null;
  sourceUrl: string | null;
};

export const fuelDutyFigure: TaxFigure = {
  label: "Fuel duty (per litre, petrol and diesel)",
  verified: true,
  value: "52.95 pence per litre",
  effectiveFrom: "A temporary 5p/litre cut, first introduced March 2022, extended at Autumn Budget 2025 to run through 31 December 2026.",
  sourceName: "GOV.UK — Amended Fuel Duty rates: 2026 to 2027",
  sourceUrl: "https://www.gov.uk/government/publications/amended-fuel-duty-rates-for-2026-to-2027/amended-fuel-duty-rates-2026-to-2027",
};

export const vatOnFuelFigure: TaxFigure = {
  label: "VAT on fuel (applied to price + duty)",
  verified: true,
  value: "20% (standard rate)",
  effectiveFrom: "Petrol and diesel are not on GOV.UK's reduced or zero-rate lists, so the standard rate applies.",
  sourceName: "GOV.UK — VAT rates",
  sourceUrl: "https://www.gov.uk/vat-rates",
};
