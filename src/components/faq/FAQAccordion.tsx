"use client";

import { useId, useState } from "react";
import type { Faq } from "@/lib/data/faqs";
import { cn } from "@/lib/utils";

export function FAQAccordion({ items }: { items: Faq[] }) {
  const idPrefix = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${idPrefix}-button-${index}`;
        const panelId = `${idPrefix}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-bold text-navy-900 sm:text-base">{item.question}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className={cn("h-5 w-5 shrink-0 text-petrol-500 transition-transform", isOpen && "rotate-180")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 7.5l5 5 5-5" />
                </svg>
              </button>
            </h3>
            {isOpen ? (
              <div id={panelId} role="region" aria-labelledby={buttonId} className="px-5 pb-5">
                <p className="text-sm leading-relaxed text-charcoal-700">{item.answer}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
