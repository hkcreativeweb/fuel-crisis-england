"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { interestContactEmail, interestTopics, shareText } from "@/lib/data/take-action-config";

const field =
  "w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-charcoal-700 focus:border-petrol-500 focus:outline-none";

export function CopyTextButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable; the text remains selectable on the page.
    }
  }
  return (
    <Button type="button" variant="secondary" onClick={copy} className="min-h-11">
      {copied ? "Copied" : label}
    </Button>
  );
}

export function ShareButtons() {
  const [copied, setCopied] = useState(false);
  const pageUrl = () => `${window.location.origin}/take-action`;
  const open = (href: string) => window.open(href, "_blank", "noopener,noreferrer");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable.
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button type="button" variant="secondary" className="min-h-11" onClick={() => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl())}`)}>
        Facebook
      </Button>
      <Button type="button" variant="secondary" className="min-h-11" onClick={() => open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl())}`)}>
        X
      </Button>
      <Button type="button" variant="secondary" className="min-h-11" onClick={() => open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${pageUrl()}`)}`)}>
        WhatsApp
      </Button>
      <Button type="button" variant="secondary" className="min-h-11" onClick={copyLink}>
        {copied ? "Link copied" : "Copy Link"}
      </Button>
    </div>
  );
}

/**
 * TODO: there is no backend for sign-ups yet. This opens the visitor's own
 * email app with a pre-filled message to interestContactEmail; nothing is
 * stored by the website. Swap handleSubmit for a POST to a real endpoint
 * (and update the privacy wording) when one exists.
 */
export function InterestForm() {
  const [topics, setTopics] = useState<string[]>([]);

  function toggle(topic: string) {
    setTopics((t) => (t.includes(topic) ? t.filter((x) => x !== topic) : [...t, topic]));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      "I would like to register my interest in Fuel Crisis England updates.",
      "",
      `Name: ${data.get("name") ?? ""}`,
      `Email: ${data.get("email") ?? ""}`,
      `Postcode (optional): ${data.get("postcode") ?? ""}`,
      `Interested in: ${topics.length ? topics.join(", ") : "Not specified"}`,
    ].join("\n");
    window.location.href = `mailto:${interestContactEmail}?subject=${encodeURIComponent("Register my interest")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="ta-name" className="mb-1 block text-sm font-semibold text-navy-900">Name</label>
        <input id="ta-name" name="name" type="text" required maxLength={80} autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="ta-email" className="mb-1 block text-sm font-semibold text-navy-900">Email</label>
        <input id="ta-email" name="email" type="email" required maxLength={254} autoComplete="email" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="ta-postcode" className="mb-1 block text-sm font-semibold text-navy-900">Postcode (optional)</label>
        <input id="ta-postcode" name="postcode" type="text" maxLength={10} autoComplete="postal-code" className={`${field} sm:max-w-xs`} />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-semibold text-navy-900">What are you interested in?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {interestTopics.map((topic) => (
            <label key={topic} className="flex min-h-11 items-center gap-2.5 rounded-md border border-slate-200 px-3 text-sm text-charcoal-700">
              <input type="checkbox" checked={topics.includes(topic)} onChange={() => toggle(topic)} className="h-4 w-4" />
              {topic}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="min-h-11 w-full sm:w-auto">Register Your Interest</Button>
        <p className="mt-3 text-xs leading-relaxed text-charcoal-500">
          Submitting opens your email app with these details addressed to Fuel Crisis England; the website does not store
          them. We will only use them to send the updates you choose and will not share them. Registering your interest
          is not a booking and does not guarantee a place at, or the going ahead of, any event.
        </p>
      </div>
    </form>
  );
}
