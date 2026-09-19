import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

const saveMoneyItems = ["Fuel-saving tips", "Personal fuel calculator", "Apps and tools", "Journey planning", "Money-saving checklist"];
const makeChangeItems = ["Follow the money", "Government tax receipts", "Company profits", "Fuel Duty policy", "The profit-cap debate", "Contact your MP", "Lawful civic action"];

export function TwoPathways() {
  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-petrol-500/30 bg-petrol-500/10 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-petrol-300">Pathway one</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Save Money Now</h2>
            <ul className="mt-5 space-y-2 text-sm text-slate-200">
              {saveMoneyItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-petrol-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <LinkButton href="/save-fuel-money" size="lg">
                Save Fuel, Save Money
              </LinkButton>
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/5 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Pathway two</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Make Change</h2>
            <ul className="mt-5 space-y-2 text-sm text-slate-200">
              {makeChangeItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <LinkButton href="/follow-the-money" variant="outline-light" size="lg">
                Follow The Money
              </LinkButton>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-lg font-bold text-white">
          Protect your household today. <span className="text-petrol-400">Demand better decisions for tomorrow.</span>
        </p>
      </Container>
    </section>
  );
}
