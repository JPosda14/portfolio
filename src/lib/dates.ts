// Month and period labels for the experience timeline, e.g. "Sep 2025 – Jan 2026" / "sep 2025 – ene 2026".
import type { Locale } from "../i18n/index.ts";

const MONTH = /^(\d{4})-(0[1-9]|1[0-2])$/;

/** "2025-09" → "Sep 2025" (en) / "sep 2025" (es). Always three-letter months, without dots. */
export function formatMonth(isoMonth: string, locale: Locale): string {
  const match = MONTH.exec(isoMonth);
  if (!match) throw new Error(`Expected a YYYY-MM month, got "${isoMonth}"`);
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1));
  const parts = new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" }).formatToParts(date);
  // ICU writes "sept." in Spanish; the design uses three letters everywhere.
  const month = (parts.find((part) => part.type === "month")?.value ?? "").replace(".", "").slice(0, 3);
  const year = parts.find((part) => part.type === "year")?.value ?? match[1];
  return `${month} ${year}`;
}

/** "2025-09", "2026-01" → "Sep 2025 – Jan 2026". */
export function formatPeriod(start: string, end: string, locale: Locale): string {
  return `${formatMonth(start, locale)} – ${formatMonth(end, locale)}`;
}
