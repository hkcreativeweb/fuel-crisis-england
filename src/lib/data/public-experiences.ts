import type { PublicExperience } from "@/lib/types";

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
