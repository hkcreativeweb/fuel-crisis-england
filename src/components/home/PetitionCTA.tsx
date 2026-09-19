import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { PetitionCounter } from "@/components/petition/PetitionCounter";

export function PetitionCTA() {
  return (
    <section className="bg-petrol-500 py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            People deserve a voice on fuel affordability.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-orange-50">
            Add your name to the public petition calling for transparency on fuel pricing, fuel duty,
            and support for drivers across England.
          </p>
          <div className="mt-7">
            <LinkButton href="/petition" variant="secondary" size="lg">
              Sign the Petition
            </LinkButton>
          </div>
        </div>
        <div className="rounded bg-navy-950/90 p-6 sm:p-8">
          <PetitionCounter tone="dark" />
        </div>
      </Container>
    </section>
  );
}
