const exampleComments = [
  {
    name: "James",
    topic: "Fuel Prices",
    date: "21 September 2026",
    comment: "Fuel prices have a big impact on my weekly driving costs.",
  },
  {
    name: "Priya",
    topic: "Electric Vehicles",
    date: "18 September 2026",
    comment: "I'd consider an EV, but I'd want to know the real running costs first, not just the sales pitch.",
  },
  {
    name: "Tom",
    topic: "Motoring Costs",
    date: "15 September 2026",
    comment: "Insurance and fuel together are the two costs that hit hardest each month.",
  },
];

export function ExampleComments() {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-charcoal-400">
        Example posts shown for preview purposes, not real user submissions.
      </p>
      <ul className="space-y-4">
        {exampleComments.map((c) => (
          <li key={c.name + c.date} className="rounded-md border border-slate-200 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <span className="text-sm font-bold text-navy-900">{c.name}</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-petrol-600">{c.topic}</span>
              <span className="text-xs text-charcoal-400">{c.date}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-700">&quot;{c.comment}&quot;</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
