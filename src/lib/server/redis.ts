import "server-only";

/**
 * Minimal Upstash Redis REST client shared by server-only stores. Uses the
 * REST API directly (no SDK) to avoid adding a dependency. Commands are
 * sent as a JSON array via POST, which avoids URL-encoding issues that the
 * GET-path form has with arbitrary text (e.g. comment bodies).
 */
export async function redis<T = unknown>(command: (string | number)[]): Promise<T | null> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result: T };
    return data.result ?? null;
  } catch {
    return null;
  }
}

/**
 * Like `redis`, but distinguishes "the command ran and returned null/false"
 * (e.g. a failed `SET ... NX`) from "the request itself failed" — the two
 * cases callers sometimes need to tell apart.
 */
export async function redisWithStatus<T = unknown>(command: (string | number)[]): Promise<{ ok: true; result: T } | { ok: false }> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return { ok: false };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
      cache: "no-store",
    });
    if (!res.ok) return { ok: false };
    const data = (await res.json()) as { result: T };
    return { ok: true, result: data.result };
  } catch {
    return { ok: false };
  }
}

/** Runs several commands as one Upstash REST pipeline call. */
export async function redisPipeline(commands: (string | number)[][]): Promise<unknown[] | null> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Array<{ result: unknown }>;
    return data.map((d) => d.result);
  } catch {
    return null;
  }
}
