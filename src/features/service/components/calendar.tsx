"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import type { Booking } from "../types";
import { getTimeSlotWithStatus } from "@/lib/time-slot";
import GymStatusLabel from "./gym-status-label";

export default function Calendar({
  dateRange,
  timeSlots,
  bookings,
  onSelectTimeSlot,
}: {
  dateRange: Date[];
  timeSlots: string[];
  bookings: { [key: string]: Booking[] };
  onSelectTimeSlot: (date: Date, time: string) => void;
}) {
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
            <TableRow key={time} className="border-secondary-60 bg-transparent">
              {dateRange.map((date, dateIndex) => {
                const dateStr = format(date, "yyyy-MM-dd");
                const booking = getTimeSlotWithStatus(dateStr, time, bookings);

                const isSlotSelectable = !booking;

                return (
                  <TableCell
                    key={dateIndex}
                    onClick={() =>
                      isSlotSelectable && onSelectTimeSlot(date, time)
                    }
                    className={`
                          border border-secondary-60 
                          p-6 h-20 md:h-36 md:text-h1 text-center md:text-start relative 
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
