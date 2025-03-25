import type { Booking } from "@/features/service/types";
import { parseISO } from "date-fns";

export function generateTimeSlots(gym: Gym, service: Service) {
  // Convert UTC times from API to local time
  const openAtUTC = parseISO(gym.open_at);
  const closeAtUTC = parseISO(gym.close_at);

  // Convert to local time
  const duration = service.duration_in_minutes;
  const openAtLocal = new Date(openAtUTC);
  const closeAtLocal = new Date(closeAtUTC);

  const openHour = openAtLocal.getHours();
  const openMinute = openAtLocal.getMinutes();
  let closeHour = closeAtLocal.getHours();
  const closeMinute = closeAtLocal.getMinutes();

  const slots = [];

  if (closeHour === 0 && closeMinute === 0) closeHour = 24;

  let currentTime = new Date(openAtLocal);

  while (
    currentTime.getHours() < closeHour ||
    (currentTime.getHours() === closeHour && currentTime.getMinutes() < closeMinute)
  ) {
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    slots.push(`${hours}:${minutes}`);

    // Increment by the service duration
    currentTime = new Date(currentTime.getTime() + duration * 60 * 1000);
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

  // Create a date in local timezone
  const localDate = new Date(
    `${dateStr}T${hours.toString().padStart(2, "0")}:00:00`
  );

  // Convert to UTC for comparison with API data
  const utcDate = new Date(localDate.toISOString());

  for (const booking of bookingsForDate) {
    // Convert booking times from UTC to local for comparison
    const bookingStart = new Date(booking.start_at);
    const bookingEnd = new Date(booking.end_at);

    // Compare the dates
    if (utcDate >= bookingStart && utcDate < bookingEnd) {
      return booking;
    }
  }
  return null;
}
