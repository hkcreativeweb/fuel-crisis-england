import { Alert } from "@/components/ui/Alert";

export function NewsEmptyState() {
  return (
    <Alert tone="info" title="No live news feed is connected yet.">
      We never invent news articles or headlines. Once a verified news or data feed is connected,
      genuine, sourced articles will appear here automatically. In the meantime, browse the official
      sources below directly.
    </Alert>
  );
}
