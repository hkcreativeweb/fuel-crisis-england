"use client";

import { useId, useMemo, useState } from "react";
import {
  masterEmailSubject,
  masterEmailIntro,
  masterEmailQuestionBlocks,
  masterEmailClosing,
} from "@/lib/data/mp-email-templates";
import type { MPDemandTopicId } from "@/lib/types";
import { fuelDutyReceiptsFullYear } from "@/lib/data/hmrc-receipts";
import { yearlySnapshots } from "@/lib/data/yearly-snapshots";
import { findYourMPUrl } from "@/lib/data/sources";
import { cn } from "@/lib/utils";

const now = yearlySnapshots["2026"];
const DEFAULT_TOPICS: MPDemandTopicId[] = ["freeze-duty", "review-duty-vat", "windfall-measures"];

type AutoStat = {
  id: string;
  sentence: string;
  sourceLabel: string;
  sourceUrl: string;
};

const autoStats: AutoStat[] = [
  {
    id: "receipts",
    sentence: `According to HMRC, Fuel Duty receipts were approximately £${fuelDutyReceiptsFullYear.amountGBP} billion in the ${fuelDutyReceiptsFullYear.periodLabel.toLowerCase()}.`,
    sourceLabel: fuelDutyReceiptsFullYear.source,
    sourceUrl: fuelDutyReceiptsFullYear.sourceUrl!,
  },
  {
    id: "duty-rate",
    sentence: `The current Fuel Duty rate for petrol and diesel is ${now.fuelDutyPencePerLitre?.toFixed(2)} pence per litre.`,
    sourceLabel: "GOV.UK — Amended Fuel Duty rates: 2026 to 2027",
    sourceUrl: "https://www.gov.uk/government/publications/amended-fuel-duty-rates-for-2026-to-2027/amended-fuel-duty-rates-2026-to-2027",
  },
  {
    id: "petrol-price",
    sentence: `The average petrol price in September 2026 was ${now.petrolPencePerLitre?.toFixed(1)} pence per litre.`,
    sourceLabel: "RAC Fuel Watch / GlobalPetrolPrices.com",
    sourceUrl: "https://www.rac.co.uk/drive/advice/fuel-watch/",
  },
];

