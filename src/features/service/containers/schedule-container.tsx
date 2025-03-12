"use client";
import useSession from "@/features/auth/hooks/use-session";
import { addDays, format, parseISO, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import BookingModal from "../components/booking-modal";
import Calendar from "../components/calendar";
import useSchedule from "../hooks/use-schedule";
import type { Booking } from "../types";

export default function ScheduleContainer() {
  const { data: schedules } = useSchedule({ id: "01JP0JKHBFEBJD3QMYEDDWQB5Z" });
  const [startDate, setStartDate] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    if (schedules?.gym) {
      const openAt = parseISO(schedules.gym.open_at).getUTCHours();
      const closeAt = parseISO(schedules.gym.close_at).getUTCHours();
      const slots = [];

      for (let hour = openAt; hour < closeAt; hour++) {
        slots.push(`${hour.toString().padStart(2, "0")}:00`);
      }

      setTimeSlots(slots);
    }
  }, [schedules?.gym]);

  const goToPreviousWeek = () => setStartDate((prev) => addDays(prev, -4));
  const goToNextWeek = () => setStartDate((prev) => addDays(prev, 4));
  const dateRange = Array.from({ length: 4 }, (_, i) => addDays(startDate, i));

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

    // In a real implementation, you would call an API to create a booking
    // For now, we'll just close the dialog
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
        {schedules?.gym && (
          <p className="text-sm text-muted-foreground">
            Gym Hours: {format(parseISO(schedules.gym.open_at), "HH:mm")} -{" "}
            {format(parseISO(schedules.gym.close_at), "HH:mm")}
          </p>
        )}
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold"></h1>
        <div className="flex items-center gap-4">
          <div className="text-display-sm italic">
            {format(startDate, "MMMM, d")}-{format(addDays(startDate, 3), "d")}
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
      <Calendar
        bookings={
          isLoading
            ? {}
            : (schedules?.service_bookings as unknown as {
                [key: string]: Booking[];
              }) || {}
        }
        dateRange={dateRange}
        timeSlots={timeSlots}
        onSelectTimeSlot={handleSelectTimeSlot}
      />
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
