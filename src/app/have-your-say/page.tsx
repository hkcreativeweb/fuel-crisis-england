import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Have Your Say",
  description: "Share your view on fuel prices and affordability in England.",
};

export default function HaveYourSayPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Have Your Say" title="Have Your Say" description="This page is being prepared. A way to share your experience of fuel prices will appear here soon." />
      </Container>
    </section>
  );
}
