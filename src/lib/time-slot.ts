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


  const bookingsForDate = bookings[apiDateFormat] || [];
  console.log("Bookings for date:", bookingsForDate);

  const [hours] = time.split(":").map(Number);

  const slotTime = `${dateStr}T${hours.toString().padStart(2, "0")}:00:00Z`;
  console.log("Checking time slot:", slotTime);

  for (const booking of bookingsForDate) {
    console.log("Comparing with booking:", booking);
    const bookingStart = new Date(booking.start_at);
    const bookingEnd = new Date(booking.end_at);
    const slotDateTime = new Date(slotTime);

    if (slotDateTime >= bookingStart && slotDateTime < bookingEnd) {
      return booking;
    }
  }

  return null;
}
