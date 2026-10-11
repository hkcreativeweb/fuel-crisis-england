import { SafeImage } from "@/components/ui/SafeImage";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Container } from "@/components/ui/Container";
import { imageCredits } from "@/lib/data/image-credits";
import { cn } from "@/lib/utils";

/**
 * A navy page header with a photograph behind it (decorative: its description sits in the credit, and the text on top
 * carries the meaning). A heavy navy overlay keeps the text readable whatever the photo.
 */
export function PhotoBand({ id, children, className, position = "object-center", priority = true }: { id: string; children: React.ReactNode; className?: string; position?: string; priority?: boolean }) {
  const credit = imageCredits[id];
  return (
    <section className={cn("relative isolate overflow-hidden bg-navy-950 py-14 sm:py-16", className)}>
      <SafeImage src={credit.src} alt="" fill sizes="100vw" priority={priority} className={cn("-z-10 object-cover opacity-40", position)} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" aria-hidden="true" />
      <Container>
        {children}
        <PhotoCredit credit={credit} className="mt-8" />
      </Container>
    </section>
  );
}
