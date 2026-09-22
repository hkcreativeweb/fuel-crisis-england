import "server-only";
import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "fce_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function sessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(candidate: string): boolean {
  const token = sessionToken();
  if (!token) return false;
  const candidateHash = createHash("sha256").update(candidate).digest("hex");
  const a = Buffer.from(token, "hex");
  const b = Buffer.from(candidateHash, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function createAdminSession(): Promise<{ name: string; value: string; maxAge: number } | null> {
  const token = sessionToken();
  if (!token) return null;
  return { name: ADMIN_SESSION_COOKIE, value: token, maxAge: SESSION_MAX_AGE_SECONDS };
}

export async function isAdminRequest(): Promise<boolean> {
  const token = sessionToken();
  if (!token) return false;
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!value) return false;
  const a = Buffer.from(token, "hex");
  const b = Buffer.from(value, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}