export function MPEmailGenerator() {
  const formId = useId();
  const [selectedTopics, setSelectedTopics] = useState<MPDemandTopicId[]>(DEFAULT_TOPICS);
  const [name, setName] = useState("");
  const [postcode, setPostcode] = useState("");
  const [constituency, setConstituency] = useState("");
  const [fuelCost, setFuelCost] = useState("");
  const [monthlyMileage, setMonthlyMileage] = useState("");
  const [occupation, setOccupation] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedStats, setSelectedStats] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generatedEmail = useMemo(() => {
    const questionLines = masterEmailQuestionBlocks
      .filter((block) => selectedTopics.includes(block.id))
      .flatMap((block) => block.questions);

    const numberedQuestions = questionLines.length > 0 ? questionLines.map((q, i) => `${i + 1}. ${q}`).join("\n") : "(No specific topics selected — please choose at least one below.)";

    let body = `${masterEmailIntro}\n\n${numberedQuestions}\n\n${masterEmailClosing}`;

    const personalParagraphs: string[] = [];
    if (occupation || fuelCost || monthlyMileage) {
      const parts: string[] = [];
      if (occupation) parts.push(`I work as ${occupation}`);
      if (monthlyMileage) parts.push(`drive approximately ${monthlyMileage} miles a month`);
      if (fuelCost) parts.push(`spend around £${fuelCost} a month on fuel`);
      personalParagraphs.push(`For context, ${parts.join(", ")}.`);
    }
    if (experience.trim()) {
      personalParagraphs.push(experience.trim());
    }
    if (personalParagraphs.length > 0) {
      body = body.replace(
        "I understand that any tax or profit-related measure",
        `${personalParagraphs.join("\n\n")}\n\nI understand that any tax or profit-related measure`
      );
    }

    if (selectedStats.length > 0) {
      const statLines = autoStats.filter((s) => selectedStats.includes(s.id)).map((s) => s.sentence);
      body = body.replace(
        "I understand that any tax or profit-related measure",
        `${statLines.join(" ")}\n\nI understand that any tax or profit-related measure`
      );
    }

    body = body.replace("[NAME]", name || "[NAME]").replace("[POSTCODE]", postcode || "[POSTCODE]");

    return body;
  }, [selectedTopics, name, postcode, occupation, monthlyMileage, fuelCost, experience, selectedStats]);

  const mailtoHref = `mailto:?subject=${encodeURIComponent(masterEmailSubject)}&body=${encodeURIComponent(generatedEmail)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(generatedEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  function toggleTopic(id: MPDemandTopicId) {
    setSelectedTopics((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function toggleStat(id: string) {
    setSelectedStats((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
      <p className="text-sm font-semibold text-navy-900">Choose which topics to raise:</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {masterEmailQuestionBlocks.map((block) => (
          <label
            key={block.id}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-md border px-4 py-3 text-sm font-medium transition-colors",
              selectedTopics.includes(block.id) ? "border-petrol-500 bg-petrol-50 text-petrol-700" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
            )}
          >
            <input
              type="checkbox"
              checked={selectedTopics.includes(block.id)}
              onChange={() => toggleTopic(block.id)}
              className="mt-0.5 h-4 w-4 rounded border-slate-400 text-petrol-500 focus:ring-petrol-400"
            />
            {block.label}
          </label>
        ))}
      </div>

      <a
        href={findYourMPUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
      >
        Find your MP on UK Parliament <span aria-hidden="true">&rarr;</span>
      </a>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="block text-sm font-semibold text-navy-900">
            Your name
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-postcode`} className="block text-sm font-semibold text-navy-900">
            Postcode
          </label>
          <input
            id={`${formId}-postcode`}
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-constituency`} className="block text-sm font-semibold text-navy-900">
            Constituency <span className="font-normal text-charcoal-600">(optional)</span>
          </label>
          <input
            id={`${formId}-constituency`}
            type="text"
            value={constituency}
            onChange={(e) => setConstituency(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-occupation`} className="block text-sm font-semibold text-navy-900">
            Occupation <span className="font-normal text-charcoal-600">(optional)</span>
          </label>
          <input
            id={`${formId}-occupation`}
            type="text"
            placeholder="e.g. a self-employed electrician"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-mileage`} className="block text-sm font-semibold text-navy-900">
            Monthly mileage <span className="font-normal text-charcoal-600">(optional)</span>
          </label>
          <input
            id={`${formId}-mileage`}
            type="number"
            min={0}
            value={monthlyMileage}
            onChange={(e) => setMonthlyMileage(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-fuelcost`} className="block text-sm font-semibold text-navy-900">
            Monthly fuel cost, £ <span className="font-normal text-charcoal-600">(optional)</span>
          </label>
          <input
            id={`${formId}-fuelcost`}
            type="number"
            min={0}
            value={fuelCost}
            onChange={(e) => setFuelCost(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`${formId}-experience`} className="block text-sm font-semibold text-navy-900">
          Your personal experience <span className="font-normal text-charcoal-600">(optional)</span>
        </label>
        <textarea
          id={`${formId}-experience`}
          rows={3}
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="mt-1.5 w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
        />
      </div>

      <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-navy-900">Include verified statistics</p>
        <div className="mt-2 space-y-2">
          {autoStats.map((stat) => (
            <label key={stat.id} className="flex items-start gap-3 text-sm text-charcoal-700">
              <input
                type="checkbox"
                checked={selectedStats.includes(stat.id)}
                onChange={() => toggleStat(stat.id)}
                className="mt-0.5 h-4 w-4 rounded border-slate-400 text-petrol-500 focus:ring-petrol-400"
              />
              {stat.sentence}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-navy-900">Subject: {masterEmailSubject}</p>
        <textarea
          readOnly
          value={generatedEmail}
          rows={20}
          className="mt-2 w-full rounded-md border border-slate-300 bg-slate-50 p-4 font-mono text-xs text-navy-900 focus:border-petrol-500 focus:outline-none"
        />
      </div>

      {selectedStats.length > 0 ? (
        <div className="mt-3 space-y-1 text-xs text-charcoal-600">
          {autoStats
            .filter((s) => selectedStats.includes(s.id))
            .map((s) => (
              <p key={s.id}>
                Source for &quot;{s.sentence.slice(0, 40)}…&quot;:{" "}
                <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-petrol-600 underline underline-offset-2">
                  {s.sourceLabel}
                </a>
              </p>
            ))}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-slate-50"
        >
          {copied ? "Copied to clipboard" : "Copy email"}
        </button>
        <a href={mailtoHref} className="rounded-full bg-petrol-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-petrol-600">
          Open in your email app
        </a>
      </div>
      <p className="mt-3 text-xs text-charcoal-600">
        This opens a draft in your own email application. Nothing is sent automatically — replace{" "}
        [MP NAME] with your MP&apos;s name and review the email before you send it yourself.
      </p>
    </div>
  );
}
