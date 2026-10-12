import { cn } from "@/lib/utils";

type Item = { title: string; detail: React.ReactNode };

const helps: Item[] = [
  {
    title: "Comparing available station prices",
    detail: "Petrol stations must report price changes to the government's Fuel Finder scheme, so apps can show nearby prices side by side.",
  },
  {
    title: "Finding potentially cheaper nearby fuel",
    detail: "If a station within easy reach charges less, a driver can save some money on a fill-up.",
  },
  {
    title: "Helping drivers make informed choices",
    detail: "Clearer prices make it easier to see where fuel costs less, and to ask why prices differ.",
  },
];

const doesNotSolve: Item[] = [
  {
    title: "The underlying level of pump prices",
    detail: "Comparing stations moves a driver from one price to another in the same market. If prices are high everywhere, a cheaper station is still expensive.",
  },
  {
    title: "The effect of Fuel Duty and VAT",
    detail: "Fuel Duty is a flat charge per litre and VAT is added on top. Every station has to include both, and government sets both rates.",
  },
  {
    title: "The cost burden on people who must drive",
    detail: "Carers, tradespeople, delivery drivers and people in rural areas may have no practical alternative to driving, or few stations within reach.",
  },
  {
    title: "Whether a detour is worth the fuel and time",
    detail: (
      <>
        Extra miles use fuel and time. Try the{" "}
        <a href="#detour" className="font-semibold text-petrol-600 underline underline-offset-2">
          detour calculator
        </a>{" "}
        to see when the saving is used up.
      </>
    ),
  },
  {
    title: "The wider impact on household budgets and businesses",
    detail: "Fuel is an essential cost for many households and for businesses that run on the road.",
  },
];

function Panel({ heading, tone, items }: { heading: string; tone: "good" | "gap"; items: Item[] }) {
  return (
    <div className={cn("rounded-lg border p-5", tone === "good" ? "border-emerald-200 bg-emerald-50/60" : "border-petrol-300 bg-petrol-50")}>
      <h3 className={cn("flex items-center gap-2 text-base font-extrabold", tone === "good" ? "text-emerald-900" : "text-petrol-700")}>
        <span aria-hidden="true" className={cn("inline-flex h-6 w-6 items-center justify-center rounded-full text-sm text-white", tone === "good" ? "bg-emerald-600" : "bg-petrol-500")}>
          {tone === "good" ? "✓" : "!"}
        </span>
        {heading}
      </h3>
      <ul className="mt-3 divide-y divide-black/10">
        {items.map((item) => (
          <li key={item.title}>
            <details className="group">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-left text-sm font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                {item.title}
                <span aria-hidden="true" className="shrink-0 text-lg leading-none text-charcoal-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-3 text-sm leading-relaxed text-charcoal-700">{item.detail}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The two-sided argument: what price-comparison apps help with, and what they cannot solve on their own. Each point expands. */
export function ComparisonPanels() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel heading="What Google Maps and Waze help with" tone="good" items={helps} />
      <Panel heading="What they do not solve by themselves" tone="gap" items={doesNotSolve} />
    </div>
  );
}
