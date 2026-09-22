import "server-only";
import type { StoredComment } from "@/lib/server/comment-store";

const NOTIFY_TO = "contact.fuelcrisisengland@gmail.com";
const ADMIN_URL = "https://www.fuelcrisisengland.co.uk/admin/comments";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/**
 * Best-effort email alert for a new pending comment. Never throws — a
 * failed or unconfigured notification must not affect comment submission.
 */
export async function notifyNewComment(comment: StoredComment): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const domain = process.env.RESEND_EMAIL_DOMAIN;
  if (!apiKey || !domain) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Fuel Crisis England <notifications@${domain}>`,
        to: [NOTIFY_TO],
        subject: `New comment awaiting review: "${comment.topic}"`,
        html: `
          <p>A new comment has been submitted on Have Your Say and is waiting for moderation.</p>
          <p>
            <strong>Name:</strong> ${escapeHtml(comment.name)}<br />
            <strong>Topic:</strong> ${escapeHtml(comment.topic)}<br />
            ${comment.email ? `<strong>Email:</strong> ${escapeHtml(comment.email)}<br />` : ""}
          </p>
          <p><strong>Comment:</strong></p>
          <p>${escapeHtml(comment.comment)}</p>
          <p><a href="${ADMIN_URL}">Review it in the moderation dashboard</a></p>
        `,
      }),
    });
  } catch {
    // Notification is a convenience, not a critical path — swallow failures.
  }
}
