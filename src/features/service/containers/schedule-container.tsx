"use client";
import useSession from "@/features/auth/hooks/use-session";
import { formatJakartaTime } from "@/lib/date";
import { generateTimeSlots } from "@/lib/time-slot";
import { addDays, format, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSession as UseNextAuthSession } from "next-auth/react";
import { useEffect, useState } from "react";
import BookingModal from "../components/booking-modal";
import Calendar from "../components/calendar";
import useCreateTransaction from "../hooks/use-create-transaction";
import { useSchedule } from "../hooks/use-schedule";
import type { Booking, TransactionRequest } from "../types";

export default function ScheduleContainer() {
  const { data: schedules } = useSchedule({ serviceType: "gym" });
  const [startDate, setStartDate] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 3 })
  );
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const { status } = UseNextAuthSession();
  const createTransaction = useCreateTransaction();

  useEffect(() => {
    if (schedules?.gym) {
      const slots = generateTimeSlots(schedules.gym);
      console.log(slots);
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

    // Set the selected slot
    setSelectedSlot(selectedDate.toISOString());

    // Open the booking dialog
    setIsDialogOpen(true);
  };

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirmBooking = (request: TransactionRequest) => {
    if (!selectedSlot) return;

    // Mutate with the transaction request
    createTransaction.mutate(request, {
      onSuccess: () => {
        // Handle success - close dialog and reset state
        setIsDialogOpen(false);
        setSelectedSlot(null);
      },
      onError: (error) => {
        // You could add error handling here if needed
        console.error("Transaction error:", error);
        // Still close the dialog but you might want different behavior
        setIsDialogOpen(false);
        setSelectedSlot(null);
      },
    });
  };

  const { data, isLoading } = useSession();

  return (
    <section className="container flex flex-col gap-16 md:gap-24 py-10 md:py-20">
      <div className="flex flex-col gap-4 md:gap-10">
        <h2 className="text-bodylg md:text-h6">SCHEDULE</h2>
        <p className="text-h4 md:text-display-sm max-w-2xl">
          Select Your Preferred Date and Time for a Seamless Experience
        </p>
        {schedules?.gym && (
          <p className="text-sm text-muted-foreground">
            Gym Hours: {formatJakartaTime(schedules.gym.open_at, "HH:mm")} -{" "}
            {formatJakartaTime(schedules.gym.close_at, "HH:mm")}
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
      <p className="text-white">{JSON.stringify(data)}</p>
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
        user={!isLoading && status === "authenticated" ? data.user : null}
      />
    </section>
  );
}
