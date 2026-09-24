import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redis } from "@/lib/server/redis";

const VISITED_COOKIE = "fce_visited";
const VISIT_KEY = "fce:homepage-visits";
const SESSION_MAX_AGE_SECONDS = 60 * 30; // 30 minutes: avoid re-counting reloads within one browsing session

async function redisCommand(command: string[]): Promise<number | null> {
  const result = await redis<number | string>(command);
  const value = typeof result === "string" ? Number(result) : result;
  return typeof value === "number" && Number.isFinite(value) ? value : null;
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
