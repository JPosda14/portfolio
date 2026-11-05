// Expiry of the "Now" cell. The site is static, so this runs at build time.

export const NOW_MAX_DAYS = 90;

const DAY_MS = 24 * 60 * 60 * 1000;
const ISO_DAY = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Parses "YYYY-MM-DD" as a UTC day; throws with the value if it is not a real date. */
export function parseDay(iso: string): Date {
  const match = ISO_DAY.exec(iso);
  const date = match ? new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))) : undefined;
  if (!date || date.toISOString().slice(0, 10) !== iso) {
    throw new Error(`"Now" needs a real YYYY-MM-DD date, got "${iso}". Fix it in src/content/home/.`);
  }
  return date;
}

/** True while `updated` is at most NOW_MAX_DAYS days before `today`. */
export function isNowFresh(updated: string, today: Date, maxDays = NOW_MAX_DAYS): boolean {
  const start = parseDay(updated).getTime();
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  return (todayUtc - start) / DAY_MS <= maxDays;
}
