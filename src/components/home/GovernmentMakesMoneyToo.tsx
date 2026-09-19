import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HMRCReceiptCard } from "@/components/money-flow/HMRCReceiptCard";
import { fuelDutyReceiptsPartYear, fuelDutyReceiptsFullYear } from "@/lib/data/hmrc-receipts";

export function GovernmentMakesMoneyToo() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="The government is also in the fuel price"
          title="Government makes money from fuel too"
          description="Fuel Duty is a government tax on petrol and diesel, and the government sets the rate through taxation policy. VAT is also charged on most road fuel."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded bg-navy-950 p-2">
            <HMRCReceiptCard receipt={fuelDutyReceiptsPartYear} />
          </div>
          <div className="rounded bg-navy-950 p-2">
            <HMRCReceiptCard receipt={fuelDutyReceiptsFullYear} />
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-xs text-charcoal-600">
          These two figures come from different HMRC publications covering different periods — a
          year-to-date monthly total and a provisional full financial-year total. We never blend a
          calendar year with a financial year, or a part-year figure with a full year, without labelling
          it clearly.
        </p>
      </Container>
    </section>
  );
}
