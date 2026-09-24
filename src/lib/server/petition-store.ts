import "server-only";
import { createHash, randomUUID } from "crypto";
import { redis, redisWithStatus } from "@/lib/server/redis";
import type { DriverCategory } from "@/lib/types";

/**
 * Persistent petition store, backed by the same Upstash Redis database as
 * the Have Your Say comments.
 *
 * Data minimisation: we never store full names, email addresses or
 * postcodes. The email is kept only as a one-way SHA-256 hash so the same
 * address cannot sign twice. What is stored per signature is the general
 * area, category, the written experience, desired changes, the public
 * display choice and the submission time. Experiences are never published
 * automatically; they stay "pending" until a moderation step exists.
 */

export type PetitionSubmission = {
  id: string;
  submittedOn: string;
  areaOrCounty: string;
  category: DriverCategory;
  impactSummary: string;
  desiredChanges: string;
  displayPublicly: boolean;
  moderationStatus: "pending";
};

const COUNT_KEY = "fce:petition:count";
const PENDING_KEY = "fce:petition:pending";
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60; // 5 signatures per hour per connection

function submissionKey(id: string): string {
  return `fce:petition:submission:${id}`;
}
function emailKey(email: string): string {
  const hash = createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
  return `fce:petition:email:${hash}`;
}
function rateLimitKey(ip: string): string {
  const hash = createHash("sha256").update(ip).digest("hex");
  return `fce:petition:rl:${hash}`;
}

/** Real signature count, or null if storage is unavailable (never a made-up number). */
export async function getPetitionSignatureCount(): Promise<number | null> {
  const res = await redisWithStatus<string | null>(["GET", COUNT_KEY]);
  if (!res.ok) return null;
  const count = Number(res.result ?? 0);
  return Number.isFinite(count) ? count : null;
}

export type RecordResult =
  | { ok: true; signatureCount: number | null }
  | { ok: false; status: 409 | 429 | 503; error: string };

const UNAVAILABLE = "The petition is temporarily unavailable. Please try again shortly.";

export async function recordPetitionSubmission(input: {
  email: string;
  ip: string;
  areaOrCounty: string;
  category: DriverCategory;
  impactSummary: string;
  desiredChanges: string;
  displayPublicly: boolean;
}): Promise<RecordResult> {
  const rlKey = rateLimitKey(input.ip);
  const rlCount = await redis<number>(["INCR", rlKey]);
  if (rlCount === null) return { ok: false, status: 503, error: UNAVAILABLE };
  if (rlCount === 1) await redis(["EXPIRE", rlKey, RATE_LIMIT_WINDOW_SECONDS]);
  if (rlCount > RATE_LIMIT_MAX) {
    return { ok: false, status: 429, error: "Too many submissions from this connection. Please try again later." };
  }

  // One signature per email address, checked atomically.
  const claimed = await redisWithStatus<string | null>(["SET", emailKey(input.email), "1", "NX"]);
  if (!claimed.ok) return { ok: false, status: 503, error: UNAVAILABLE };
  if (claimed.result === null) {
    return { ok: false, status: 409, error: "This email address has already signed the petition." };
  }

  const submission: PetitionSubmission = {
    id: randomUUID(),
    submittedOn: new Date().toISOString(),
    areaOrCounty: input.areaOrCounty,
    category: input.category,
    impactSummary: input.impactSummary,
    desiredChanges: input.desiredChanges,
    displayPublicly: input.displayPublicly,
    moderationStatus: "pending",
  };

  const saved = await redis(["SET", submissionKey(submission.id), JSON.stringify(submission)]);
  if (saved === null) {
    // Release the email claim so the person can try again.
    await redis(["DEL", emailKey(input.email)]);
    return { ok: false, status: 503, error: UNAVAILABLE };
  }
  await redis(["ZADD", PENDING_KEY, Date.parse(submission.submittedOn), submission.id]);

  const count = await redis<number>(["INCR", COUNT_KEY]);
  return { ok: true, signatureCount: count };
}
