import type { FuelDutyPolicyEvent } from "@/lib/types";

const SPRING_STATEMENT_2022 =
  "https://www.gov.uk/government/publications/temporary-cut-to-fuel-duty/spring-statement-2022-fuel-duty-factsheet";
const AMENDED_RATES_2026_27 =
  "https://www.gov.uk/government/publications/amended-fuel-duty-rates-for-2026-to-2027/amended-fuel-duty-rates-2026-to-2027";
const SI_2026_555 = "https://www.legislation.gov.uk/uksi/2026/555/made";
const ORIGINAL_RATES_2026_27 =
  "https://www.gov.uk/government/publications/fuel-duty-rates-for-2026-to-2027/fuel-duty-rates-2026-to-2027";

/**
 * Fuel Duty is not a fixed natural law — it is a tax rate set through UK
 * government policy, changed via Budgets, Autumn Statements, and
 * statutory instruments. Every entry here is independently verified
 * against GOV.UK or legislation.gov.uk. `status` must never present a
 * proposed or superseded plan as if it were current or confirmed.
 */
export const fuelDutyTimeline: FuelDutyPolicyEvent[] = [
  {
    id: "pre-2022-base-rate",
    date: "2011-03-23",
    status: "previous",
    title: "Pre-2022 base rate",
    description:
      "Budget 2011's 'fuel duty stabiliser' cut the rate by 1p, from 58.95p to 57.95p. It then stood unchanged for almost exactly 11 years, until the Spring Statement 2022 cut below. See the full 1989–2022 history further down this page.",
    ratePencePerLitre: 57.95,
    source: "GOV.UK — Amended Fuel Duty rates: 2026 to 2027",
    sourceUrl: AMENDED_RATES_2026_27,
    verified: true,
  },
  {
    id: "2022-03-cut-introduced",
    date: "2022-03-23",
    status: "previous",
    title: "Spring Statement 2022: temporary 5p/litre cut",
    description:
      "In response to fuel prices and the invasion of Ukraine, the Chancellor cut Fuel Duty by 5p/litre, from 57.95p to 52.95p, initially for 12 months.",
    ratePencePerLitre: 52.95,
    source: "GOV.UK — Spring Statement 2022 Fuel Duty factsheet",
    sourceUrl: SPRING_STATEMENT_2022,
    verified: true,
  },
  {
    id: "2023-03-extension",
    date: "2023-03-15",
    status: "previous",
    title: "Spring Budget 2023: cut extended",
    description: "The 5p cut was extended for a further 12 months, cancelling a previously planned RPI increase.",
    ratePencePerLitre: 52.95,
    source: "HM Treasury Spring Budget 2023",
    sourceUrl: AMENDED_RATES_2026_27,
    verified: true,
  },
  {
    id: "2024-03-extension",
    date: "2024-03-06",
    status: "previous",
    title: "Spring Budget 2024: cut extended again",
    description: "The 5p cut was extended again, with the rate remaining at 52.95p.",
    ratePencePerLitre: 52.95,
    source: "HM Treasury Spring Budget 2024",
    sourceUrl: AMENDED_RATES_2026_27,
    verified: true,
  },
  {
    id: "2024-10-extension",
    date: "2024-10-30",
    status: "previous",
    title: "Autumn Budget 2024: cut extended a further year",
    description: "The 5p cut was extended for a further 12 months, pushing its scheduled expiry to 22 March 2026.",
    ratePencePerLitre: 52.95,
    source: "GOV.UK / HM Treasury Autumn Budget 2024",
    sourceUrl: AMENDED_RATES_2026_27,
    verified: true,
  },
  {
    id: "2025-11-extension-superseded",
    date: "2025-11-26",
    status: "previous",
    title: "Autumn Budget 2025: further extension, later revised",
    description:
      "The 5p cut was extended by a further 5 months to 31 August 2026, with a phased reversal originally scheduled for 1 September and 1 December 2026. This specific schedule was subsequently superseded by a statutory instrument in May 2026 — see below.",
    ratePencePerLitre: 52.95,
    source: "GOV.UK — Fuel duty rates: 2026 to 2027 (original schedule, since amended)",
    sourceUrl: ORIGINAL_RATES_2026_27,
    verified: true,
  },
  {
    id: "2026-current",
    date: "2026-06-15",
    status: "current",
    title: "Current rate, extended to 31 December 2026",
    description:
      "A statutory instrument (SI 2026/555) cancelled the previously scheduled September and December 2026 increases and extended the 52.95p rate to run through 31 December 2026.",
    ratePencePerLitre: 52.95,
    source: "The Excise Duties (Surcharges or Rebates) (Hydrocarbon Oils etc.) (Amendment) Order 2026 (SI 2026/555)",
    sourceUrl: SI_2026_555,
    verified: true,
  },
  {
    id: "2027-01-announced",
    date: "2027-01-01",
    status: "announced",
    title: "Confirmed rate change: 1 January 2027",
    description: "SI 2026/555 confirms the rate rises to 55.95 pence per litre from this date — a partial unwinding of the 2022 cut.",
    ratePencePerLitre: 55.95,
    source: "GOV.UK — Amended Fuel Duty rates: 2026 to 2027",
    sourceUrl: AMENDED_RATES_2026_27,
    verified: true,
  },
  {
    id: "2027-03-announced",
    date: "2027-03-01",
    status: "announced",
    title: "Confirmed rate change: 1 March 2027",
    description:
      "SI 2026/555 confirms the rate rises to 57.95 pence per litre from this date — a full return to the rate that applied before the March 2022 cut.",
    ratePencePerLitre: 57.95,
    source: "GOV.UK — Amended Fuel Duty rates: 2026 to 2027",
    sourceUrl: AMENDED_RATES_2026_27,
    verified: true,
  },
  {
    id: "2027-04-proposed",
    date: "2027-04-01",
    status: "proposed",
    title: "Possible return to RPI-linked uprating",
    description:
      "The Government has stated an intention to resume RPI-linked (inflation-linked) annual increases from this point. This is a stated policy intention only — it is not yet set in legislation, and no confirmed rate exists for this or any later date.",
    ratePencePerLitre: null,
    source: "HM Treasury Budget statements (policy intention, not yet legislated)",
    sourceUrl: AMENDED_RATES_2026_27,
    verified: true,
  },
];

