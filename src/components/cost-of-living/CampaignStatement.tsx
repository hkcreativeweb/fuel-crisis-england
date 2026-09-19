const questions = [
  "How much are companies making?",
  "How much of the price at the pump is tax?",
  "How much goes to wholesale and refining costs?",
  "How much does the forecourt actually retain?",
  "And how are wages and household incomes changing at the same time?",
];

export function CampaignStatement() {
  return (
    <div className="rounded bg-navy-950 p-8 sm:p-12">
      <p className="text-2xl font-extrabold leading-snug text-white sm:text-3xl">
        People have every right to ask questions when they see the price of fuel, the cost of living, and
        corporate profits changing at the same time.
      </p>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
        We believe those questions should be answered with evidence, transparency, and publicly available
        data.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {questions.map((q) => (
          <li key={q} className="flex items-start gap-3 rounded-md border border-white/10 bg-white/5 p-4 text-sm font-semibold text-white">
            <span className="mt-0.5 text-petrol-400" aria-hidden="true">?</span>
            {q}
          </li>
        ))}
      </ul>

      <p className="mt-8 text-base font-semibold text-petrol-300">
        Fuel Crisis England exists to help people investigate those questions for themselves.
      </p>
    </div>
  );
}
