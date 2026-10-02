"use client";

import { useState } from "react";
import { NewsCard, type NewsCardArticle } from "@/components/news/NewsCard";
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
        <div role="group" aria-label="Filter by publisher" className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Publisher</span>
          {["All publishers", ...publisherChips].map((p) => (
            <Chip
              key={p}
              active={publisher === p}
              onClick={() => {
                setPublisher(p);
                reset();
              }}
            >
              {p}
            </Chip>
          ))}
        </div>
      </div>

      {matches.length === 0 ? (
        <p className="mt-10 text-sm text-charcoal-600">No recent articles match these filters right now. Try another topic or publisher.</p>
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
                {items.slice(0, n).map((a) => (
                  <li key={a.url}>
                    <NewsCard article={a} />
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
            {matches.slice(0, limit("flat", 8)).map((a) => (
              <li key={a.url}>
                <NewsCard article={a} />
              </li>
            ))}
          </ul>
          {matches.length > limit("flat", 8) ? <LoadMore onClick={() => more("flat", 8)} /> : null}
        </section>
      )}
    </div>
  );
}
