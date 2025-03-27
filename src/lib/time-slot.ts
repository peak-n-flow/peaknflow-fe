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

/**
 * Calculates the available slots for a specific date and time
 * 
 * @param date - The date in ISO string format
 * @param time - The time in "HH:MM" format
 * @param service - The service object containing slot information
 * @param bookings - The bookings object containing booking information
 * @param serviceEvents - Array of service events
 * @returns The number of available slots
 */
export function calculateAvailableSlots(
  date: string,
  time: string,
  service: { slot: number },
  bookings: { [key: string]: { start_at: string; end_at: string; status: string }[] },
  serviceEvents: {
    id: string;
    name: string;
    price: string;
    slot: number;
    start_time: string;
    end_time: string;
    start_date: string;
    end_date: string;
  }[]
): number {
  // Parse the time to get hours
  const [hours] = time.split(":").map(Number);
  
  // Create a date object for the selected date and time
  const selectedDateTime = new Date(date);
  selectedDateTime.setHours(hours, 0, 0, 0);
  
  // Format date to match the keys in bookings object
  const dateKey = selectedDateTime.toISOString().split('T')[0] + 'T00:00:00Z';
  
  // Find active event for this date and time
  const activeEvent = findActiveEvent(selectedDateTime, time, serviceEvents);
  
  // Determine total slots (from event if exists, otherwise from service)
  const totalSlots = activeEvent ? activeEvent.slot : service.slot;
  
  // Count bookings for this specific date and time
  const bookingsForDate = bookings[dateKey] || [];
  const bookingsForTimeSlot = bookingsForDate.filter(booking => {
    const bookingStart = new Date(booking.start_at);
    const bookingEnd = new Date(booking.end_at);
    
    return (
      selectedDateTime >= bookingStart && 
      selectedDateTime < bookingEnd && 
      booking.status === "booked"
    );
  });
  
  // Calculate available slots
  const availableSlots = Math.max(0, totalSlots - bookingsForTimeSlot.length);
  
  return availableSlots;
}

/**
 * Finds an active event for a specific date and time
 */
function findActiveEvent(
  date: Date,
  time: string,
  serviceEvents: {
    id: string;
    name: string;
    price: string;
    slot: number;
    start_time: string;
    end_time: string;
    start_date: string;
    end_date: string;
  }[]
) {
  const [hours] = time.split(":").map(Number);
  
  // Filter events that are active for this date and time
  const activeEvents = serviceEvents.filter(event => {
    // Check date range
    const eventStartDate = new Date(event.start_date);
    const eventEndDate = new Date(event.end_date);
    const isInDateRange = date >= eventStartDate && date <= new Date(eventEndDate.getTime() + 86400000); // Add one day to include end date
    
    if (!isInDateRange) return false;
    
    // Check time range
    const eventStartTime = new Date(event.start_time);
    const eventEndTime = new Date(event.end_time);
    const eventStartHour = eventStartTime.getHours();
    const eventEndHour = eventEndTime.getHours();
    
    return hours >= eventStartHour && hours < eventEndHour;
  });
  
  // If multiple events, choose the one with the shortest date range
  if (activeEvents.length > 1) {
    return activeEvents.reduce((shortest, current) => {
      const shortestDuration = 
        new Date(shortest.end_date).getTime() - new Date(shortest.start_date).getTime();
      const currentDuration = 
        new Date(current.end_date).getTime() - new Date(current.start_date).getTime();
      return currentDuration < shortestDuration ? current : shortest;
    });
  }
  
  return activeEvents[0];
}