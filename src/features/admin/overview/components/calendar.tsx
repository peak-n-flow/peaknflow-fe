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
import { getTimeSlotWithStatus } from "@/lib/time-slot";
import { Booking } from "@/features/service/types";
import GymStatusLabel from "@/features/service/components/gym-status-label";
import { Badge } from "@/components/ui/badge";

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
          {timeSlots.map((time) => (
            <TableRow key={time} className="border-[#EAECF0] bg-transparent">
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
                    <div className="flex justify-center items-center flex-col gap-1.5 lg:flex-row">
                      {time}
                      {booking && (
                        <Badge
                          variant={
                            booking.status == "booked" ? "default" : "dark"
                          }
                          className="flex items-center gap-1.5"
                        >
                          <div
                            className={`${
                              booking.status == "booked"
                                ? "bg-[#037847]"
                                : "bg-secondary-20"
                            } w-1 h-1 rounded-full`}
                          />
                          {booking.status == "booked" ? "Disewa" : "Tutup"}
                        </Badge>
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
