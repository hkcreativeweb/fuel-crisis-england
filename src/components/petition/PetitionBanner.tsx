import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PetitionCountLine } from "@/components/petition/PetitionCountLine";

/** A clickable "sign the petition" banner. It links to the sign-up form on /petition. */
const variants = {
  sign: {
    src: "/images/sign-the-petition.webp",
    width: 1024,
    height: 559,
    maxW: "max-w-3xl",
    alt: "Fuel Crisis England: sign the petition. A group of people hold a Fuel Crisis England banner beside a petrol station. Share your experience, add your voice. Sign, share, speak up. Target: 25,000 signatures.",
  },
  demand: {
    src: "/images/demand-affordability.webp",
    width: 501,
    height: 254,
    maxW: "max-w-xl",
    alt: "Demand fuel affordability. Four people hold a banner reading Fuel Crisis England: a public concern, beside a petrol pump. Sign, share, speak up. Target: 25,000 signatures.",
  },
} as const;

export function PetitionBanner({
  tone = "white",
  variant = "sign",
  showCount = true,
}: {
  tone?: "white" | "slate";
  variant?: keyof typeof variants;
  /** Hide the count on pages that already show the full petition counter. */
  showCount?: boolean;
}) {
  const v = variants[variant];
  return (
    <section aria-label="Sign the FCE petition" className={`border-t border-slate-200 py-8 sm:py-12 ${tone === "slate" ? "bg-slate-50" : "bg-white"}`}>
      <Container>
        <Link
          href="/petition#sign-petition"
          className={`mx-auto block ${v.maxW} overflow-hidden rounded-lg border border-slate-200 shadow-md transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol-500`}
        >
          <Image
            src={v.src}
            alt={v.alt}
            width={v.width}
            height={v.height}
            sizes="(min-width: 768px) 768px, 100vw"
            className="h-auto w-full"
          />
        </Link>
        {showCount ? <PetitionCountLine className={`mx-auto mt-3 ${v.maxW}`} /> : null}
        <p className={`mx-auto mt-2 ${v.maxW} text-xs text-charcoal-600`}>
          Tap the image to sign. This is Fuel Crisis England&apos;s own petition, not an official UK Parliament petition.
        </p>
      </Container>
    </section>
  );
}
