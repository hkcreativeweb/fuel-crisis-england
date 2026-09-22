"use client";

import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { formatDate } from "@/lib/utils";

type CommentStatus = "pending" | "approved" | "rejected";

type StoredComment = {
  id: string;
  name: string;
  email: string | null;
  topic: string;
  comment: string;
  submittedAt: string;
  status: CommentStatus;
};

const TABS: CommentStatus[] = ["pending", "approved", "rejected"];

function LoginForm({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onLoggedIn();
        return;
      }
      const body = await res.json().catch(() => null);
      setError(body?.error || "Incorrect password.");
    } catch {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container>
      <div className="mx-auto max-w-sm py-20">
        <h1 className="text-xl font-extrabold text-navy-900">Comment Moderation</h1>
        <p className="mt-2 text-sm text-charcoal-600">Sign in to review submitted comments.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-charcoal-700 focus:border-petrol-500 focus:outline-none"
          />
          {error ? <Alert tone="error">{error}</Alert> : null}
          <Button type="submit" disabled={submitting} className="w-full justify-center">
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </Container>
  );
}

function CommentRow({ c, onAction }: { c: StoredComment; onAction: (id: string, action: "approve" | "reject" | "delete") => void }) {
  return (
    <li className="rounded-md border border-slate-200 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="text-sm font-bold text-navy-900">{c.name}</span>
        <span className="text-xs font-semibold uppercase tracking-wide text-petrol-600">{c.topic}</span>
        <span className="text-xs text-charcoal-400">{formatDate(c.submittedAt)}</span>
      </div>
      {c.email ? <p className="mt-1 text-xs text-charcoal-500">{c.email}</p> : null}
      <p className="mt-2 text-sm leading-relaxed text-charcoal-700">&quot;{c.comment}&quot;</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {c.status !== "approved" ? (
          <Button size="md" onClick={() => onAction(c.id, "approve")} className="text-xs">
            Approve
          </Button>
        ) : null}
        {c.status !== "rejected" ? (
          <Button size="md" variant="secondary" onClick={() => onAction(c.id, "reject")} className="text-xs">
            Reject
          </Button>
        ) : null}
        <Button size="md" variant="ghost" onClick={() => onAction(c.id, "delete")} className="text-xs text-red-700">
          Delete
        </Button>
      </div>
    </li>
  );
}

export function AdminCommentsDashboard() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<CommentStatus>("pending");
  const [comments, setComments] = useState<StoredComment[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (status: CommentStatus) => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch(`/api/admin/comments?status=${status}`);
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const body = await res.json();
      if (!res.ok || !body.success) {
        setLoadError(body.error || "Failed to load comments.");
        return;
      }
      setAuthed(true);
      setComments(body.comments);
    } catch {
      setLoadError("Couldn't reach the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- tab-change fetch needs to reset loading state before awaiting the response
    load(tab);
  }, [tab, load]);

  async function handleAction(id: string, action: "approve" | "reject" | "delete") {
    setComments((prev) => prev.filter((c) => c.id !== id));
    try {
      if (action === "delete") {
        await fetch(`/api/admin/comments/${id}`, { method: "DELETE" });
      } else {
        await fetch(`/api/admin/comments/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: action === "approve" ? "approved" : "rejected" }),
        });
      }
    } catch {
      // The row is already removed optimistically; a manual refresh will
      // reconcile with server state if the request failed.
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    setAuthed(false);
  }

  if (authed === null) {
    return (
      <Container>
        <p className="py-20 text-center text-sm text-charcoal-500">Loading…</p>
      </Container>
    );
  }

  if (!authed) {
    return <LoginForm onLoggedIn={() => load("pending")} />;
  }

  return (
    <Container>
      <div className="py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-extrabold text-navy-900">Comment Moderation</h1>
          <Button variant="secondary" onClick={handleLogout} className="text-xs">
            Sign out
          </Button>
        </div>

        <div className="mt-6 flex gap-2 border-b border-slate-200">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-2 text-sm font-semibold capitalize ${
                tab === t ? "border-b-2 border-petrol-500 text-navy-900" : "text-charcoal-500 hover:text-navy-900"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6 max-w-2xl">
          {loading ? <p className="text-sm text-charcoal-500">Loading…</p> : null}
          {loadError ? <Alert tone="error">{loadError}</Alert> : null}
          {!loading && !loadError && comments.length === 0 ? (
            <p className="text-sm text-charcoal-500">No {tab} comments.</p>
          ) : null}
          {!loading && comments.length > 0 ? (
            <ul className="space-y-4">
              {comments.map((c) => (
                <CommentRow key={c.id} c={c} onAction={handleAction} />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </Container>
  );
}
