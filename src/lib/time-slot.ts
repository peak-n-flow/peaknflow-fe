import { Booking } from "@/features/service/types";
import { parseISO } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";
import { JAKARTA_TIMEZONE } from "./date";

export function generateTimeSlots(gym: Gym) {
  const openAtUTC = parseISO(gym.open_at);
  const closeAtUTC = parseISO(gym.close_at);

  const openAtJakarta = toZonedTime(openAtUTC, JAKARTA_TIMEZONE);
  const closeAtJakarta = toZonedTime(closeAtUTC, JAKARTA_TIMEZONE);

  const openHour = openAtJakarta.getHours();
  let closeHour = closeAtJakarta.getHours();

  const slots = [];

  if (closeHour === 0) closeHour = 24;

  for (let hour = openHour; hour < closeHour; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
  }

  return slots;
}

export function getTimeSlotWithStatus(
  dateStr: string,
  time: string,
  bookings: { [key: string]: Booking[] }
) {
  const apiDateFormat = `${dateStr}T00:00:00Z`;

  const bookingsForDate = bookings[apiDateFormat] || [];

  const [hours] = time.split(":").map(Number);

  const jakartaDate = new Date(
    `${dateStr}T${hours.toString().padStart(2, "0")}:00:00`
  );

  const utcDate = fromZonedTime(jakartaDate, JAKARTA_TIMEZONE);
  const slotTimeUTC = utcDate.toISOString();

  for (const booking of bookingsForDate) {
    const bookingStart = new Date(booking.start_at);
    const bookingEnd = new Date(booking.end_at);
    const slotDateTime = new Date(slotTimeUTC);

    if (slotDateTime >= bookingStart && slotDateTime < bookingEnd) {
      return booking;
    }
  }
  return null;
}
