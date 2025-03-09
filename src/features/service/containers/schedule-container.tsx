"use client";
import { addDays, format, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookingModal from "../components/booking-modal";
import useSession from "@/features/auth/hooks/use-session";
interface Booking {
  id: string;
  date: string;
  time: string;
  label: string;
  name: string;
  notes?: string;
}
export default function ScheduleContainer() {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return startOfWeek(today, { weekStartsOn: 1 }); // Start from Monday
  });

  // Function to navigate to previous week
  const goToPreviousWeek = () => {
    setStartDate((prev) => addDays(prev, -4));
  };

  // Function to navigate to next week
  const goToNextWeek = () => {
    setStartDate((prev) => addDays(prev, 4));
  };

  const dateRange = Array.from({ length: 4 }, (_, i) => addDays(startDate, i));

  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 5;
    return `${hour.toString().padStart(2, "0")}:00`;
  });
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      date: "2025-03-08",
      time: "06:00",
      label: "Fitness",
      name: "John Doe",
    },
    {
      id: "2",
      date: "2025-03-08",
      time: "07:00",
      label: "Fitness",
      name: "Jane Smith",
    },
    {
      id: "3",
      date: "2025-03-08",
      time: "08:00",
      label: "Yoga",
      name: "Alex Johnson",
    },
    {
      id: "4",
      date: "2025-03-06",
      time: "06:00",
      label: "Fitness",
      name: "Sam Wilson",
    },
    {
      id: "5",
      date: "2025-03-06",
      time: "07:00",
      label: "Fitness",
      name: "Maria Garcia",
    },
  ]);
  const getBooking = (dateStr: string, time: string) => {
    return bookings.find(
      (booking) => booking.date === dateStr && booking.time === time
    );
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedSlot(null);
  };
  const handleSelectTimeSlot = (date: Date, time: string) => {
    // Parse the time string to get hours
    const [hours] = time.split(":").map(Number);

    // Create a new date with the selected time
    const selectedDate = new Date(date);
    selectedDate.setHours(hours, 0, 0, 0);

    // Format the date in the required format (ISO with timezone)
    const formattedDate = selectedDate.toISOString().replace("Z", "+07:00");

    // Set the selected slot
    setSelectedSlot(formattedDate);

    // Open the booking dialog
    setIsDialogOpen(true);
  };
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleConfirmBooking = (name: string, notes: string) => {
    if (!selectedSlot) return;

    // Parse the selected slot to get date and time
    const date = new Date(selectedSlot);
    const dateStr = format(date, "yyyy-MM-dd");
    const timeStr = format(date, "HH:mm");

    // Create a new booking
    const newBooking: Booking = {
      id: Date.now().toString(),
      date: dateStr,
      time: timeStr,
      label: "Fitness", // Default label
      name,
      notes: notes || undefined,
    };

    // Add the new booking
    setBookings((prev) => [...prev, newBooking]);

    // Close the dialog and reset selection
    setIsDialogOpen(false);
    setSelectedSlot(null);
  };

  const { data, isLoading, error } = useSession();

  return (
    <section className="container flex flex-col gap-16 md:gap-24 py-10 md:py-20">
      <div className="flex flex-col gap-4 md:gap-10">
        <h2 className="text-bodylg md:text-h6">SCHEDULE</h2>
        <p className="text-h4 md:text-display-sm max-w-2xl">
          Select Your Preferred Date and Time for a Seamless Experience
        </p>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold"></h1>
        <div className="flex items-center gap-4">
          <div className="text-display-sm italic">
            {format(startDate, "MMMM, d")}-{format(addDays(startDate, 4), "d")}
          </div>
          <div className="flex gap-2">
            <button onClick={goToPreviousWeek} className="p-1 rounded-full ">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={goToNextWeek} className="p-1 rounded-full ">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {/* Schedule table */}
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-secondary-60 bg-transparent">
              {dateRange.map((date, index) => (
                <TableHead
                  key={index}
                  className=" border border-secondary-60 text-center text-white md:text-h4 h-20 md:h-36"
                >
                  {format(date, "EEE, MMM d")}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {timeSlots.map((time) => (
              <TableRow
                key={time}
                className="border-secondary-60 bg-transparent"
              >
                {/* <TableCell className="border-r border-secondary-60 text-center  font-medium">
                  {time}
                </TableCell> */}
                {dateRange.map((date, dateIndex) => {
                  const dateStr = format(date, "yyyy-MM-dd");
                  const booking = getBooking(dateStr, time);

                  return (
                    <TableCell
                      key={dateIndex}
                      onClick={() =>
                        !booking && handleSelectTimeSlot(date, time)
                      }
                      className={`
                            border border-secondary-60 
                            p-6 h-20 md:h-36 md:text-h1 text-center md:text-start
                            
                            ${
                              !booking
                                ? "cursor-pointer hover:bg-primary-80"
                                : "cursor-default bg:primary-100"
                            }
                          `}
                    >
                      {time}
                      {/* {booking && (
                        <div className="absolute inset-0 flex items-center justify-center ">
                          <div className="text-xs text-white">
                            <div>• {booking.label}</div>
                            <div className="mt-1 text-gray-400">
                              {booking.name}
                            </div>
                          </div>
                        </div>
                      )} */}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <BookingModal
        open={isDialogOpen}
        selectedSlot={selectedSlot}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmBooking}
        user={data}
      />
    </section>
  );
}
