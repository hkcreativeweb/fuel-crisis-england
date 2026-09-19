import type { PublicExperience } from "@/lib/types";

/**
 * Example entries only, clearly marked as such. These illustrate the
 * card format and are not real submissions from real people. Real
 * submissions go through the moderation queue in
 * src/lib/server/petition-store.ts and are never auto-published here.
 */
export const examplePublicExperiences: PublicExperience[] = [
  {
    id: "example-1",
    areaOrCounty: "Greater Manchester",
    category: "commuter",
    impactSummary:
      "Example submission: 'My round-trip commute has gone from a manageable weekly cost to one of my biggest outgoings after rent.'",
    submittedOn: "2025-08-01",
    moderationStatus: "example",
  },
  {
    id: "example-2",
    areaOrCounty: "Devon",
    category: "rural-driver",
    impactSummary:
      "Example submission: 'There's no bus route near us. Every price rise at the pump is a price rise on getting to work and back.'",
    submittedOn: "2025-08-14",
    moderationStatus: "example",
  },
  {
    id: "example-3",
    areaOrCounty: "West Yorkshire",
    category: "tradesperson",
    impactSummary:
      "Example submission: 'Fuel for the van between jobs is now one of the biggest costs in my business, alongside materials.'",
    submittedOn: "2025-09-02",
    moderationStatus: "example",
  },
  {
    id: "example-4",
    areaOrCounty: "Kent",
    category: "family-household",
    impactSummary:
      "Example submission: 'We've had to cut back on other things to keep the car on the road — it's not optional for the school run.'",
    submittedOn: "2025-09-10",
    moderationStatus: "example",
  },
];

export const driverCategoryLabels: Record<PublicExperience["category"], string> = {
  commuter: "Commuter",
  "delivery-driver": "Delivery driver",
  "taxi-driver": "Taxi / private hire driver",
  tradesperson: "Tradesperson",
  "small-business-owner": "Small business owner",
  "family-household": "Family / household",
  "rural-driver": "Rural driver",
  other: "Other",
};
