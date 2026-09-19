import { Alert } from "@/components/ui/Alert";

const shareItems = ["Official figures", "Source links", "Government announcements", "Annual reports", "Regulator findings"];

export function ShareVerifiedInfoSection() {
  return (
    <div className="rounded-2xl border border-slate-200 p-6">
      <h3 className="text-base font-bold text-navy-900">Share verified information</h3>
      <p className="mt-2 text-sm text-charcoal-700">Encourage others to share:</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {shareItems.map((item) => (
          <li key={item} className="rounded-full bg-slate-100 px-3.5 py-1.5 text-sm font-medium text-charcoal-700">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <Alert tone="warning" title="Keep it lawful and respectful.">
          Do not encourage harassment, threats, spam, or abusive messages toward MPs, officials, or
          companies. Share sourced facts, not speculation.
        </Alert>
      </div>
    </div>
  );
}
