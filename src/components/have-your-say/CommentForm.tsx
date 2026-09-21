"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/Alert";

export function CommentForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="grid gap-4 sm:grid-cols-2"
      >
        <div className="sm:col-span-1">
          <label htmlFor="hys-name" className="mb-1 block text-sm font-semibold text-navy-900">
            Name
          </label>
          <input
            id="hys-name"
            name="name"
            type="text"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-charcoal-700 focus:border-petrol-500 focus:outline-none"
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="hys-email" className="mb-1 block text-sm font-semibold text-navy-900">
            Email (optional)
          </label>
          <input
            id="hys-email"
            name="email"
            type="email"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-charcoal-700 focus:border-petrol-500 focus:outline-none"
          />
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
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-charcoal-700 focus:border-petrol-500 focus:outline-none"
          />
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
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-charcoal-700 focus:border-petrol-500 focus:outline-none"
          />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full rounded-md bg-petrol-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-petrol-600 sm:w-auto"
          >
            Post Your Say
          </button>
        </div>
      </form>

      {submitted ? (
        <Alert tone="info" className="mt-4">
          Comments aren&apos;t being stored yet, this is a preview of the discussion feature.
        </Alert>
      ) : null}
    </div>
  );
}
