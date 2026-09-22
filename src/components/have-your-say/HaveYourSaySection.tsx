"use client";

import { useState } from "react";
import { CommentForm } from "@/components/have-your-say/CommentForm";
import { CommentList } from "@/components/have-your-say/CommentList";

/**
 * A newly-approved comment can't appear immediately after posting (it
 * starts pending), so refreshKey only needs to re-run the list's initial
 * load — it doesn't promise the just-submitted comment will be visible.
 */
export function HaveYourSaySection() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <CommentForm onPosted={() => setRefreshKey((k) => k + 1)} />
      <div className="mt-14">
        <CommentList refreshKey={refreshKey} />
      </div>
    </>
  );
}
