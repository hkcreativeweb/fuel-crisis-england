import "server-only";
import { createHash, randomUUID } from "crypto";
import { redis, redisWithStatus } from "@/lib/server/redis";

export type CommentStatus = "pending" | "approved" | "rejected";

export type StoredComment = {
  id: string;
  name: string;
  email: string | null;
  topic: string;
  comment: string;
  submittedAt: string;
  status: CommentStatus;
};

export type PublicComment = Pick<StoredComment, "id" | "name" | "topic" | "comment" | "submittedAt">;

const MAX_NAME = 80;
const MAX_TOPIC = 80;
const MAX_COMMENT = 2000;
const MAX_EMAIL = 254;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 10 * 60; // 5 submissions per 10 minutes per IP
const DEDUPE_WINDOW_SECONDS = 2 * 60; // identical submission blocked for 2 minutes

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function commentKey(id: string): string {
  return `fce:comment:${id}`;
}
function statusSetKey(status: CommentStatus): string {
  return `fce:comments:${status}`;
}
function rateLimitKey(ip: string): string {
  return `fce:comments:rl:${ip}`;
}
function dedupeKey(ip: string, name: string, comment: string): string {
  const hash = createHash("sha256").update(`${ip}:${name}:${comment}`).digest("hex");
  return `fce:comments:dedupe:${hash}`;
}

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, "");
}

export type SubmitInput = {
  name: unknown;
  email: unknown;
  topic: unknown;
  comment: unknown;
  ip: string;
};

export type SubmitResult =
  | { ok: true; comment: StoredComment }
  | { ok: false; status: 400; errors: Record<string, string> }
  | { ok: false; status: 429; error: string }
  | { ok: false; status: 503; error: string };

/** Validates, spam-checks, rate-limits and persists a new pending comment. */
export async function submitComment(input: SubmitInput): Promise<SubmitResult> {
  const name = typeof input.name === "string" ? stripTags(input.name).trim().slice(0, MAX_NAME) : "";
  const emailRaw = typeof input.email === "string" ? stripTags(input.email).trim().slice(0, MAX_EMAIL) : "";
  const topic = typeof input.topic === "string" ? stripTags(input.topic).trim().slice(0, MAX_TOPIC) : "";
  const comment = typeof input.comment === "string" ? stripTags(input.comment).trim().slice(0, MAX_COMMENT) : "";

  const errors: Record<string, string> = {};
  if (!name || name.length < 2) errors.name = "Enter your name.";
  if (emailRaw && !EMAIL_RE.test(emailRaw)) errors.email = "Enter a valid email address, or leave it blank.";
  if (!topic) errors.topic = "Enter a topic.";
  if (!comment || comment.length < 5) errors.comment = "Enter a comment (at least 5 characters).";

  const linkCount = (comment.match(/https?:\/\//gi) || []).length;
  if (linkCount > 2) errors.comment = "Comments may contain at most two links.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, status: 400, errors };
  }

  const rlKey = rateLimitKey(input.ip);
  const rlCount = await redis<number>(["INCR", rlKey]);
  if (rlCount === null) {
    return { ok: false, status: 503, error: "Comments are temporarily unavailable. Please try again shortly." };
  }
  if (rlCount === 1) {
    await redis(["EXPIRE", rlKey, RATE_LIMIT_WINDOW_SECONDS]);
  }
  if (rlCount > RATE_LIMIT_MAX) {
    return { ok: false, status: 429, error: "You're posting too quickly. Please wait a few minutes and try again." };
  }

  const dedupeSet = await redisWithStatus<string | null>(["SET", dedupeKey(input.ip, name, comment), "1", "NX", "EX", DEDUPE_WINDOW_SECONDS]);
  if (!dedupeSet.ok) {
    return { ok: false, status: 503, error: "Comments are temporarily unavailable. Please try again shortly." };
  }
  if (dedupeSet.result === null) {
    return { ok: false, status: 429, error: "It looks like you've already posted this. Give it a moment before posting again." };
  }

  const id = randomUUID();
  const submittedAt = new Date().toISOString();
  const record: StoredComment = {
    id,
    name,
    email: emailRaw || null,
    topic,
    comment,
    submittedAt,
    status: "pending",
  };

  const saved = await redis(["SET", commentKey(id), JSON.stringify(record)]);
  if (saved === null) {
    return { ok: false, status: 503, error: "Comments are temporarily unavailable. Please try again shortly." };
  }
  await redis(["ZADD", statusSetKey("pending"), Date.parse(submittedAt), id]);

  return { ok: true, comment: record };
}

/** Newest-first page of approved comments, public fields only. Returns null on storage failure. */
export async function getApprovedComments(offset: number, limit: number): Promise<{ comments: PublicComment[]; hasMore: boolean } | null> {
  const ids = await redis<string[]>(["ZRANGE", statusSetKey("approved"), offset, offset + limit - 1, "REV"]);
  if (ids === null) return null;
  if (ids.length === 0) return { comments: [], hasMore: false };

  const raw = await redis<(string | null)[]>(["MGET", ...ids.map(commentKey)]);
  if (raw === null) return null;

  const comments: PublicComment[] = raw
    .filter((v): v is string => typeof v === "string")
    .map((v) => JSON.parse(v) as StoredComment)
    .map(({ id, name, topic, comment, submittedAt }) => ({ id, name, topic, comment, submittedAt }));

  const total = await redis<number>(["ZCARD", statusSetKey("approved")]);
  const hasMore = typeof total === "number" ? offset + limit < total : false;

  return { comments, hasMore };
}

/** Full comment records (including email) for a given moderation status, oldest first. Admin use only. */
export async function getCommentsByStatus(status: CommentStatus): Promise<StoredComment[] | null> {
  const ids = await redis<string[]>(["ZRANGE", statusSetKey(status), 0, -1]);
  if (ids === null) return null;
  if (ids.length === 0) return [];

  const raw = await redis<(string | null)[]>(["MGET", ...ids.map(commentKey)]);
  if (raw === null) return null;

  return raw.filter((v): v is string => typeof v === "string").map((v) => JSON.parse(v) as StoredComment);
}

export async function moderateComment(id: string, newStatus: CommentStatus): Promise<boolean> {
  const raw = await redis<string>(["GET", commentKey(id)]);
  if (!raw) return false;
  const record = JSON.parse(raw) as StoredComment;

  const updated: StoredComment = { ...record, status: newStatus };
  const savedOk = await redis(["SET", commentKey(id), JSON.stringify(updated)]);
  if (savedOk === null) return false;

  await redis(["ZREM", statusSetKey(record.status), id]);
  await redis(["ZADD", statusSetKey(newStatus), Date.parse(record.submittedAt), id]);
  return true;
}

export async function deleteComment(id: string): Promise<boolean> {
  const raw = await redis<string>(["GET", commentKey(id)]);
  if (!raw) return false;
  const record = JSON.parse(raw) as StoredComment;

  await redis(["DEL", commentKey(id)]);
  await redis(["ZREM", statusSetKey(record.status), id]);
  return true;
}
