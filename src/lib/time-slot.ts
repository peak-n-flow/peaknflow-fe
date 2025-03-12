import { Booking } from "@/features/service/types";
import { parseISO } from "date-fns";

export function generateTimeSlots(gym: Gym) {
  const openAt = parseISO(gym.open_at).getUTCHours();
  const closeAt = parseISO(gym.close_at).getUTCHours();
  const slots = [];

  for (let hour = openAt; hour < closeAt; hour++) {
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
  const bookingsForDate = bookings?.[apiDateFormat] || [];
  const [hours] = time.split(":").map(Number);

  const slotStartUTC = new Date(`${dateStr}T${hours}:00:00Z`);
  const slotEndUTC = new Date(`${dateStr}T${hours + 1}:00:00Z`);

  return bookingsForDate.find((booking: Booking) => {
    const bookingStart = new Date(booking.start_at);
    const bookingEnd = new Date(booking.end_at);

    return slotStartUTC >= bookingStart && slotStartUTC < bookingEnd;
  });
}
