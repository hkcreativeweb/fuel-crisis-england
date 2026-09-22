import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const VISITED_COOKIE = "fce_visited";
const VISIT_KEY = "fce:homepage-visits";
const SESSION_MAX_AGE_SECONDS = 60 * 30; // 30 minutes: avoid re-counting reloads within one browsing session

async function redisCommand(command: string[]): Promise<number | null> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  try {
    const res = await fetch(`${url}/${command.map(encodeURIComponent).join("/")}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result: number | string | null };
    const value = typeof data.result === "string" ? Number(data.result) : data.result;
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

/**
 * Returns the current homepage visit count. Increments it at most once per
 * 30-minute browser session (tracked via a short-lived, non-identifying
 * cookie), so repeated reloads or navigations within one visit aren't
 * double-counted. Never exposes Redis credentials to the client; fails
 * gracefully (count: null) if the store is unreachable.
 */
export async function GET() {
  const cookieStore = await cookies();
  const alreadyCounted = cookieStore.get(VISITED_COOKIE)?.value === "1";

  const count = alreadyCounted ? await redisCommand(["get", VISIT_KEY]) : await redisCommand(["incr", VISIT_KEY]);

  const response = NextResponse.json({ count, counted: !alreadyCounted && count !== null });

  if (!alreadyCounted && count !== null) {
    response.cookies.set(VISITED_COOKIE, "1", {
      maxAge: SESSION_MAX_AGE_SECONDS,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
    });
  }

  return response;
}
