import "server-only";
import { redis } from "@/lib/server/redis";
import { newsArticles as curatedArticles } from "@/lib/data/take-action-config";

export type NewsTopic = "Fuel" | "Food & Groceries" | "Cost of Living" | "Economy" | "Transport";
export type NewsSection = "Fuel" | "Food" | "Economy";

export type FeedArticle = {
  publisher: string;
  title: string;
  /** ISO timestamp of publication, taken from the feed and validated. */
  date: string;
  /** Short snippet from the publisher's own feed, truncated; empty if none. */
  summary: string;
  url: string;
  topics: NewsTopic[];
  /** Which hub section the article leads in. */
  section: NewsSection;
};

type Feed = { publisher: string; url: string; hosts: string[] };

/** Free public RSS/Atom feeds. To add a publisher, add a line here. Links are only accepted from the listed hosts. */
const FEEDS: Feed[] = [
  { publisher: "BBC News", url: "https://feeds.bbci.co.uk/news/business/rss.xml", hosts: ["bbc.co.uk", "bbc.com"] },
  { publisher: "The Guardian", url: "https://www.theguardian.com/uk/business/rss", hosts: ["theguardian.com"] },
  { publisher: "The Guardian", url: "https://www.theguardian.com/money/rss", hosts: ["theguardian.com"] },
  { publisher: "Sky News", url: "https://feeds.skynews.com/feeds/rss/business.xml", hosts: ["news.sky.com", "sky.com"] },
  { publisher: "CNN", url: "http://rss.cnn.com/rss/money_news_economy.rss", hosts: ["cnn.com", "edition.cnn.com"] },
  { publisher: "Which?", url: "https://www.which.co.uk/news/feed", hosts: ["which.co.uk"] },
  { publisher: "GOV.UK", url: "https://www.gov.uk/search/news-and-communications.atom?keywords=food+prices", hosts: ["gov.uk"] },
  { publisher: "GOV.UK", url: "https://www.gov.uk/search/news-and-communications.atom?keywords=fuel+duty", hosts: ["gov.uk"] },
  { publisher: "GOV.UK", url: "https://www.gov.uk/search/news-and-communications.atom?keywords=cost+of+living", hosts: ["gov.uk"] },
];

/** The publishers whose public RSS/Atom feeds are read automatically (for the transparency note on /news). */
export const feedPublishers = [...new Set(FEEDS.map((f) => f.publisher))];

const REVALIDATE_SECONDS = 60 * 30;
const MAX_AGE_DAYS = 45;
const MAX_ARTICLES = 150;
const SUMMARY_CHARS = 150;

const FUEL = /\b(petrol|diesel|fuel|forecourts?|oil prices?|crude|brent|opec|refiner\w*)\b/i;
const FOOD_DIRECT = /\b(food inflation|grocery inflation|food prices?|grocery prices?|shopping basket)\b/i;
const FOOD_TOPIC =
  /\b(food|foods|grocer(?:y|ies)|supermarkets?|tesco|sainsbury'?s?|asda|morrisons|aldi|lidl|ocado|waitrose|farm(?:er|ers|ing)?|agricultur\w*|harvest|crops?|dairy|wholesale)\b/i;
const COST_ANGLE =
  /\b(prices?|costs?|inflation|bills?|afford\w*|cheaper|dearer|shortages?|supply|squeeze|expensive|rise[sn]?|rising|fell|fall(?:s|ing)?|wages?|subsid\w*|tariffs?|vat)\b/i;
const COL = /\b(cost[- ]of[- ]living|living costs?|household (?:bills?|costs?|budgets?|finances)|energy bills?|price cap|squeeze)\b/i;
const ECON =
  /\b(inflation|cpi|consumer prices?|wages?|pay rises?|interest rates?|bank of england|economy|economic|gdp|tax(?:es|ation)?|budget|chancellor|business costs?|unemployment)\b/i;
const TRANSPORT = /\b(transport|motorists?|drivers?|haulage|freight|rail fares?|bus fares?|roads?|vehicles?|electric cars?)\b/i;

/** Decides whether an article is relevant and which topics it belongs to; null means "not relevant". */
function classify(haystack: string): { topics: NewsTopic[]; section: NewsSection } | null {
  const fuel = FUEL.test(haystack);
  const food = FOOD_DIRECT.test(haystack) || (FOOD_TOPIC.test(haystack) && COST_ANGLE.test(haystack));
  const col = COL.test(haystack);
  const econ = ECON.test(haystack);
  const transport = TRANSPORT.test(haystack) && COST_ANGLE.test(haystack);
  const topics: NewsTopic[] = [];
  if (fuel) topics.push("Fuel");
  if (food) topics.push("Food & Groceries");
  if (col) topics.push("Cost of Living");
  if (econ) topics.push("Economy");
  if (transport) topics.push("Transport");
  if (topics.length === 0) return null;
  return { topics, section: fuel ? "Fuel" : food ? "Food" : "Economy" };
}

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function text(s: string): string {
  return decode(decode(s)).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function tag(block: string, name: string): string {
  const m = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i").exec(block);
  return m ? text(m[1]) : "";
}

function link(block: string): string {
  const atom = /<link[^>]*href="([^"]+)"[^>]*>/i.exec(block);
  return decode(atom ? atom[1] : tag(block, "link")).trim();
}

/** Only http(s) links on the publisher's own domain; query strings (feed tracking) are removed. */
function safeUrl(raw: string, hosts: string[]): string | null {
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    const host = u.hostname.replace(/^www\./, "");
    if (!hosts.some((h) => host === h || host.endsWith(`.${h}`))) return null;
    u.protocol = "https:";
    u.search = "";
    u.hash = "";
    return u.toString();
  } catch {
    return null;
  }
}

