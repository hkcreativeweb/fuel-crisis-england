import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CommentForm } from "@/components/have-your-say/CommentForm";
import { ExampleComments } from "@/components/have-your-say/ExampleComments";

export const metadata: Metadata = {
  title: "Have Your Say",
  description: "Share your view on fuel prices and affordability in England.",
};

export default function HaveYourSayPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Have Your Say"
          title="Have Your Say"
          description="Share your thoughts on fuel prices, motoring costs, electric vehicles and the future of transport."
        />

        <div className="mt-10 max-w-2xl">
          <CommentForm />
        </div>

        <div className="mt-14 max-w-2xl">
          <ExampleComments />
        </div>
      </Container>
    </section>
  );
}
