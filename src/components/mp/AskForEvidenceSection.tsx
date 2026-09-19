const evidenceRequests = [
  "The current tax rate",
  "The next planned change",
  "Revenue figures",
  "Impact assessments",
  "Policy reviews",
  "Explanations of decisions",
];

const accountabilityTopics = [
  "Fuel Duty",
  "VAT",
  "Fuel affordability",
  "Tax receipts",
  "Support for essential drivers",
  "Energy-company profits",
  "Competition",
  "Excess-profit measures",
  "Cost-of-living effects",
];

export function AskForEvidenceSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 p-6">
        <h3 className="text-base font-bold text-navy-900">Ask for answers on</h3>
        <ul className="mt-4 space-y-2">
          {accountabilityTopics.map((topic) => (
            <li key={topic} className="flex items-start gap-2.5 text-sm text-charcoal-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-petrol-500" aria-hidden="true" />
              {topic}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-slate-200 p-6">
        <h3 className="text-base font-bold text-navy-900">Ask for evidence</h3>
        <p className="mt-2 text-sm text-charcoal-700">Encourage your MP or the Government to publish or explain:</p>
        <ul className="mt-4 space-y-2">
          {evidenceRequests.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-petrol-500" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
