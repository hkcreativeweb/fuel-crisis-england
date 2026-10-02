import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { ContactDetails } from "@/components/ui/ContactDetails";
import { PetitionCounter } from "@/components/petition/PetitionCounter";
import { InterestForm } from "@/components/take-action/TakeActionClient";
import { petitionPath, plannedProtest } from "@/lib/data/take-action-config";

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
        <Container>
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
        </Container>
      </section>

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
              Nothing here is confirmed until it appears in this table. Meeting point, accessibility and participation
              information will be added once they are agreed. Registering your interest does not mean an event is going ahead.
            </p>
          </Card>

          <div className="mt-6 max-w-2xl">
            <h3 className="text-base font-bold text-navy-900">Enquiries and organiser contact</h3>
            <p className="mt-1 text-sm text-charcoal-700">
              For enquiries about planned peaceful demonstrations or getting involved with Fuel Crisis England, contact us directly.
            </p>
            <ContactDetails className="mt-2 text-sm" />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-12 sm:py-14">
        <Container>
          <SectionHeading eyebrow="Background" title="Why are we organising?" />
          <div className="mt-4 max-w-3xl space-y-3 text-base leading-relaxed text-charcoal-700">
            <p>
              Fuel is a significant cost for many motorists, households and businesses, and for people whose work depends on
              driving. Pump prices reflect several things: wholesale costs, Fuel Duty, VAT and retailer margins, and government
              sets the tax part.
            </p>
            <p>
              The purpose of a demonstration would be to raise awareness of those costs and of the questions we are asking
              government and regulators, which are set out in{" "}
              <a href="/our-demands" className="font-semibold text-petrol-600 underline underline-offset-2">
                Our Demands
              </a>
              . The current official figures are on our{" "}
              <a href="/live-fuel-prices" className="font-semibold text-petrol-600 underline underline-offset-2">
                Live Fuel Prices
              </a>{" "}
              page, with sources.
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
          <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-navy-900">
            This planned demonstration is intended to be peaceful and lawful. Participants are expected to respect other road
            users, residents, emergency services, businesses and members of the public.
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
          <SectionHeading eyebrow="Add your name" title="Sign the Petition" />
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-charcoal-700">
            FCE&apos;s petition calls for transparency and answers on fuel affordability: how fuel taxes, wholesale costs and
            retailer margins make up the pump price, and what government will do when prices rise sharply. It is Fuel Crisis
            England&apos;s own petition, not an official UK Parliament petition.
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
            Signatures are stored in our database, one per email address, and the total above is the real count. The petition page
            explains what is collected and how it is handled.
          </p>
        </Container>
      </section>

      <section id="register" className="scroll-mt-24 bg-white py-12 sm:py-14">
        <Container>
          <SectionHeading eyebrow="Stay informed" title="Register for Protest Updates" />
          <div className="mt-6 max-w-2xl">
            <InterestForm />
          </div>
        </Container>
      </section>
    </>
  );
}
