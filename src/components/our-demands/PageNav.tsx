const NAV_ITEMS = [
  { href: "#simulator", label: "Policy Simulator" },
  { href: "#demands", label: "Our 6 Demands" },
  { href: "#freeze-duty", label: "Can Government Freeze Fuel Duty?" },
  { href: "#cap-profits", label: "Crisis Profit & Margin Options" },
  { href: "#government-could", label: "What Government Can Change" },
  { href: "#sources", label: "Evidence & Sources" },
];

export function PageNav() {
  return (
    <nav aria-label="On this page" className="border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-wide text-charcoal-500">On this page</p>
      <ul className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        {NAV_ITEMS.map((item) => (
          <li key={item.href} className="shrink-0">
            <a
              href={item.href}
              className="inline-block whitespace-nowrap rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-charcoal-700 transition-colors hover:border-petrol-400 hover:text-petrol-600"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
