"use client";

import { useRef, useState } from "react";
import { Alert } from "@/components/ui/Alert";

type Status = "idle" | "submitting" | "success" | "error";

export function CommentForm({ onPosted }: { onPosted?: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setErrors({});

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          topic: data.get("topic"),
          comment: data.get("comment"),
          companyWebsite: data.get("companyWebsite"),
        }),
      });
      const body = await res.json().catch(() => null);

      if (res.ok && body?.success) {
        setStatus("success");
        formRef.current?.reset();
        onPosted?.();
        return;
      }

      setErrors(body?.errors || { form: "Something went wrong. Please try again." });
      setStatus("error");
    } catch {
      setErrors({ form: "Couldn't reach the server. Please check your connection and try again." });
      setStatus("error");
    }
  }

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        {/* Honeypot: hidden from real users, only bots fill this in. */}
        <input
          type="text"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden="true"
        />

        <div className="sm:col-span-1">
          <label htmlFor="hys-name" className="mb-1 block text-sm font-semibold text-navy-900">
            Name
          </label>
          <input
            id="hys-name"
            name="name"
            type="text"
            required
            maxLength={80}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-charcoal-700 focus:border-petrol-500 focus:outline-none"
          />
          {errors.name ? <p className="mt-1 text-xs font-semibold text-red-700">{errors.name}</p> : null}
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="hys-email" className="mb-1 block text-sm font-semibold text-navy-900">
            Email (optional)
          </label>
          <input
            id="hys-email"
            name="email"
            type="email"
            maxLength={254}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-charcoal-700 focus:border-petrol-500 focus:outline-none"
          />
          {errors.email ? <p className="mt-1 text-xs font-semibold text-red-700">{errors.email}</p> : null}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="hys-topic" className="mb-1 block text-sm font-semibold text-navy-900">
            Topic
          </label>
          <input
            id="hys-topic"
            name="topic"
            type="text"
            required
            maxLength={80}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-charcoal-700 focus:border-petrol-500 focus:outline-none"
          />
          {errors.topic ? <p className="mt-1 text-xs font-semibold text-red-700">{errors.topic}</p> : null}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="hys-comment" className="mb-1 block text-sm font-semibold text-navy-900">
            Your comment
          </label>
          <textarea
            id="hys-comment"
            name="comment"
            required
            rows={4}
            maxLength={2000}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-charcoal-700 focus:border-petrol-500 focus:outline-none"
          />
          {errors.comment ? <p className="mt-1 text-xs font-semibold text-red-700">{errors.comment}</p> : null}
        </div>
        {errors.form ? (
          <div className="sm:col-span-2">
            <Alert tone="error">{errors.form}</Alert>
          </div>
        ) : null}
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-md bg-petrol-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-petrol-600 disabled:opacity-60 sm:w-auto"
          >
            {status === "submitting" ? "Posting…" : "Post Your Say"}
          </button>
        </div>
      </form>

      {status === "success" ? (
        <Alert tone="success" className="mt-4">
          Thanks — your comment has been submitted and will appear here once it&apos;s been reviewed.
        </Alert>
      ) : null}
    </div>
  );
}
