import { format } from "date-fns";

export function formatLocalTime(
  dateString: string | Date,
  formatStr: string
): string {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  return format(date, formatStr);
}

export function localToUTC(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}

export function utcToLocal(utcDateString: string): Date {
  const date = new Date(utcDateString);
  return new Date(date);
}

export function formatToLocalISO(date: Date) {
  const tzOffset = -date.getTimezoneOffset();
  const offsetHours = String(Math.floor(Math.abs(tzOffset) / 60)).padStart(
    2,
    "0"
  );
  const offsetMinutes = String(Math.abs(tzOffset) % 60).padStart(2, "0");
  const offsetSign = tzOffset >= 0 ? "+" : "-";

  const formattedDate =
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}` +
    `-${String(date.getDate()).padStart(2, "0")}T` +
    `${String(date.getHours()).padStart(2, "0")}:` +
    `${String(date.getMinutes()).padStart(2, "0")}:` +
    `${String(date.getSeconds()).padStart(2, "0")}`;

  return tzOffset === 0
    ? `${formattedDate}Z`
    : `${formattedDate}${offsetSign}${offsetHours}:${offsetMinutes}`;
}
