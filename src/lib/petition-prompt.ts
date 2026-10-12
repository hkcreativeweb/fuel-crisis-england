/**
 * Browser-storage helpers for the petition invitation. Nothing here identifies anyone: just three small flags kept on the
 * visitor's own device. All access is wrapped so private windows and blocked storage simply behave as "nothing stored".
 */
export const PROMPT_DELAY_MS = 60_000;

const START_KEY = "fce:session-start"; // sessionStorage: when this browsing session first reached the site
const DISMISSED_KEY = "fce:petition-prompt-dismissed"; // sessionStorage: the visitor closed the invitation
const SIGNED_KEY = "fce:petition-signed"; // localStorage: this browser has submitted a signature

function read(store: "session" | "local", key: string): string | null {
  try {
    return (store === "session" ? window.sessionStorage : window.localStorage).getItem(key);
  } catch {
    return null;
  }
}

function write(store: "session" | "local", key: string, value: string) {
  try {
    (store === "session" ? window.sessionStorage : window.localStorage).setItem(key, value);
  } catch {
    // Storage blocked: the invitation just falls back to once per page load.
  }
}

/** When this browsing session started (stored the first time it is asked for), so a reload does not restart the 60 seconds. */
export function sessionStart(): number {
  const stored = Number(read("session", START_KEY));
  if (Number.isFinite(stored) && stored > 0) return stored;
  const now = Date.now();
  write("session", START_KEY, String(now));
  return now;
}

export const promptDismissed = () => read("session", DISMISSED_KEY) === "1";
export const dismissPrompt = () => write("session", DISMISSED_KEY, "1");
export const petitionSigned = () => read("local", SIGNED_KEY) === "1";
/** Called after a signature is accepted, so the invitation stops appearing on this browser. */
export const markPetitionSigned = () => write("local", SIGNED_KEY, "1");
