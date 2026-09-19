import { fuelSavingTools, type ToolCategory } from "@/lib/data/fuel-saving-tools";
import { Alert } from "@/components/ui/Alert";

const categories: ToolCategory[] = ["Fuel-price comparison", "Route planning", "EV charging comparison", "Fuel tracking"];

export function ToolsSection() {
  return (
    <div>
      <Alert tone="info" title="We don't guarantee any app will find the cheapest fuel everywhere.">
        Coverage, pricing, and features can change — always check the app or website directly for its
        current terms, and verify a price before relying on it.
      </Alert>

      <div className="mt-8 space-y-10">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-lg font-bold text-navy-900">{category}</h3>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {fuelSavingTools
                .filter((t) => t.category === category)
                .map((tool) => (
                  <div key={tool.name} className="flex flex-col rounded border border-slate-200 p-5">
                    <h4 className="text-base font-bold text-navy-900">{tool.name}</h4>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-charcoal-700">{tool.whatItDoes}</p>
                    <dl className="mt-3 space-y-1 text-xs text-charcoal-600">
                      <div className="flex justify-between">
                        <dt>Pricing</dt>
                        <dd className="font-semibold text-navy-900">{tool.pricing}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Platforms</dt>
                        <dd className="font-semibold text-navy-900">{tool.platforms}</dd>
                      </div>
                    </dl>
                    <p className="mt-2 text-xs text-charcoal-600">{tool.privacyNote}</p>
                    {tool.url !== "#" ? (
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-petrol-600 underline underline-offset-2"
                      >
                        Visit official site <span aria-hidden="true">&rarr;</span>
                      </a>
                    ) : null}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
