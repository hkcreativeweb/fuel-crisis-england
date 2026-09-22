"use client";

import { useCallback, useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

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

  const load = useCallback(async (offset: number, replace: boolean) => {
    if (replace) setLoadState("loading");
    else setLoadingMore(true);

    try {
      const res = await fetch(`/api/comments?offset=${offset}&limit=${PAGE_SIZE}`);
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
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial/refresh fetch needs to reset loading state before awaiting the response
    load(0, true);
  }, [load, refreshKey]);

  if (loadState === "loading") {
    return <p className="text-sm text-charcoal-500">Loading comments…</p>;
  }

  if (loadState === "error" || !available) {
    return <p className="text-sm text-charcoal-500">Comments are temporarily unavailable. Please check back shortly.</p>;
  }

  if (comments.length === 0) {
    return <p className="text-sm text-charcoal-500">No comments yet. Be the first to share your view.</p>;
  }

  return (
    <div>
      <ul className="space-y-4">
        {comments.map((c) => (
          <li key={c.id} className="rounded-md border border-slate-200 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <span className="text-sm font-bold text-navy-900">{c.name}</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-petrol-600">{c.topic}</span>
              <span className="text-xs text-charcoal-400">{formatDate(c.submittedAt)}</span>
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
          className="mt-4 w-full rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:border-navy-900 disabled:opacity-60 sm:w-auto"
        >
          {loadingMore ? "Loading…" : "Load more"}
        </button>
      ) : null}
    </div>
  );
}
