import { SourceCard } from "@/components/sources/SourceCard";
import { costOfLivingSources } from "@/lib/data/cost-of-living-sources";

export function SourcesPanel() {
  return (
    <div>
      <p className="max-w-2xl text-sm leading-relaxed text-charcoal-700">
        Every major statistic on this page is sourced and dated inline, next to the figure itself. These
        are the primary organisations we draw from.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {costOfLivingSources.map((source) => (
          <SourceCard key={source.name} source={source} />
        ))}
      </div>
    </div>
  );
}
