"use client";

import { useCallback, useEffect, useState } from "react";
import { formatDateTime } from "@/lib/utils";
import { COMMENT_TOPICS } from "@/lib/data/comment-topics";

type PublicComment = {
  id: string;
  name: string;
  topic: string;
  comment: string;
  submittedAt: string;
};

const PAGE_SIZE = 10;

type LoadState = "loading" | "ready" | "error";

export function CommentList({ refreshKey }: { refreshKey?: number }) {
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [loadingMore, setLoadingMore] = useState(false);
  const [available, setAvailable] = useState(true);
  const [topic, setTopic] = useState("");

  const load = useCallback(
    async (offset: number, replace: boolean) => {
      if (replace) setLoadState("loading");
      else setLoadingMore(true);

      try {
        const params = new URLSearchParams({ offset: String(offset), limit: String(PAGE_SIZE) });
        if (topic) params.set("topic", topic);
        const res = await fetch(`/api/comments?${params}`);
        if (!res.ok) throw new Error("request failed");
        const data = await res.json();

        setAvailable(data.available !== false);
        setComments((prev) => (replace ? data.comments : [...prev, ...data.comments]));
        setHasMore(Boolean(data.hasMore));
        setLoadState("ready");
      } catch {
        setLoadState("error");
      } finally {
        setLoadingMore(false);
      }
    },
    [topic]
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial/refresh fetch needs to reset loading state before awaiting the response
    load(0, true);
  }, [load, refreshKey]);

  let body: React.ReactNode;
  if (loadState === "loading") {
    body = <p className="text-sm text-charcoal-500">Loading comments…</p>;
  } else if (loadState === "error" || !available) {
    body = <p className="text-sm text-charcoal-500">Comments are temporarily unavailable. Please check back shortly.</p>;
  } else if (comments.length === 0) {
    body = (
      <p className="text-sm text-charcoal-500">
        {topic ? `No comments about ${topic.toLowerCase()} yet.` : "No comments yet. Be the first to share your view."}
      </p>
    );
  } else {
    body = (
      <>
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="rounded-md border border-slate-200 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className="text-sm font-bold text-navy-900">{c.name}</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-petrol-600">{c.topic}</span>
                <span className="text-xs text-charcoal-500">
                  <time dateTime={c.submittedAt}>{formatDateTime(c.submittedAt)}</time>
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-700">&quot;{c.comment}&quot;</p>
            </li>
          ))}
        </ul>

        {hasMore ? (
          <button
            type="button"
            onClick={() => load(comments.length, false)}
            disabled={loadingMore}
            className="mt-4 min-h-11 w-full rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:border-navy-900 disabled:opacity-60 sm:w-auto"
          >
            {loadingMore ? "Loading…" : "Load more"}
          </button>
        ) : null}
      </>
    );
  }

  return (
    <div>
      <label htmlFor="hys-filter" className="block text-sm font-semibold text-navy-900">
        Show comments about
      </label>
      <select
        id="hys-filter"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="mb-4 mt-1.5 min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base text-charcoal-700 focus:border-petrol-500 focus:outline-none sm:w-auto"
      >
        <option value="">All topics</option>
        {COMMENT_TOPICS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <div aria-live="polite">{body}</div>
    </div>
  );
}
