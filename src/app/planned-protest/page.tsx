import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { ContactDetails } from "@/components/ui/ContactDetails";
import { IndependenceNotice } from "@/components/ui/IndependenceNotice";
import { PetitionCounter } from "@/components/petition/PetitionCounter";
import { InterestForm } from "@/components/take-action/TakeActionClient";
import { petitionPath, plannedProtest } from "@/lib/data/take-action-config";
import { PetitionBanner } from "@/components/petition/PetitionBanner";

export const metadata: Metadata = pageMetadata("/planned-protest", {
  title: "Planned Protest",
  description:
    "Information about a planned peaceful and lawful public demonstration about fuel prices and their impact on motorists, households and businesses. Details to be announced.",
});

const confirmedDetails: [string, string][] = [
  ["Status", plannedProtest.status],
  ["Date", plannedProtest.date],
  ["Time", plannedProtest.time],
  ["Location", plannedProtest.location],
];

const optionalDetails: [string, string | null][] = [
  ["Meeting point", plannedProtest.meetingPoint],
  ["Accessibility information", plannedProtest.accessibility],
  ["Participation information", plannedProtest.participationInfo],
];

export default function PlannedProtestPage() {
  const extras = optionalDetails.filter((d): d is [string, string] => d[1] !== null);

  return (
    <>
      <section className="bg-navy-950 py-14 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
          <SectionHeading
            as="h1"
            tone="dark"
            eyebrow="Peaceful civic action"
            title="Planned Protest"
            description="Planning is underway for a peaceful and lawful public demonstration concerning fuel prices and their impact on households, workers and businesses."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="#register" size="lg" className="min-h-12">
              Register for Protest Updates
            </LinkButton>
            <LinkButton href="#petition" variant="outline-light" size="lg" className="min-h-12">
              Sign the Petition
            </LinkButton>
          </div>
          </div>
          <figure>
            <Link href="/petition#sign-petition" className="block overflow-hidden rounded-lg border border-white/15 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol-300">
              <Image
                src="/images/petition-crowd.webp"
                alt="A large crowd gathered outside a building beside a board reading Fuel Crisis England, sign the petition, with a 25,000 signatures target. People hold signs including: Fuel is unaffordable; Heating or driving?; Fair fuel prices now; Share your experience, add your voice."
                width={1024}
                height={559}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-auto w-full"
              />
            </Link>
            <figcaption className="mt-2 text-xs text-slate-300">Illustration, not a photograph of a real event. Tap the image to sign the petition.</figcaption>
          </figure>
        </Container>
      </section>

      <section className="border-b border-slate-200 bg-white py-6">
        <Container>
          <IndependenceNotice variant="full" className="max-w-3xl" />
        </Container>
      </section>

      <PetitionBanner tone="slate" />

      <section className="bg-white py-12 sm:py-14">
        <Container>
          <SectionHeading eyebrow="Event details" title="Protest details" />
          <Card className="mt-6 max-w-2xl border-petrol-300">
            <dl className="grid gap-4 sm:grid-cols-2">
              {confirmedDetails.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-bold uppercase tracking-wide text-charcoal-500">{k}</dt>
                  <dd className="mt-1 text-lg font-extrabold text-navy-900">{v}</dd>
                </div>
              ))}
              {extras.map(([k, v]) => (
                <div key={k} className="sm:col-span-2">
                  <dt className="text-xs font-bold uppercase tracking-wide text-charcoal-500">{k}</dt>
                  <dd className="mt-1 text-base text-charcoal-700">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm leading-relaxed text-charcoal-600">
              <strong className="font-semibold text-navy-900">Nothing here is confirmed until it appears in this table.</strong> Event
              details will only be published here once they are confirmed. Meeting point, accessibility and participation
              information will be added when agreed. Registering your interest does not mean an event is confirmed or that you are
              committing to attend.
            </p>
          </Card>

          <div className="mt-8 max-w-2xl">
            <h3 className="text-base font-bold text-navy-900">Enquiries and organiser contact</h3>
            <p className="mt-1 text-sm text-charcoal-700">
              For enquiries about the planned demonstration or getting involved with Fuel Crisis England, contact us directly.
            </p>
            <ContactDetails className="mt-2 text-sm" />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-12 sm:py-14">
        <Container>
          <SectionHeading eyebrow="Background" title="Why are we organising?" />
          <div className="mt-4 max-w-3xl space-y-3 text-base leading-relaxed text-charcoal-700">
            <p>Fuel is a significant cost for many motorists, households and businesses, particularly for people whose work depends on driving.</p>
            <p>Pump prices are influenced by several factors, including wholesale costs, Fuel Duty, VAT and retailer costs and margins.</p>
            <p>
              The purpose of a potential demonstration would be to raise public awareness of these costs and the questions Fuel Crisis
              England is raising with government and regulators, set out in{" "}
              <a href="/our-demands" className="font-semibold text-petrol-600 underline underline-offset-2">
                Our Demands
              </a>
              . Current figures are on our{" "}
              <a href="/live-fuel-prices" className="font-semibold text-petrol-600 underline underline-offset-2">
                Live Fuel Prices
              </a>{" "}
              page, which names the source of each one.
            </p>
            <p className="text-sm text-charcoal-600">
              Fuel Crisis England is independent of political parties and government and does not tell anyone how to vote.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-14">
        <Container>
          <SectionHeading eyebrow="Ground rules" title="Peaceful and lawful participation" />
          <p className="mt-4 max-w-3xl text-xl font-extrabold leading-snug text-navy-900">
            This planned demonstration is intended to be peaceful and lawful.
          </p>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-charcoal-700">
            Participants are expected to respect other road users, residents, emergency services, businesses and members of the public.
          </p>
          <ul className="mt-4 max-w-3xl list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-charcoal-700">
            <li>No violence, intimidation or harassment.</li>
            <li>No damage to property.</li>
            <li>No dangerous driving.</li>
            <li>Emergency vehicles must always be able to get through.</li>
            <li>Follow the law and any instructions from police and safety officials.</li>
          </ul>
          <p className="mt-4 text-sm text-charcoal-600">
            Read our{" "}
            <a href="/make-a-change#peaceful-protest" className="font-semibold text-petrol-600 underline underline-offset-2">
              guidance on lawful protest
            </a>
            . It is general information, not legal advice.
          </p>
        </Container>
      </section>

      <section id="petition" className="scroll-mt-24 bg-slate-50 py-12 sm:py-14">
        <Container>
          <SectionHeading eyebrow="Petition" title="Sign the Petition" />
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-charcoal-700">
            FCE&apos;s petition calls for transparency and answers on fuel affordability: how fuel taxes, wholesale costs and retailer
            margins make up the pump price, and what government will do when prices rise sharply.
          </p>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-charcoal-700">
            It is operated by Fuel Crisis England as an independent campaign petition. It is not a government petition and is not run
            by another organisation.
          </p>
          <div className="mt-5 max-w-md">
            <PetitionCounter tone="light" />
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={petitionPath} size="lg" className="min-h-12">
              Sign FCE&apos;s Petition
            </LinkButton>
            <LinkButton href="/have-your-say#uk-petitions" variant="secondary" size="lg" className="min-h-12">
              Official UK Parliament petitions
            </LinkButton>
          </div>
          <p className="mt-3 max-w-3xl text-xs leading-relaxed text-charcoal-500">
            The second link leads to petitions run by the UK Parliament. It is an external official resource and is not connected to
            Fuel Crisis England. The petition page explains what we collect and how it is handled.
          </p>
        </Container>
      </section>

      <section id="register" className="scroll-mt-24 bg-white py-12 sm:py-14">
        <Container>
          <SectionHeading eyebrow="Stay informed" title="Register for Protest Updates" />
          <IndependenceNotice className="mt-6 max-w-2xl" />
          <div className="mt-6 max-w-2xl">
            <InterestForm />
          </div>
        </Container>
      </section>
    </>
  );
}
