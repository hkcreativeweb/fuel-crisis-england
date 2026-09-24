"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { petrolPumpPriceBreakdown } from "@/lib/data/pump-price-breakdown";
import { cn } from "@/lib/utils";

/*
 * Every answer and explanation below restates facts already published on
 * this site (litre-journey.ts, pump-price-breakdown.ts, the fuel cost
 * calculator and the CMA findings on /live-fuel-prices). The pump price is
 * the live GOV.UK weekly average passed in by the homepage, the same figure
 * the hero shows, so the quiz never disagrees with the rest of the page.
 * Nothing is sent anywhere: the score lives only in this component's state.
 */

function componentPence(label: string): number {
  return petrolPumpPriceBreakdown.components.find((c) => c.label.startsWith(label))?.approxPencePerLitre ?? 0;
}

const duty = componentPence("Fuel duty");
/** Uses the same live GOV.UK weekly average as the hero, so the homepage never shows two prices. */
function vatExplanation(petrolPence: number, dataPeriod: string): string {
  // VAT is 20% of the pre-VAT price, i.e. one-sixth of a VAT-inclusive pump price.
  const vat = petrolPence / 6;
  const taxShare = Math.round(((duty + vat) / petrolPence) * 100);
  return `VAT is added after Fuel Duty, so you pay VAT on the duty too. At the UK average of ${petrolPence.toFixed(1)}p a litre (${dataPeriod.charAt(0).toLowerCase() + dataPeriod.slice(1)}), that's ${duty}p duty plus about ${vat.toFixed(1)}p VAT: roughly ${taxShare}% of the price is tax.`;
}

type Question = {
  question: string;
  answers: string[];
  correct: number;
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    question: "How is Fuel Duty charged on petrol and diesel?",
    answers: [
      "As a percentage of the pump price",
      "As a fixed amount on every litre",
      "As a yearly charge on each car",
      "Only at motorway service stations",
    ],
    correct: 1,
    explanation: `Fuel Duty is a fixed ${duty}p on every litre, whatever the pump price. It's a tax set by government, not a company cost.`,
  },
  {
    question: "VAT on fuel is 20%. But 20% of what?",
    answers: ["The price before any tax", "The retailer's margin only", "The price including Fuel Duty"],
    correct: 2,
    explanation: "", // filled in from the live price by vatExplanation()
  },
  {
    question: "Crude oil is mainly traded internationally in which currency?",
    answers: ["Pounds sterling", "US dollars", "Euros"],
    correct: 1,
    explanation:
      "Oil is generally traded in US dollars. So if the pound weakens against the dollar, fuel can cost the UK more even when the dollar price of oil hasn't changed.",
  },
  {
    question: "Car fuel economy in the UK is quoted in miles per gallon. Roughly how many litres are in a UK gallon?",
    answers: ["Exactly 4 litres", "About 4.5 litres", "About 6 litres", "About 10 litres"],
    correct: 1,
    explanation:
      "A UK gallon is 4.54609 litres. Knowing that lets you turn your car's mpg into a cost per mile. Try it in the calculator further down this page.",
  },
  {
    question: "Two petrol stations a few miles apart charge different prices. What has the Competition and Markets Authority (CMA) found?",
    answers: [
      "Any difference means someone is breaking the law",
      "Supermarkets have consistently lower average margins than other retailers",
      "The government sets a price for each station",
      "Motorway services are always the cheapest",
    ],
    correct: 1,
    explanation:
      "The CMA found supermarket retailers consistently have lower average margins. Local competition, site costs and buying power also matter, and a higher price isn't automatically wrongdoing.",
  },
];

const DEEPER_LINKS = [
  { label: "Follow the Money", href: "/follow-the-money" },
  { label: "Why is fuel expensive?", href: "/why-is-fuel-expensive" },
  { label: "Fuel Duty & Tax", href: "/fuel-duty-and-tax" },
  { label: "Save fuel money", href: "/save-fuel-money" },
];

function scoreMessage(score: number): { title: string; body: string } {
  if (score === QUESTIONS.length) return { title: "Nice work.", body: "You clearly know your fuel facts." };
  if (score >= 3) return { title: "Good going.", body: "A couple caught you out. Every answer is explained in more detail on this site." };
  return { title: "Plenty to discover.", body: "Most of this isn't printed on the pump. That's what this site is for." };
}

type Phase = "intro" | "question" | "done";

