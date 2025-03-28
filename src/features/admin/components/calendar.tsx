"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { differenceInDays, format } from "date-fns";
import {
  calculateAvailableSlots,
  getTimeSlotWithStatus,
  isEventActiveForTimeSlot,
} from "@/lib/time-slot";
import { Booking } from "@/features/service/types";
import GymStatusLabel from "@/features/service/components/gym-status-label";
import { Badge } from "@/components/ui/badge";

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
  serviceEvents: Event[];
  bookings: { [key: string]: Booking[] };
  onSelectTimeSlot: (date: Date, time: string, availableSlots: number) => void;
}) {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-[#EAECF0] bg-transparent">
            {dateRange.map((date, index) => (
              <TableHead
                key={index}
                className="text-center text-black text-body-sm py-3"
              >
                {format(date, "EEE, MMM d")}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSlots.map((time, timeIndex) => (
            <TableRow
              key={`${time}-${timeIndex}`}
              className="border-[#EAECF0] bg-transparent"
            >
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

                // Calculate available slots
                const availableSlots = calculateAvailableSlots(
                  date.toISOString(),
                  time,
                  service,
                  bookings,
                  serviceEvents
                );

                // Modified: isSlotSelectable is true when there are available slots
                // regardless of whether there are some bookings
                const isSlotSelectable = availableSlots > 0;

                // Determine if the slot is fully booked
                const isFullyBooked = availableSlots === 0;

                return (
                  <TableCell
                    key={`${dateIndex}-${time}`}
                    onClick={() =>
                      isSlotSelectable &&
                      onSelectTimeSlot(date, time, availableSlots)
                    }
                    className={`
                          relative text-center text-body-md 
                          ${
                            !booking
                              ? "cursor-pointer hover:bg-light-40"
                              : booking.status === "closed"
                              ? "cursor-not-allowed "
                              : "cursor-not-allowed"
                          }
                        `}
                  >
                    <div className="flex justify-center items-center flex-col gap-1.5">
                      {time}
                      {isFullyBooked && (
                        <Badge
                          variant={
                            booking?.status == "booked" ? "default" : "dark"
                          }
                          className="flex items-center gap-1.5"
                        >
                          <div
                            className={`${
                              booking?.status == "booked"
                                ? "bg-[#037847]"
                                : "bg-secondary-20"
                            } w-1 h-1 rounded-full`}
                          />
                          {booking?.status == "booked" ? "Disewa" : "Tutup"}
                        </Badge>
                      )}
                      {selectedEvent ? (
                        <div className="flex flex-col">
                          <p className="text-black text-sm">
                            {selectedEvent.name} - Rp. {selectedEvent.price}
                          </p>
                          <p className="text-black text-sm">
                            {selectedEvent.slot > 1 &&
                              `(${availableSlots}/${selectedEvent.slot} available)`}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <p className="text-black text-sm">
                            Rp. {service.price}{" "}
                          </p>
                          <p>
                            {service.slot > 1 &&
                              `(${availableSlots}/${service.slot} available)`}
                          </p>
                        </div>
                      )}
                    </div>
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
