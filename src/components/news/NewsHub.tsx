"use client";

import { useState } from "react";
import { NewsCard, type NewsCardArticle } from "@/components/news/NewsCard";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { imageCredits } from "@/lib/data/image-credits";
import { cn } from "@/lib/utils";

type Article = NewsCardArticle & { topics: string[]; section: "Fuel" | "Food" | "Economy" };

const TOPICS = ["All News", "Fuel", "Food & Groceries", "Cost of Living", "Economy", "Transport"] as const;
const MAIN_PUBLISHERS = ["BBC News", "CNN", "Reuters", "Sky News", "ITV News", "The Guardian", "The Independent", "Financial Times", "The Telegraph", "Bloomberg"];
const OTHER = "Other reputable sources";

const SECTIONS: { key: Article["section"]; id: string; title: string; blurb: string }[] = [
  { key: "Fuel", id: "fuel", title: "Latest Fuel News", blurb: "Petrol and diesel prices, fuel duty, oil, supply and shortages, transport costs and government fuel policy." },
  { key: "Food", id: "food", title: "Food & Essential Costs News", blurb: "Food and grocery prices, supermarkets, food inflation, farming and food supply, and household costs." },
  { key: "Economy", id: "economy", title: "Economy & Cost of Living", blurb: "Inflation, wages, household finances, business and transport costs, energy and taxation." },
];

const STEP = 6;

/**
 * Illustrative topic photos. Every card gets one so the page reads as a consistent grid; they rotate so neighbouring cards differ.
 * They are decorative and never claim to show the story itself.
 */
const TOPIC_IMAGES: Record<string, string[]> = {
  Fuel: ["forecourt-asda", "forecourt-wentworth", "forecourt-close", "hero-petrol-station"],
  "Food & Groceries": ["supermarket-aisle", "delivery-van"],
  "Cost of Living": ["high-street-erdington", "community-notice-board", "commute-traffic"],
  Economy: ["high-street-london", "parliament"],
  Transport: ["motorway-traffic", "bus-stop", "rural-lane"],
};

function imageFor(a: { topics: string[] }, index: number) {
  const list = TOPIC_IMAGES[a.topics[0]] ?? TOPIC_IMAGES.Fuel;
  return imageCredits[list[index % list.length]];
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors",
        active ? "border-navy-900 bg-navy-900 text-white" : "border-slate-300 bg-white text-charcoal-700 hover:border-petrol-400"
      )}
    >
      {children}
    </button>
  );
}

function LoadMore({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mt-5 min-h-11 w-full rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-navy-900 hover:border-navy-900 sm:w-auto">
      Load More
    </button>
  );
}

export function NewsHub({ articles }: { articles: Article[] }) {
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("All News");
  const [publisher, setPublisher] = useState("All publishers");
  const [counts, setCounts] = useState<Record<string, number>>({});

  const present = new Set(articles.map((a) => a.publisher));
  const publisherChips = [
    ...MAIN_PUBLISHERS.filter((p) => present.has(p)),
    ...(articles.some((a) => !MAIN_PUBLISHERS.includes(a.publisher)) ? [OTHER] : []),
  ];

  const matches = articles.filter(
    (a) =>
      (topic === "All News" || a.topics.includes(topic)) &&
      (publisher === "All publishers" || (publisher === OTHER ? !MAIN_PUBLISHERS.includes(a.publisher) : a.publisher === publisher))
  );

  const limit = (key: string, initial: number) => counts[key] ?? initial;
  const more = (key: string, initial: number) => setCounts((c) => ({ ...c, [key]: (c[key] ?? initial) + STEP }));
  const reset = () => setCounts({});

  return (
    <div>
      <div className="space-y-4">
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <Chip
              key={t}
              active={topic === t}
              onClick={() => {
                setTopic(t);
                reset();
              }}
            >
              {t}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="news-publisher" className="text-xs font-bold uppercase tracking-wide text-charcoal-500">
            Publisher
          </label>
          <select
            id="news-publisher"
            value={publisher}
            onChange={(e) => {
              setPublisher(e.target.value);
              reset();
            }}
            className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-navy-900 focus:border-petrol-500 focus:outline-none"
          >
            {["All publishers", ...publisherChips].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <span className="text-xs text-charcoal-500" aria-live="polite">
            {matches.length} {matches.length === 1 ? "article" : "articles"}
          </span>
        </div>
      </div>

      {matches.length === 0 ? (
        <div className="mt-10 rounded border border-slate-200 bg-slate-50 p-5 text-sm text-charcoal-700">
          <p className="font-semibold text-navy-900">No recent articles match these filters.</p>
          <p className="mt-1">We only show relevant, recent stories from the feeds we read, so some combinations have no results right now. Try a different topic or choose all publishers.</p>
        </div>
      ) : topic === "All News" ? (
        SECTIONS.map((section) => {
          const items = matches.filter((a) => a.section === section.key);
          if (items.length === 0) return null;
          const n = limit(section.key, STEP);
          return (
            <section key={section.key} id={section.id} className="mt-12 scroll-mt-24">
              <h2 className="text-2xl font-extrabold text-navy-900">{section.title}</h2>
              <p className="mt-2 max-w-3xl text-sm text-charcoal-600">{section.blurb}</p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {items.slice(0, n).map((a, i) => (
                  <li key={a.url} className={i === 0 ? "sm:col-span-2" : undefined}>
                    <NewsCard article={{ ...a, category: a.topics[0] }} image={imageFor(a, i)} lead={i === 0} />
                  </li>
                ))}
              </ul>
              {items.length > n ? <LoadMore onClick={() => more(section.key, STEP)} /> : null}
            </section>
          );
        })
      ) : (
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold text-navy-900">{topic}</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {matches.slice(0, limit("flat", 8)).map((a, i) => (
              <li key={a.url} className={i === 0 ? "sm:col-span-2" : undefined}>
                <NewsCard article={{ ...a, category: a.topics[0] }} image={imageFor(a, i)} lead={i === 0} />
              </li>
            ))}
          </ul>
          {matches.length > limit("flat", 8) ? <LoadMore onClick={() => more("flat", 8)} /> : null}
        </section>
      )}

      <details className="mt-10 border-t border-slate-200 pt-4">
        <summary className="min-h-11 cursor-pointer text-[11px] font-semibold uppercase tracking-wide text-charcoal-700">Photo credits and licences</summary>
        <p className="mt-1 text-xs text-charcoal-600">The photos on these cards are illustrative and do not show the stories themselves.</p>
        <div className="mt-2 space-y-0.5">
          {[...new Set(Object.values(TOPIC_IMAGES).flat())].map((id) => (
            <PhotoCredit key={id} credit={imageCredits[id]} tone="light" />
          ))}
        </div>
      </details>
    </div>
  );
}