const HMRC_TABLE_2 =
  "https://researchbriefings.files.parliament.uk/documents/SN04800/SN04800.pdf";
const DESNZ_WEEKLY =
  "https://www.gov.uk/government/statistics/weekly-road-fuel-prices";

/**
 * 1989–2022 Fuel Duty rate-change history, from two independently
 * verified primary sources:
 *
 * - 1989–2007: House of Commons Library briefing "Fuel duty: key
 *   statistics" (SN/EP/4800, 16 July 2008), Table 2 "Hydrocarbon Oil
 *   Duty Rates" — itself citing HMRC's own Hydrocarbon Oils Statistical
 *   Bulletin. Dates and rates are exact "date of change" entries from
 *   that table (unleaded petrol rate; from 1 October 2000, the newly
 *   introduced Ultra Low Sulphur Petrol rate, which became the
 *   standard rate as ULSP became near-universal at UK forecourts).
 * - 2008–2022: GOV.UK/DESNZ's weekly road fuel prices dataset (the
 *   same primary source used in pump-price-history.ts), which reports
 *   the Fuel Duty rate in force each week. These entries use the date
 *   of the first weekly report at each new rate, labelled as such —
 *   we do not assert a specific legislated effective date beyond what
 *   the source itself states.
 *
 * Every entry is a genuine rate change; we did not interpolate or
 * estimate between the two sources, and the two overlap (Oct 2003 to
 * Oct 2007) with matching values, cross-confirming both.
 */
