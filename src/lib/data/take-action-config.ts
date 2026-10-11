/**
 * Single place to update the /take-action page by hand.
 * Nothing here is invented: only add details once they are confirmed.
 */

/**
 * THE one place to update the planned protest. Edit here once and every page
 * (homepage, Take Action, /planned-protest) follows. Do not add anything until
 * it is confirmed. Set an optional field to a string to make it appear;
 * leave it null and it stays hidden.
 */
export const plannedProtest = {
  status: "Planning",
  date: "To be announced",
  time: "To be announced",
  location: "To be announced",
  meetingPoint: null as string | null,
  accessibility: null as string | null,
  participationInfo: null as string | null,
};

/** FCE's own petition page (not an official UK Parliament petition). */
export const petitionPath = "/petition";

export const interestTopics = ["Protest updates", "Petition updates", "Fuel-price updates", "News updates"] as const;

export const shareText =
  "Fuel prices are affecting households, workers and businesses across England. Find out what is happening and how you can make your voice heard.";

export const mpMessageTemplate = `Dear [MP's name],

I am a constituent in [your area] and I am writing about the current cost of fuel. Petrol and diesel prices are placing real pressure on households, workers and businesses in our community.

I would be grateful if you would raise the following with the Government and let me know your views:

1. What is being done about current fuel prices?
2. Whether Fuel Duty will be reviewed during periods of exceptional price rises.
3. Whether fuel-related taxation, including VAT, will be assessed for its effect on motorists and businesses.
4. What support is available for people whose work depends on driving.
5. How fuel-price transparency, from wholesale to forecourt, can be improved.

Thank you for your time. I look forward to your reply.

Yours sincerely,
[Your name]
[Your address and postcode]`;

export type NewsArticle = {
  source: string;
  title: string;
  /** ISO date of publication, as shown on the original article. */
  date: string;
  /** A short paraphrase in our own words, never copied text. */
  summary: string;
  url: string;
};

/**
 * Add new items at the top. Only add articles you have opened and checked:
 * headline, date and link must match the original. Keep summaries to 1-2
 * sentences in your own words.
 */
export const newsArticles: NewsArticle[] = [
  {
    source: "GOV.UK",
    title: "Drivers set to save as petrol prices launch on Google Maps",
    date: "2026-10-08",
    summary:
      "The Department for Energy Security and Net Zero and HM Treasury announce that Google Maps and Waze now show petrol and diesel prices from the government's Fuel Finder scheme. The release says the scheme covers around 99% of fuel sold and could save a car-owning household about £40 a year on average. These are government claims.",
    url: "https://www.gov.uk/government/news/drivers-set-to-save-as-petrol-prices-launch-on-google-maps",
  },
  {
    source: "RAC",
    title: "UK diesel price hits new record high of £2 a litre",
    date: "2026-10-02",
    summary:
      "The RAC reports the UK average diesel price at 200.01p a litre, a new record, and links the rise to supply disruption from the Middle East conflict.",
    url: "https://www.rac.co.uk/drive/news/fuel-news/diesel-price-hits-record-high/",
  },
  {
    source: "ITV News",
    title: "Average UK diesel price passes £2 for first time, RAC says",
    date: "2026-10-02",
    summary: "ITV News reports on the RAC's figures showing the average UK diesel price passing £2 a litre for the first time.",
    url: "https://www.itv.com/news/2026-10-02/average-uk-diesel-price-passes-2-for-first-time-rac-says",
  },
];
