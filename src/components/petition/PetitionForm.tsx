"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/ui/Alert";
import { driverCategoryLabels } from "@/lib/data/public-experiences";
import type { DriverCategory } from "@/lib/types";

const categoryOptions = Object.entries(driverCategoryLabels) as [DriverCategory, string][];

type FormState = {
  fullName: string;
  email: string;
  postcode: string;
  areaOrCounty: string;
  category: DriverCategory | "";
  impactSummary: string;
  desiredChanges: string;
  displayPublicly: boolean;
  privacyConsent: boolean;
  companyWebsite: string; // honeypot
};

const initialState: FormState = {
  fullName: "",
  email: "",
  postcode: "",
  areaOrCounty: "",
  category: "",
  impactSummary: "",
  desiredChanges: "",
  displayPublicly: false,
  privacyConsent: false,
  companyWebsite: "",
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-semibold text-red-700">
      {message}
    </p>
  );
}

export function PetitionForm() {
  const formId = useId();
  const router = useRouter();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [signatureCount, setSignatureCount] = useState<number | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validateClientSide(): Record<string, string> {
    const nextErrors: Record<string, string> = {};
    if (!values.fullName.trim()) nextErrors.fullName = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Enter a valid email address.";
    if (!values.areaOrCounty.trim()) nextErrors.areaOrCounty = "Enter your general area or county.";
    if (!values.category) nextErrors.category = "Select an option.";
    if (values.impactSummary.trim().length < 10) nextErrors.impactSummary = "Tell us how fuel prices are affecting you (at least 10 characters).";
    if (!values.privacyConsent) nextErrors.privacyConsent = "You must agree to the privacy policy to submit the form.";
    return nextErrors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const clientErrors = validateClientSide();
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/petition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrors(data.errors ?? { form: "Something went wrong. Please try again." });
        setStatus("error");
        return;
      }

      setSignatureCount(data.signatureCount ?? null);
      setStatus("success");
      setValues(initialState);
      setErrors({});
      router.refresh();
    } catch {
      setStatus("error");
      setErrors({ form: "We couldn't reach the server. Please check your connection and try again." });
    }
  }

  if (status === "success") {
    return (
      <Alert tone="success" title="Thank you — your submission has been received.">
        <p>
          {signatureCount !== null ? `You're signature number ${signatureCount}. ` : ""}
          Your experience has been saved privately. If you agreed to public display, it may be shown on
          this site after review, without your name, email or postcode.
        </p>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <Alert tone="info" title="How your details are handled">
        Your name, email and postcode are checked but not stored. We keep only a scrambled (hashed) copy of
        your email so the same address can&apos;t sign twice, plus your area, category and message. Nothing
        is published without review. See our{" "}
        <a href="/privacy" className="font-semibold underline underline-offset-2">privacy policy</a>.
      </Alert>

      {errors.form ? <Alert tone="error">{errors.form}</Alert> : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="block text-sm font-semibold text-navy-900">
            Full name
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? `${formId}-name-error` : undefined}
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
          />
          <FieldError id={`${formId}-name-error`} message={errors.fullName} />
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className="block text-sm font-semibold text-navy-900">
            Email address
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
          />
          <FieldError id={`${formId}-email-error`} message={errors.email} />
        </div>

        <div>
          <label htmlFor={`${formId}-postcode`} className="block text-sm font-semibold text-navy-900">
            Postcode <span className="font-normal text-charcoal-600">(optional)</span>
          </label>
          <input
            id={`${formId}-postcode`}
            type="text"
            autoComplete="postal-code"
            value={values.postcode}
            onChange={(e) => update("postcode", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor={`${formId}-area`} className="block text-sm font-semibold text-navy-900">
            General area / county
          </label>
          <input
            id={`${formId}-area`}
            type="text"
            placeholder="e.g. Greater Manchester"
            required
            aria-invalid={Boolean(errors.areaOrCounty)}
            aria-describedby={errors.areaOrCounty ? `${formId}-area-error` : undefined}
            value={values.areaOrCounty}
            onChange={(e) => update("areaOrCounty", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
          />
          <FieldError id={`${formId}-area-error`} message={errors.areaOrCounty} />
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-category`} className="block text-sm font-semibold text-navy-900">
          Are you a driver, commuter, business owner, or other?
        </label>
        <select
          id={`${formId}-category`}
          required
          aria-invalid={Boolean(errors.category)}
          aria-describedby={errors.category ? `${formId}-category-error` : undefined}
          value={values.category}
          onChange={(e) => update("category", e.target.value as DriverCategory)}
          className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
        >
          <option value="" disabled>
            Select an option
          </option>
          {categoryOptions.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <FieldError id={`${formId}-category-error`} message={errors.category} />
      </div>

      <div>
        <label htmlFor={`${formId}-impact`} className="block text-sm font-semibold text-navy-900">
          How are fuel prices affecting you?
        </label>
        <textarea
          id={`${formId}-impact`}
          rows={4}
          required
          aria-invalid={Boolean(errors.impactSummary)}
          aria-describedby={errors.impactSummary ? `${formId}-impact-error` : undefined}
          value={values.impactSummary}
          onChange={(e) => update("impactSummary", e.target.value)}
          className="mt-1.5 w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
        />
        <FieldError id={`${formId}-impact-error`} message={errors.impactSummary} />
      </div>

      <div>
        <label htmlFor={`${formId}-changes`} className="block text-sm font-semibold text-navy-900">
          What changes would you like to see? <span className="font-normal text-charcoal-600">(optional)</span>
        </label>
        <textarea
          id={`${formId}-changes`}
          rows={3}
          value={values.desiredChanges}
          onChange={(e) => update("desiredChanges", e.target.value)}
          className="mt-1.5 w-full rounded-md border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-petrol-500 focus:outline-none"
        />
      </div>

      {/* Honeypot field: hidden from real users via CSS, left visible to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company website</label>
        <input
          id={`${formId}-company`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(e) => update("companyWebsite", e.target.value)}
        />
      </div>

      <div className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4">
        <label className="flex items-start gap-3 text-sm text-charcoal-700">
          <input
            type="checkbox"
            checked={values.displayPublicly}
            onChange={(e) => update("displayPublicly", e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-400 text-petrol-500 focus:ring-petrol-400"
          />
          I consent to my anonymised experience (area, category, and message only — never my name or
          email) being displayed publicly after moderation.
        </label>
        <label className="flex items-start gap-3 text-sm text-charcoal-700">
          <input
            type="checkbox"
            checked={values.privacyConsent}
            onChange={(e) => update("privacyConsent", e.target.checked)}
            aria-invalid={Boolean(errors.privacyConsent)}
            aria-describedby={errors.privacyConsent ? `${formId}-privacy-error` : undefined}
            className="mt-0.5 h-4 w-4 rounded border-slate-400 text-petrol-500 focus:ring-petrol-400"
          />
          I have read and agree to the{" "}
          <a href="/privacy" className="font-semibold text-petrol-600 underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </label>
        <FieldError id={`${formId}-privacy-error`} message={errors.privacyConsent} />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-petrol-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-petrol-600 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Submit Your Experience"}
      </button>
    </form>
  );
}