export function FuelQuiz({ petrolPence, dataPeriod }: { petrolPence: number; dataPeriod: string }) {
  const questions = QUESTIONS.map((q, i) => (i === 1 ? { ...q, explanation: vatExplanation(petrolPence, dataPeriod) } : q));
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const focusRef = useRef<HTMLHeadingElement>(null);
  const hasInteracted = useRef(false);

  // Move keyboard/screen-reader focus to the new question, feedback or result.
  useEffect(() => {
    if (hasInteracted.current) focusRef.current?.focus();
  }, [phase, index, selected]);

  function start() {
    hasInteracted.current = true;
    setIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("question");
  }

  function answer(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === questions[index].correct) setScore((s) => s + 1);
  }

  function next() {
    if (index === QUESTIONS.length - 1) {
      setPhase("done");
    } else {
      setIndex(index + 1);
      setSelected(null);
    }
  }

  const q = questions[index];
  const answered = selected !== null;
  const isCorrect = answered && selected === q.correct;
  const progress = ((index + (answered ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <section id="quiz" aria-labelledby="quiz-title" className="scroll-mt-24 bg-navy-950 py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-petrol-300">Test yourself in 60 seconds</p>
          <h2 id="quiz-title" className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Think You Know Fuel?
          </h2>

          <div className="mt-8 rounded border border-white/10 bg-white p-5 text-navy-900 sm:p-8">
            {phase === "intro" ? (
              <div>
                <p className="text-lg leading-relaxed text-charcoal-700">
                  Five quick questions about fuel prices, tax, efficiency and where your money goes.
                </p>
                <Button size="lg" onClick={start} className="mt-6 min-h-12 w-full uppercase tracking-[0.1em] sm:w-auto">
                  Start quiz
                </Button>
                <p className="mt-4 text-xs text-charcoal-600">No account needed. Your score isn&apos;t stored.</p>
              </div>
            ) : null}

            {phase === "question" ? (
              <div>
                <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-wide text-charcoal-600">
                  <span>
                    Question {index + 1} of {QUESTIONS.length}
                  </span>
                  <span className="tabular-nums">Score {score}</span>
                </div>
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200"
                  role="progressbar"
                  aria-label="Quiz progress"
                  aria-valuemin={0}
                  aria-valuemax={QUESTIONS.length}
                  aria-valuenow={index + (answered ? 1 : 0)}
                >
                  <div className="h-full bg-petrol-500 transition-[width] duration-300" style={{ width: `${progress}%` }} />
                </div>

                <h3
                  ref={answered ? undefined : focusRef}
                  tabIndex={-1}
                  className="mt-6 text-xl font-bold leading-snug outline-none sm:text-2xl"
                >
                  {q.question}
                </h3>

                <ul className="mt-5 space-y-3">
                  {q.answers.map((text, i) => {
                    const showCorrect = answered && i === q.correct;
                    const showWrong = answered && i === selected && i !== q.correct;
                    return (
                      <li key={text}>
                        <button
                          type="button"
                          onClick={() => answer(i)}
                          disabled={answered}
                          aria-pressed={selected === i}
                          className={cn(
                            "flex min-h-14 w-full items-center justify-between gap-3 rounded-md border-2 px-4 py-3 text-left text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 focus-visible:ring-offset-2",
                            !answered && "border-slate-300 hover:border-navy-900 hover:bg-slate-50",
                            answered && !showCorrect && !showWrong && "border-slate-200 text-charcoal-500",
                            showCorrect && "border-emerald-700 bg-emerald-50 text-emerald-900",
                            showWrong && "border-red-700 bg-red-50 text-red-900"
                          )}
                        >
                          <span>{text}</span>
                          {showCorrect ? <span className="shrink-0 text-xs font-bold uppercase">✓ Correct</span> : null}
                          {showWrong ? <span className="shrink-0 text-xs font-bold uppercase">✗ Your answer</span> : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div aria-live="polite">
                  {answered ? (
                    <div className="mt-6 border-l-4 border-petrol-500 bg-slate-50 p-4">
                      <p ref={focusRef} tabIndex={-1} className="font-bold outline-none">
                        {isCorrect ? "Correct." : "Not quite."}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal-700">{q.explanation}</p>
                    </div>
                  ) : null}
                </div>

                {answered ? (
                  <Button size="lg" onClick={next} className="mt-6 min-h-12 w-full sm:w-auto">
                    {index === QUESTIONS.length - 1 ? "See your score" : "Continue"}
                  </Button>
                ) : null}
              </div>
            ) : null}

            {phase === "done" ? (
              <div className="text-center">
                <p className="text-6xl font-extrabold tabular-nums text-petrol-500 sm:text-7xl">
                  {score}/{QUESTIONS.length}
                </p>
                <h3 ref={focusRef} tabIndex={-1} className="mt-3 text-2xl font-extrabold outline-none">
                  {scoreMessage(score).title}
                </h3>
                <p className="mt-1 text-charcoal-700">{scoreMessage(score).body}</p>

                <p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-charcoal-600">Want to dig deeper?</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {DEEPER_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex min-h-12 items-center justify-between rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold hover:border-navy-900 hover:bg-slate-50"
                      >
                        {link.label} <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Button variant="secondary" onClick={start} className="mt-6 min-h-12">
                  Retry quiz
                </Button>
                <p className="mt-4 text-xs text-charcoal-600">No account needed. Your score isn&apos;t stored.</p>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
