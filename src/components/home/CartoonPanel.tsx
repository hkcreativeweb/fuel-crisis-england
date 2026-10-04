import Image from "next/image";
import { Container } from "@/components/ui/Container";

const panels = {
  2: { w: 496, h: 454, alt: "Cartoon panel: a worried character squeezed onto a crowded bus with a goat and a goose, thinking about his wallet. The sign says max capacity 150 souls, plus pets if they fit." },
  3: { w: 496, h: 454, alt: "Cartoon panel: a character pedals a bicycle fitted with hamster wheels past a sign pricing unleaded in one debt-free child and diesel in a decent night's sleep." },
  4: { w: 496, h: 454, alt: "Cartoon panel: a character clutches his head at a barter-only pump where an attendant holds a wheel of cheese. The sign says unleaded costs artisanal cheese and diesel a vintage vinyl collection." },
  5: { w: 568, h: 940, alt: "Cartoon panel: a worried character in a tin helmet points at a fuel nozzle held by a knight in armour beside a price board showing £2.99 unleaded and £3.19 diesel, asking why fuel at £3 must be delivered via an armoured secure deposit-box." },
  7: { w: 450, h: 460, alt: "Cartoon panel: a character in a tin helmet stands by a steampunk bicycle-rickshaw labelled UK Alternative Transit V2.0, while a ticket-office worker says UK Alternative Plan 1 costs your life savings, with a 38-year wait list." },
} as const;

type PanelId = keyof typeof panels;

/** One panel of the editorial cartoon, shown as a short break between sections. Panels with lettering errors in the artwork (1 and 6) are deliberately not included until they are redrawn. */
export function CartoonPanel({ n, tone = "white" }: { n: PanelId; tone?: "white" | "slate" }) {
  const p = panels[n];
  const tall = p.h > p.w;
  return (
    <section aria-label="Cartoon" className={`border-b border-slate-200 py-8 sm:py-12 ${tone === "slate" ? "bg-slate-50" : "bg-white"}`}>
      <Container>
        <figure className={`mx-auto ${tall ? "max-w-xs" : "max-w-md"}`}>
          <Image
            src={`/images/cartoon-panel-${n}.webp`}
            alt={p.alt}
            width={p.w}
            height={p.h}
            sizes={tall ? "(min-width: 640px) 320px, 100vw" : "(min-width: 640px) 448px, 100vw"}
            className="h-auto w-full rounded-lg border border-slate-200 shadow-md"
          />
          <figcaption className="mt-2 text-xs text-charcoal-600">Editorial cartoon: satire, not a statement of fact. Scenes and prices are illustrative. Fuel Crisis England is independent and not affiliated with any political party.</figcaption>
        </figure>
      </Container>
    </section>
  );
}
