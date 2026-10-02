"use client";

import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button, LinkButton } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { formatDate } from "@/lib/utils";

type Registration = { id: string; name: string; email: string; postcode: string | null; interests: string[]; createdAt: string };

export function SignupsDashboard() {
  const [state, setState] = useState<"loading" | "signedOut" | "error" | "ready">("loading");
  const [rows, setRows] = useState<Registration[]>([]);
  const [petition, setPetition] = useState<number | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/registrations");
      if (res.status === 401) return setState("signedOut");
      const body = await res.json();
      if (!res.ok || !body.success) return setState("error");
      setRows(body.registrations);
      setPetition(body.petitionSignatures);
      setState("ready");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch of admin data
    load();
  }, [load]);

  async function remove(id: string) {
    if (!window.confirm("Remove this registration permanently?")) return;
    const res = await fetch(`/api/admin/registrations?id=${id}`, { method: "DELETE" });
    if (res.ok) setRows((r) => r.filter((x) => x.id !== id));
  }

  return (
    <Container>
      <div className="py-12">
        <h1 className="text-xl font-extrabold text-navy-900">Sign-ups</h1>

        {state === "loading" ? <p className="mt-6 text-sm text-charcoal-500">Loading…</p> : null}
        {state === "signedOut" ? (
          <Alert tone="warning" className="mt-6">
            Please sign in first at <a href="/admin/comments" className="font-semibold underline">/admin/comments</a>, then return here.
          </Alert>
        ) : null}
        {state === "error" ? <Alert tone="error" className="mt-6">Couldn&apos;t load sign-ups. Storage may be temporarily unavailable.</Alert> : null}

        {state === "ready" ? (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded border border-slate-200 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Petition signatures (verified count)</p>
                <p className="mt-1 text-3xl font-extrabold tabular-nums text-navy-900">{petition ?? "—"}</p>
                <p className="mt-1 text-xs text-charcoal-500">The petition stores no names or emails by design.</p>
              </div>
              <div className="rounded border border-slate-200 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">Update registrations</p>
                <p className="mt-1 text-3xl font-extrabold tabular-nums text-navy-900">{rows.length}</p>
                <div className="mt-2">
                  <LinkButton href="/api/admin/registrations?format=csv" variant="secondary" className="text-xs">
                    Download CSV
                  </LinkButton>
                </div>
              </div>
            </div>

            {rows.length === 0 ? (
              <p className="mt-8 text-sm text-charcoal-600">No registrations yet.</p>
            ) : (
              <ul className="mt-8 max-w-3xl space-y-3">
                {rows.map((r) => (
                  <li key={r.id} className="rounded-md border border-slate-200 p-4 text-sm">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-bold text-navy-900">{r.name}</span>
                      <span className="text-xs text-charcoal-500">{formatDate(r.createdAt)}</span>
                    </div>
                    <p className="mt-1 break-all text-charcoal-700">{r.email}{r.postcode ? ` · ${r.postcode}` : ""}</p>
                    <p className="mt-1 text-xs text-charcoal-600">{r.interests.join(", ")}</p>
                    <Button variant="ghost" onClick={() => remove(r.id)} className="mt-2 text-xs text-red-700">
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : null}
      </div>
    </Container>
  );
}
