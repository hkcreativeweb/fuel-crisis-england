import type { MPResponseSubmission, ResponseQuoteType } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const quoteTypeLabels: Record<ResponseQuoteType, string> = {
  "direct-quote": "Direct quote",
  "user-summary": "User summary",
  editorial: "Editorial / explanatory text",
};

export function MPResponseCard({ response }: { response: MPResponseSubmission }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-navy-900">{response.mpName}</p>
          <p className="text-xs text-charcoal-600">{response.constituency}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-charcoal-700">
          {quoteTypeLabels[response.quoteType]}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-charcoal-700">
        {response.quoteType === "direct-quote" ? <>&ldquo;{response.text}&rdquo;</> : response.text}
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-charcoal-600">
        <span>{formatDate(response.date)}</span>
        {response.sourceDocument ? <span>{response.sourceDocument}</span> : null}
      </div>
      {response.moderationStatus === "example" ? (
        <span className="mt-3 inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900 ring-1 ring-amber-600/30">
          Example — not a real submission
        </span>
      ) : null}
    </div>
  );
}
