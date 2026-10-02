"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { interestTopics, shareText } from "@/lib/data/take-action-config";

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

export function InterestForm() {
  const [topics, setTopics] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function toggle(topic: string) {
    setTopics((t) => (t.includes(topic) ? t.filter((x) => x !== topic) : [...t, topic]));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    setErrors({});
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          postcode: data.get("postcode"),
          interests: topics,
          consent: data.get("consent") === "on",
          companyWebsite: data.get("companyWebsite"),
        }),
      });
      const body = await res.json().catch(() => null);
      if (res.ok && body?.success) {
        form.reset();
        setTopics([]);
        setStatus("success");
        return;
      }
      setErrors(body?.errors ?? { form: "Something went wrong. Please try again." });
      setStatus("error");
    } catch {
      setErrors({ form: "Couldn't reach the server. Please check your connection and try again." });
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border-l-2 border-emerald-600 py-1 pl-4 text-sm leading-relaxed text-charcoal-700">
        <p className="font-semibold text-emerald-800">Thank you. You&apos;re registered for updates.</p>
        <p className="mt-1">We&apos;ll only send the updates you chose. Registering is not a booking and doesn&apos;t commit you to attending anything. To be removed, contact us using the details on this page.</p>
      </div>
    );
  }

  const err = (k: string) => (errors[k] ? <p className="mt-1 text-xs font-semibold text-red-700">{errors[k]}</p> : null);

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
      <div>
        <label htmlFor="ta-name" className="mb-1 block text-sm font-semibold text-navy-900">Name</label>
        <input id="ta-name" name="name" type="text" required maxLength={80} autoComplete="name" className={field} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="ta-email" className="mb-1 block text-sm font-semibold text-navy-900">Email</label>
        <input id="ta-email" name="email" type="email" required maxLength={254} autoComplete="email" className={field} />
        {err("email")}
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
        {err("interests")}
      </fieldset>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-2.5 text-sm text-charcoal-700">
          <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4" />
          <span>
            I&apos;m happy for Fuel Crisis England to contact me by email with the updates I&apos;ve chosen. See the{" "}
            <a href="/privacy" className="font-semibold text-petrol-600 underline underline-offset-2">Privacy Policy</a>.
          </span>
        </label>
        {err("consent")}
      </div>
      {errors.form ? (
        <div className="sm:col-span-2" role="alert">
          <p className="border-l-2 border-red-600 py-1 pl-4 text-sm text-red-800">{errors.form}</p>
        </div>
      ) : null}
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={status === "submitting"} className="min-h-11 w-full sm:w-auto">
          {status === "submitting" ? "Registering…" : "Register Your Interest"}
        </Button>
        <p className="mt-3 text-xs leading-relaxed text-charcoal-500">
          Your registration details are stored securely so we can manage the updates you have requested. We do not sell your information. See our <a href="/privacy" className="font-semibold underline underline-offset-2">Privacy Policy</a> for details. Registering is not a booking and does not commit you to attending any event or guarantee that one will take place.
        </p>
      </div>
    </form>
  );
}