function snippet(s: string): string {
  if (s.length <= SUMMARY_CHARS) return s;
  return `${s.slice(0, SUMMARY_CHARS).replace(/\s+\S*$/, "")}…`;
}

function parseFeed(xml: string, feed: Feed): FeedArticle[] {
  const blocks = xml.match(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi) ?? [];
  const now = Date.now();
  const out: FeedArticle[] = [];
  for (const block of blocks) {
    const title = tag(block, "title");
    const url = safeUrl(link(block), feed.hosts);
    const published = Date.parse(tag(block, "pubDate") || tag(block, "updated") || tag(block, "published"));
    if (!title || !url || !Number.isFinite(published)) continue;
    // Unverifiable or future dates are dropped, as are articles too old to count as recent.
    if (published > now + 3_600_000 || now - published > MAX_AGE_DAYS * 86_400_000) continue;

    const description = tag(block, "description") || tag(block, "summary");
    const feedCategories = [...block.matchAll(/<category[^>]*>([\s\S]*?)<\/category>/gi)].map((m) => text(m[1])).join(" ");
    const haystack = `${title} ${description} ${feedCategories}`;
    const result = classify(haystack);
    if (!result) continue;

    out.push({ publisher: feed.publisher, title, date: new Date(published).toISOString(), summary: snippet(description), url, topics: result.topics, section: result.section });
  }
  return out;
}

/** Hand-checked extras (e.g. publishers without a feed), kept in take-action-config.ts and merged into the same list. */
function curated(): FeedArticle[] {
  const now = Date.now();
  return curatedArticles.flatMap((a) => {
    const published = Date.parse(a.date);
    if (!Number.isFinite(published) || published > now + 3_600_000 || now - published > MAX_AGE_DAYS * 86_400_000) return [];
    const result = classify(a.title + " " + a.summary) ?? { topics: ["Fuel" as const], section: "Fuel" as const };
    return [{ publisher: a.source, title: a.title, date: new Date(published).toISOString(), summary: a.summary, url: a.url, ...result }];
  });
}

const NEWS_KEY = "fce:news:latest";

type StoredNews = { articles: FeedArticle[]; retrievedAt: string };

function isStoredNews(v: unknown): v is StoredNews {
  const n = v as StoredNews;
  return !!n && typeof n.retrievedAt === "string" && Array.isArray(n.articles) && n.articles.every((a) => a && typeof a.title === "string" && typeof a.url === "string" && Number.isFinite(Date.parse(a.date)));
}

async function readStoredNews(): Promise<StoredNews | null> {
  const raw = await redis<string>(["GET", NEWS_KEY]);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isStoredNews(parsed) && parsed.articles.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

async function readFeeds(fresh: boolean): Promise<{ articles: FeedArticle[]; anyFeedRead: boolean }> {
  const results = await Promise.allSettled(
    FEEDS.map(async (feed) => {
      const res = await fetch(feed.url, {
        headers: { "User-Agent": "FuelCrisisEngland-NewsReader/1.0 (+https://www.fuelcrisisengland.co.uk)" },
        ...(fresh ? { cache: "no-store" as const } : { next: { revalidate: REVALIDATE_SECONDS } }),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`${feed.publisher} feed responded ${res.status}`);
      return parseFeed(await res.text(), feed);
    })
  );
  const fulfilled = results.filter((r): r is PromiseFulfilledResult<FeedArticle[]> => r.status === "fulfilled");
  const seen = new Set<string>();
  const articles = [...fulfilled.flatMap((r) => r.value), ...curated()]
    .filter((a) => (seen.has(a.url) ? false : (seen.add(a.url), true)))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, MAX_ARTICLES);
  return { articles, anyFeedRead: fulfilled.length > 0 && articles.length > 0 };
}

export type NewsResult = {
  articles: FeedArticle[];
  /** False only when nothing at all is available (no live feed and nothing stored). */
  ok: boolean;
  /** True when the live feeds failed and the last successfully retrieved articles are shown. */
  awaitingUpdate: boolean;
  /** ISO time the articles shown were last successfully retrieved. */
  retrievedAt: string | null;
};

/**
 * THE single news source for the whole site (/news, the homepage preview and
 * Take Action all read this). Page renders read the cached live feeds; if
 * every feed fails they fall back to the last stored good set (saved by the
 * daily cron) and flag it, never to placeholder content.
 */
export async function getNews(): Promise<NewsResult> {
  const live = await readFeeds(false);
  if (live.anyFeedRead) return { articles: live.articles, ok: true, awaitingUpdate: false, retrievedAt: new Date().toISOString() };

  const stored = await readStoredNews();
  if (stored) return { articles: stored.articles, ok: true, awaitingUpdate: true, retrievedAt: stored.retrievedAt };
  return { articles: [], ok: false, awaitingUpdate: false, retrievedAt: null };
}

/** Scheduled refresh: read feeds uncached and, only if valid articles came back, store them as the last-good set. */
export async function refreshNews(): Promise<{ ok: boolean; count?: number; reason?: string }> {
  const live = await readFeeds(true);
  if (!live.anyFeedRead) return { ok: false, reason: "no feed returned valid articles" };
  const saved = await redis(["SET", NEWS_KEY, JSON.stringify({ articles: live.articles, retrievedAt: new Date().toISOString() } satisfies StoredNews)]);
  return saved === null ? { ok: false, reason: "storage unavailable" } : { ok: true, count: live.articles.length };
}
