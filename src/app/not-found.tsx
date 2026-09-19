import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-navy-950 py-24">
      <Container className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-petrol-300">404</p>
        <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-300">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-8">
          <LinkButton href="/" variant="secondary">
            Back to homepage
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
