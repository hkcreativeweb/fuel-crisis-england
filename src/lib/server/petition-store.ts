import "server-only";
import type { DriverCategory } from "@/lib/types";

/**
 * DEMO-MODE, NON-PERSISTENT STORE.
 *
 * This project has no database or persistence layer connected. Data
 * held here lives only in server memory for the lifetime of the running
 * process and is lost on every restart or redeploy. It exists so the
 * petition form and counter are genuinely interactive in this preview
 * build, but it must never be presented to users as a real, durable
 * petition backend. Every page that reads from this store must display
 * a visible "demo mode" notice.
 *
 * To connect a real backend: replace the functions below with calls to
 * your database / petition API, and remove the demo-mode notices from
 * the UI once the data is genuinely live and persisted.
 */

export type PetitionSubmission = {
  id: string;
  submittedOn: string;
  areaOrCounty: string;
  category: DriverCategory;
  impactSummary: string;
  displayPublicly: boolean;
  moderationStatus: "pending";
};

type Store = {
  signatureCount: number;
  submissions: PetitionSubmission[];
};

const globalForStore = globalThis as unknown as { __fuelCrisisStore?: Store };

function getStore(): Store {
  if (!globalForStore.__fuelCrisisStore) {
    globalForStore.__fuelCrisisStore = {
      signatureCount: 0,
      submissions: [],
    };
  }
  return globalForStore.__fuelCrisisStore;
}

export function getPetitionStats() {
  const store = getStore();
  return {
    signatureCount: store.signatureCount,
    pendingModerationCount: store.submissions.filter((s) => s.moderationStatus === "pending").length,
  };
}

export function recordPetitionSubmission(input: {
  areaOrCounty: string;
  category: DriverCategory;
  impactSummary: string;
  displayPublicly: boolean;
}): PetitionSubmission {
  const store = getStore();
  store.signatureCount += 1;

  const submission: PetitionSubmission = {
    id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    submittedOn: new Date().toISOString(),
    areaOrCounty: input.areaOrCounty,
    category: input.category,
    impactSummary: input.impactSummary,
    displayPublicly: input.displayPublicly,
    moderationStatus: "pending",
  };
  store.submissions.push(submission);
  return submission;
}
