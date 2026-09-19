import { Alert } from "@/components/ui/Alert";

const guidance = [
  "Check official rules for public assembly or protest in your area before organising or attending.",
  "Obtain any required permissions or notify the police in advance where this is legally required.",
  "Keep emergency vehicle routes clear at all times.",
  "Respect other road users, pedestrians, and residents.",
  "Never engage in threats, violence, harassment, dangerous driving, or property damage.",
  "Follow all instructions from police and safety officials at all times.",
];

export function ProtestGuidance() {
  return (
    <div className="rounded border border-slate-200 bg-white p-6 sm:p-8">
      <h3 className="text-lg font-bold text-navy-900">Lawful, peaceful protest</h3>
      <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
        People may participate in lawful, peaceful protest and civic action, subject to applicable UK
        laws and public safety requirements. Fuel Crisis England does not organise protests and does not
        encourage or endorse any unlawful activity.
      </p>

      <ul className="mt-5 space-y-3">
        {guidance.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-charcoal-700">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-petrol-500" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Alert tone="warning" title="Stay within the law.">
          Always check current guidance from your local police force and council before taking part in
          any public demonstration. This page provides general awareness only and is not legal advice.
        </Alert>
      </div>
    </div>
  );
}
