"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTimeSlotWithStatus } from "@/lib/time-slot";
import { addDays, differenceInDays, format, isWithinInterval } from "date-fns";
import type { Booking } from "../types";
import GymStatusLabel from "./gym-status-label";

export default function Calendar({
  service,
  dateRange,
  timeSlots,
  bookings,
  serviceEvents,
  onSelectTimeSlot,
}: {
  service: Service;
  dateRange: Date[];
  timeSlots: string[];
  bookings: { [key: string]: Booking[] };
  serviceEvents: Event[];
  onSelectTimeSlot: (date: Date, time: string) => void;
}) {
  // Function to check if an event is active for a specific date and time
  const isEventActiveForTimeSlot = (event: Event, date: Date, time: string) => {
    // Convert dates to local time
    const eventStartDate = new Date(event.start_date);
    const eventEndDate = new Date(event.end_date);
    const currentDate = new Date(date);

    // Check if the current date is within the event's date range
    const isDateInRange = isWithinInterval(currentDate, {
      start: eventStartDate,
      end: addDays(eventEndDate, 1), // Add a day to include the end date
    });

    if (!isDateInRange) return false;

    // Convert start_time and end_time to local time and extract hours
    const eventStartTime = new Date(event.start_time);
    const eventEndTime = new Date(event.end_time);
    const [slotHour] = time.split(":").map(Number);

    // Check if the time slot is within the event's time range
    return (
      slotHour >= eventStartTime.getHours() &&
      slotHour < eventEndTime.getHours()
    );
  };
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-secondary-60 bg-transparent">
            {dateRange.map((date, index) => (
              <TableHead
                key={index}
                className="border border-secondary-60 text-center text-white md:text-h4 h-20 md:h-36"
              >
                {format(date, "EEE, MMM d")}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSlots.map((time) => (
            <TableRow className="border-secondary-60 bg-transparent" key={time}>
              {dateRange.map((date, dateIndex) => {
                const dateStr = format(date, "yyyy-MM-dd");
                const booking = getTimeSlotWithStatus(dateStr, time, bookings);

                // Find events active for this date and time slot
                const activeEvents = serviceEvents.filter((event) =>
                  isEventActiveForTimeSlot(event, date, time)
                );

                // If multiple events, choose the one with the shortest date range
                const selectedEvent =
                  activeEvents.length > 1
                    ? activeEvents.reduce((shortest, current) => {
                        const shortestDuration = differenceInDays(
                          new Date(shortest.end_date),
                          new Date(shortest.start_date)
                        );
                        const currentDuration = differenceInDays(
                          new Date(current.end_date),
                          new Date(current.start_date)
                        );
                        return currentDuration < shortestDuration
                          ? current
                          : shortest;
                      })
                    : activeEvents[0];

                const isSlotSelectable = !booking && !selectedEvent;

                return (
                  <TableCell
                    key={dateIndex}
                    onClick={() =>
                      isSlotSelectable && onSelectTimeSlot(date, time)
                    }
                    className={`
                      border border-secondary-60 
                      p-6 h-20 md:h-36 md:text-h1 text-center md:text-start relative w-[calc(100%/7)]  
                      ${
                        !booking
                          ? "cursor-pointer hover:bg-primary-80"
                          : booking.status === "closed"
                          ? "cursor-not-allowed bg-secondary-100"
                          : "bg-primary-100 cursor-not-allowed"
                      }
                    `}
                  >
                    {time}
                    {booking && <GymStatusLabel status={booking.status} />}
                    {selectedEvent ? (
                        <p className="text-white text-sm">
                          {selectedEvent.name} - Rp. {selectedEvent.price}
                        </p>
                    ) : (
                      <p className="text-white text-sm">Rp. {service.price}</p>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
