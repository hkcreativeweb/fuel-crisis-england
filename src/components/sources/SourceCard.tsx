import type { OfficialSource } from "@/lib/data/sources";

export function SourceCard({ source }: { source: OfficialSource }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-petrol-400"
    >
      <span className="inline-flex w-fit items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-charcoal-700">
        {source.category}
      </span>
      <h3 className="mt-3 text-base font-bold text-navy-900">{source.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-700">{source.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-petrol-600">
        Visit official site <span aria-hidden="true">&rarr;</span>
      </span>
    </a>
  );
}