export const fuelDutyHistoricalEvents: FuelDutyPolicyEvent[] = [
  { id: "hist-1989-03", date: "1989-03-14", status: "previous", title: "14 March 1989", description: "Unleaded petrol duty rate set in the 1989 Budget.", ratePencePerLitre: 17.72, source: "House of Commons Library, SN/EP/4800, Table 2 (HMRC Hydrocarbon Oils Statistical Bulletin)", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-1990-03", date: "1990-03-20", status: "previous", title: "20 March 1990", description: "Unleaded petrol duty rate set in the 1990 Budget.", ratePencePerLitre: 19.49, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-1991-03", date: "1991-03-19", status: "previous", title: "19 March 1991", description: "Unleaded petrol duty rate set in the 1991 Budget.", ratePencePerLitre: 22.41, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-1992-03", date: "1992-03-10", status: "previous", title: "10 March 1992", description: "Unleaded petrol duty rate set in the 1992 Budget.", ratePencePerLitre: 23.42, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-1993-03", date: "1993-03-16", status: "previous", title: "16 March 1993", description: "Unleaded petrol duty rate set in the March 1993 Budget.", ratePencePerLitre: 25.76, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-1993-11", date: "1993-11-30", status: "previous", title: "30 November 1993 — the 'fuel duty escalator' begins", description: "The Autumn 1993 Budget committed to raising Fuel Duty by at least 3% above inflation every year (later raised to 5%, then 6%) — the policy that became known as the fuel duty escalator.", ratePencePerLitre: 28.32, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-1994-11", date: "1994-11-29", status: "previous", title: "29 November 1994", description: "Escalator-driven increase.", ratePencePerLitre: 30.44, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-1995-01", date: "1995-01-01", status: "previous", title: "1 January 1995", description: "Rate change recorded by HMRC at the start of 1995.", ratePencePerLitre: 31.32, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-1995-11", date: "1995-11-28", status: "previous", title: "28 November 1995", description: "Escalator-driven increase.", ratePencePerLitre: 34.3, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-1996-11", date: "1996-11-26", status: "previous", title: "26 November 1996", description: "The rate that was in force when the Labour government took office in May 1997.", ratePencePerLitre: 36.86, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-1997-07", date: "1997-07-02", status: "previous", title: "2 July 1997", description: "Rate set in the new Labour government's first Budget, which increased the escalator commitment to 6% above inflation per year.", ratePencePerLitre: 40.28, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-1998-03", date: "1998-03-17", status: "previous", title: "17 March 1998", description: "Escalator-driven increase.", ratePencePerLitre: 43.99, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-1999-03", date: "1999-03-09", status: "previous", title: "9 March 1999", description: "The last escalator-driven increase before the policy was discontinued.", ratePencePerLitre: 47.21, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-2000-03", date: "2000-03-21", status: "previous", title: "21 March 2000", description: "Standard unleaded petrol rate — the fuel duty escalator had already been abandoned by this point.", ratePencePerLitre: 48.82, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-2000-10", date: "2000-10-01", status: "previous", title: "1 October 2000 — Ultra Low Sulphur Petrol introduced", description: "Following the September 2000 fuel price protests, a new Ultra Low Sulphur Petrol (ULSP) duty rate was introduced below the standard unleaded rate, to encourage cleaner fuel. ULSP became the near-universal UK forecourt fuel within a few years, so from this point we track its rate as the headline figure.", ratePencePerLitre: 47.82, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-2001-03", date: "2001-03-07", status: "previous", title: "7 March 2001", description: "ULSP rate cut in the 2001 Budget.", ratePencePerLitre: 45.82, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-2003-10", date: "2003-10-01", status: "previous", title: "1 October 2003", description: "This is the same rate independently confirmed by GOV.UK's weekly road fuel prices series, which begins tracking from June 2003 — the two primary sources agree exactly.", ratePencePerLitre: 47.1, source: "House of Commons Library, SN/EP/4800, Table 2; cross-confirmed by GOV.UK/DESNZ weekly road fuel prices", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-2006-12", date: "2006-12-07", status: "previous", title: "7 December 2006", description: "Rate increase.", ratePencePerLitre: 48.35, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-2007-10", date: "2007-10-01", status: "previous", title: "1 October 2007", description: "The last rate change directly documented in the 2008 House of Commons Library briefing; later changes below are sourced to GOV.UK's own weekly price series.", ratePencePerLitre: 50.35, source: "House of Commons Library, SN/EP/4800, Table 2", sourceUrl: HMRC_TABLE_2, verified: true },
  { id: "hist-2008-12", date: "2008-12-01", status: "previous", title: "December 2008", description: "Widely reported at the time as a duty increase timed to partially offset the temporary VAT cut (17.5% to 15%) introduced the same month, so the pump price effect of the VAT cut was smaller than it would otherwise have been.", ratePencePerLitre: 52.35, source: "GOV.UK/DESNZ weekly road fuel prices (first weekly report at this rate)", sourceUrl: DESNZ_WEEKLY, verified: true },
  { id: "hist-2009-04", date: "2009-04-06", status: "previous", title: "April 2009", description: "Rate increase.", ratePencePerLitre: 54.19, source: "GOV.UK/DESNZ weekly road fuel prices (first weekly report at this rate)", sourceUrl: DESNZ_WEEKLY, verified: true },
  { id: "hist-2009-09", date: "2009-09-07", status: "previous", title: "September 2009", description: "Rate increase.", ratePencePerLitre: 56.19, source: "GOV.UK/DESNZ weekly road fuel prices (first weekly report at this rate)", sourceUrl: DESNZ_WEEKLY, verified: true },
  { id: "hist-2010-04", date: "2010-04-05", status: "previous", title: "April 2010", description: "Rate increase.", ratePencePerLitre: 57.19, source: "GOV.UK/DESNZ weekly road fuel prices (first weekly report at this rate)", sourceUrl: DESNZ_WEEKLY, verified: true },
  { id: "hist-2010-10", date: "2010-10-04", status: "previous", title: "October 2010", description: "Rate increase.", ratePencePerLitre: 58.19, source: "GOV.UK/DESNZ weekly road fuel prices (first weekly report at this rate)", sourceUrl: DESNZ_WEEKLY, verified: true },
  { id: "hist-2011-01", date: "2011-01-03", status: "previous", title: "January 2011", description: "Rate increase — the peak rate before the 2011 Budget cut below.", ratePencePerLitre: 58.95, source: "GOV.UK/DESNZ weekly road fuel prices (first weekly report at this rate)", sourceUrl: DESNZ_WEEKLY, verified: true },
];
