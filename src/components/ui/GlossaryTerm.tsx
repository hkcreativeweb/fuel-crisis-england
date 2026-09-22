/** A small, tap-friendly "what does this mean?" info button next to a technical term. Uses native <details> so it works identically on hover-less touch devices and with the keyboard. */
export function GlossaryTerm({ definition }: { definition: string }) {
  return (
    <details className="group relative inline-block align-middle">
      <summary
        className="inline-flex h-4 w-4 cursor-pointer list-none items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold leading-none text-charcoal-600 hover:bg-petrol-100 hover:text-petrol-700"
        aria-label="What does this mean?"
      >
        i
      </summary>
      <div className="absolute left-0 top-full z-20 mt-1.5 hidden w-56 max-w-[85vw] rounded-md border border-slate-200 bg-white p-3 text-xs font-normal leading-relaxed text-charcoal-700 shadow-lg group-open:block">
        {definition}
      </div>
    </details>
  );
}
