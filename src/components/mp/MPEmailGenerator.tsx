"use client";

import { useId, useMemo, useState } from "react";
import type { MPTopic } from "@/lib/data/mp-topics";
import { findYourMPUrl } from "@/lib/data/sources";
import { cn } from "@/lib/utils";

const DEFAULT_TOPICS = ["fuel-duty", "affordability"];
const inputClass =
  "mt-1.5 w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-base text-navy-900 focus:border-petrol-500 focus:outline-none";

/**
 * Builds a neutral, sourced message to an MP from the topics the person
 * picks. Facts come from the site's own data (passed in by the page); each
 * question asks for the Government's position rather than arguing for one.
 * Everything stays in the browser: nothing is sent or stored, and the
 * person reviews, edits and sends the message themselves.
 */
export function MPEmailGenerator({ topics }: { topics: MPTopic[] }) {
  const formId = useId();
  const [selected, setSelected] = useState<string[]>(DEFAULT_TOPICS);
  const [name, setName] = useState("");
  const [postcode, setPostcode] = useState("");
  const [constituency, setConstituency] = useState("");
  const [occupation, setOccupation] = useState("");
  const [monthlyMileage, setMonthlyMileage] = useState("");
  const [fuelCost, setFuelCost] = useState("");
  const [experience, setExperience] = useState("");
  const [edited, setEdited] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const chosen = topics.filter((t) => selected.includes(t.id));
  const subject = chosen.length ? `Fuel costs: ${chosen.map((t) => t.label.toLowerCase()).join(", ")}` : "Fuel costs: a question from a constituent";

  const generated = useMemo(() => {
    const intro = `Dear [MP NAME],\n\nI am writing as your constituent${constituency ? ` in ${constituency}` : ""} about the cost of petrol and diesel. I would be grateful for your view, and for the Government's position, on the points below.`;

    const points = chosen.length
      ? chosen.map((t, i) => `${i + 1}. ${t.label}\n${t.fact ? `${t.fact} ` : ""}${t.question}`).join("\n\n")
      : "(Choose at least one topic above.)";

    const context: string[] = [];
    if (occupation || monthlyMileage || fuelCost) {
      const parts: string[] = [];
      if (occupation) parts.push(`I work as ${occupation}`);
      if (monthlyMileage) parts.push(`drive about ${monthlyMileage} miles a month`);
      if (fuelCost) parts.push(`spend around £${fuelCost} a month on fuel`);
      context.push(`For context, ${parts.join(", ")}.`);
    }
    if (experience.trim()) context.push(experience.trim());

    const sources = chosen.filter((t) => t.source).map((t) => `- ${t.source!.name}: ${t.source!.url}`);

    return [
      intro,
      points,
      ...context,
      "I would appreciate a written reply, including any figures or sources you rely on.",
      `Kind regards,\n${name || "[NAME]"}\n${postcode || "[POSTCODE]"}`,
      ...(sources.length ? [`Sources for the figures above:\n${[...new Set(sources)].join("\n")}`] : []),
    ].join("\n\n");
  }, [chosen, constituency, occupation, monthlyMileage, fuelCost, experience, name, postcode]);

  const email = edited ?? generated;
  const mailtoHref = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(email)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`Subject: ${subject}\n\n${email}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  function toggleTopic(id: string) {
    setEdited(null);
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  // Any change to the form rebuilds the draft, replacing manual edits; the person is told this below.
  function field(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEdited(null);
      setter(e.target.value);
    };
  }

  return (
    <div className="rounded border border-slate-200 bg-white p-5 sm:p-8">
      <fieldset>
        <legend className="text-sm font-semibold text-navy-900">1. Choose the topics to raise</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {topics.map((t) => (
            <label
              key={t.id}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-3 rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                selected.includes(t.id) ? "border-petrol-500 bg-petrol-50 text-petrol-700" : "border-slate-300 text-charcoal-700 hover:bg-slate-50"
              )}
            >
              <input
                type="checkbox"
                checked={selected.includes(t.id)}
                onChange={() => toggleTopic(t.id)}
                className="h-4 w-4 rounded border-slate-400 accent-petrol-500"
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <p className="mt-6 text-sm font-semibold text-navy-900">2. Add your details (optional, and never sent to us)</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="block text-sm font-semibold text-navy-900">
            Your name
          </label>
          <input id={`${formId}-name`} type="text" autoComplete="name" value={name} onChange={field(setName)} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${formId}-postcode`} className="block text-sm font-semibold text-navy-900">
            Postcode
          </label>
          <input id={`${formId}-postcode`} type="text" autoComplete="postal-code" value={postcode} onChange={field(setPostcode)} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${formId}-constituency`} className="block text-sm font-semibold text-navy-900">
            Constituency
          </label>
          <input id={`${formId}-constituency`} type="text" value={constituency} onChange={field(setConstituency)} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${formId}-occupation`} className="block text-sm font-semibold text-navy-900">
            Occupation
          </label>
          <input
            id={`${formId}-occupation`}
            type="text"
            placeholder="e.g. a self-employed electrician"
            value={occupation}
            onChange={field(setOccupation)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-mileage`} className="block text-sm font-semibold text-navy-900">
            Monthly mileage
          </label>
          <input id={`${formId}-mileage`} type="number" inputMode="numeric" min={0} value={monthlyMileage} onChange={field(setMonthlyMileage)} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${formId}-fuelcost`} className="block text-sm font-semibold text-navy-900">
            Monthly fuel cost, £
          </label>
          <input id={`${formId}-fuelcost`} type="number" inputMode="decimal" min={0} value={fuelCost} onChange={field(setFuelCost)} className={inputClass} />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor={`${formId}-experience`} className="block text-sm font-semibold text-navy-900">
          Your own experience, in your own words
        </label>
        <textarea id={`${formId}-experience`} rows={3} value={experience} onChange={field(setExperience)} className={inputClass} />
      </div>

      <div className="mt-6">
        <label htmlFor={`${formId}-email`} className="block text-sm font-semibold text-navy-900">
          3. Review and edit your message
        </label>
        <p className="mt-1 text-sm text-charcoal-700">
          Subject: <span className="font-semibold text-navy-900">{subject}</span>
        </p>
        <textarea
          id={`${formId}-email`}
          value={email}
          onChange={(e) => setEdited(e.target.value)}
          rows={18}
          className="mt-2 w-full rounded-md border border-slate-300 bg-slate-50 p-4 font-mono text-sm leading-relaxed text-navy-900 focus:border-petrol-500 focus:outline-none"
        />
        <p className="mt-1 text-xs text-charcoal-600">
          You can edit the text directly. Changing the topics or details above rebuilds the draft and replaces your edits.
          {edited !== null ? (
            <>
              {" "}
              <button type="button" onClick={() => setEdited(null)} className="-my-3 inline-block py-3 font-semibold text-petrol-600 underline underline-offset-2">
                Undo my edits
              </button>
            </>
          ) : null}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={findYourMPUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-slate-300 px-5 text-sm font-semibold text-navy-900 hover:bg-slate-50"
        >
          Find your MP <span aria-hidden="true">&rarr;</span>
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-11 items-center rounded-full border border-slate-300 px-5 text-sm font-semibold text-navy-900 hover:bg-slate-50"
        >
          {copied ? "Copied to clipboard" : "Copy message"}
        </button>
        <a href={mailtoHref} className="inline-flex min-h-11 items-center rounded-full bg-petrol-500 px-5 text-sm font-semibold text-white hover:bg-petrol-600">
          Open in your email app
        </a>
      </div>
      <p className="mt-3 text-xs text-charcoal-600">
        Nothing is sent automatically. The draft opens in your own email app: replace [MP NAME] with your MP&apos;s name,
        check it says what you want to say, and send it yourself. The facts come from official sources listed at the
        end of the message; the views you add are your own.
      </p>
    </div>
  );
}
