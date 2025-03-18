import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

// Jakarta timezone (UTC+7)
export const JAKARTA_TIMEZONE = "Asia/Jakarta";

/**
 * Converts a UTC ISO string to Jakarta time
 */
export function toJakartaTime(isoString: string) {
  const date = parseISO(isoString);
  return toZonedTime(date, JAKARTA_TIMEZONE);
}

/**
 * Formats a date for display in Jakarta timezone
 */
export function formatJakartaTime(isoString: string, formatStr: string) {
  const jakartaTime = toJakartaTime(isoString);
  return format(jakartaTime, formatStr);
}

/**
 * Converts a local date and time to a UTC ISO string
 */
export function localToUTC(date: Date) {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}
