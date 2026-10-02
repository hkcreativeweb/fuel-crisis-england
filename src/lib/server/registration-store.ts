import "server-only";
import { createHash } from "crypto";
import { redis, redisWithStatus } from "@/lib/server/redis";
import { interestTopics } from "@/lib/data/take-action-config";

/**
 * Persistent store for "Register for updates" sign-ups, in the same Upstash
 * Redis database as comments and the petition. One record per email address
 * (keyed by a hash of the email, so repeat submissions update the record
 * instead of creating duplicates). Unlike petition signatures, the name and
 * email ARE stored here, because the whole point is to contact the person
 * with the updates they chose. This is stated on the privacy page.
 */

export type Registration = {
  id: string; // SHA-256 of the lower-cased email
  name: string;
  email: string;
  postcode: string | null;
  interests: string[];
  createdAt: string;
  updatedAt: string;
};

const LIST_KEY = "fce:registrations";
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UNAVAILABLE = "Registration is temporarily unavailable. Please try again shortly.";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/<[^>]*>/g, "").trim().slice(0, max) : "");

function emailId(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}
function rateLimitKey(ip: string): string {
  return `fce:registrations:rl:${createHash("sha256").update(ip).digest("hex")}`;
}

export type RegisterResult =
  | { ok: true }
  | { ok: false; status: 400; errors: Record<string, string> }
  | { ok: false; status: 429 | 503; error: string };

export async function registerForUpdates(input: { name: unknown; email: unknown; postcode: unknown; interests: unknown; consent: unknown; ip: string }): Promise<RegisterResult> {
  const name = clean(input.name, 80);
  const email = clean(input.email, 254).toLowerCase();
  const postcode = clean(input.postcode, 10);
  const interests = Array.isArray(input.interests)
    ? [...new Set(input.interests.filter((i): i is string => typeof i === "string" && (interestTopics as readonly string[]).includes(i)))]
    : [];

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (interests.length === 0) errors.interests = "Choose at least one type of update.";
  if (input.consent !== true) errors.consent = "Please confirm you are happy for us to contact you.";
  if (Object.keys(errors).length > 0) return { ok: false, status: 400, errors };

  const rlKey = rateLimitKey(input.ip);
  const attempts = await redis<number>(["INCR", rlKey]);
  if (attempts === null) return { ok: false, status: 503, error: UNAVAILABLE };
  if (attempts === 1) await redis(["EXPIRE", rlKey, RATE_LIMIT_WINDOW_SECONDS]);
  if (attempts > RATE_LIMIT_MAX) return { ok: false, status: 429, error: "Too many sign-ups from this connection. Please try again later." };

  const id = emailId(email);
  const now = new Date().toISOString();
  const existing = await redisWithStatus<string | null>(["HGET", LIST_KEY, id]);
  if (!existing.ok) return { ok: false, status: 503, error: UNAVAILABLE };

  let createdAt = now;
  if (existing.result) {
    try {
      createdAt = (JSON.parse(existing.result) as Registration).createdAt ?? now;
    } catch {
      // Unreadable old record: replace it.
    }
  }
  const record: Registration = { id, name, email, postcode: postcode || null, interests, createdAt, updatedAt: now };
  const saved = await redis(["HSET", LIST_KEY, id, JSON.stringify(record)]);
  return saved === null ? { ok: false, status: 503, error: UNAVAILABLE } : { ok: true };
}

/** Newest first. Admin use only. Returns null if storage is unavailable. */
export async function listRegistrations(): Promise<Registration[] | null> {
  const raw = await redis<string[]>(["HVALS", LIST_KEY]);
  if (raw === null) return null;
  return raw
    .flatMap((s) => {
      try {
        return [JSON.parse(s) as Registration];
      } catch {
        return [];
      }
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function deleteRegistration(id: string): Promise<boolean> {
  if (!/^[0-9a-f]{64}$/.test(id)) return false;
  return ((await redis<number>(["HDEL", LIST_KEY, id])) ?? 0) > 0;
}

/** Spreadsheet formulas can run from CSV cells; neutralise leading = + - @ characters. */
function csvCell(v: string): string {
  const safe = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function registrationsToCsv(rows: Registration[]): string {
  const header = ["Registered", "Name", "Email", "Postcode", "Interests"].join(",");
  const lines = rows.map((r) => [r.createdAt, r.name, r.email, r.postcode ?? "", r.interests.join("; ")].map(csvCell).join(","));
  return [header, ...lines].join("\r\n");
}
