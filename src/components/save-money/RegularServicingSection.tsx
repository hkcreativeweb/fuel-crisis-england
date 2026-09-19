import Image from "next/image";
import { maintenanceItems, servicingKeyMessage } from "@/lib/data/maintenance-tips";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { imageCredits } from "@/lib/data/image-credits";

const credit = imageCredits["garage-tyres"];

export function RegularServicingSection() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
      <div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image src={credit.src} alt={credit.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </div>
        <PhotoCredit credit={credit} className="mt-3 text-charcoal-500" />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wide text-accent-save">Regular servicing can save you money</p>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-navy-900">{servicingKeyMessage}</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {maintenanceItems.map((item) => (
            <li key={item.title} className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-bold text-navy-900">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-charcoal-700">{item.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-charcoal-600">
          We do not promise a specific percentage fuel saving from servicing — the effect depends entirely
          on your vehicle&apos;s condition beforehand. Always follow your manufacturer&apos;s recommended
          service schedule.
        </p>
      </div>
    </div>
  );
}
