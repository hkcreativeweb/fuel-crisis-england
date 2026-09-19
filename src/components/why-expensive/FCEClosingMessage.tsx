const points = [
  "It's about understanding why the price is what it is.",
  "It's about understanding what Government collects.",
  "It's about understanding what businesses spend and earn.",
  "It's about understanding how global markets affect the UK.",
  "It's about understanding why the cost of living has risen.",
  "And it's about understanding whether people's incomes and purchasing power have kept pace.",
];

export function FCEClosingMessage() {
  return (
    <div className="text-center">
      <p className="text-2xl font-extrabold text-white sm:text-3xl">It&apos;s not just about the price.</p>
      <ul className="mx-auto mt-6 max-w-xl space-y-2 text-left text-base text-slate-300">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-petrol-500" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-lg font-bold text-petrol-400">Follow the money. Check the evidence. Ask the questions.</p>
    </div>
  );
}
