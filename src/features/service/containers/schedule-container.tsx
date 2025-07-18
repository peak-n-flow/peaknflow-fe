"use client";
import useSession from "@/features/auth/hooks/use-session";
import { generateTimeSlots } from "@/lib/time-slot";
import { useQueryClient } from "@tanstack/react-query";
import { addDays, format, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSession as UseNextAuthSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BookingModal from "../components/booking-modal";
import Calendar from "../components/calendar";
import { useAvailableSlots } from "../hooks/use-available-slots";
import useCreateTransaction from "../hooks/use-create-transaction";
import { useSchedule } from "../hooks/use-schedule";
import type { Booking, TransactionRequest } from "../types";

export default function ScheduleContainer({
  type,
  isClass = false,
}: {
  type: string;
  isClass?: boolean;
}) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const router = useRouter();
  const { data: schedules, refetch } = useSchedule({ serviceType: type });
  const [startDate, setStartDate] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 3 })
  );
  const [maxBookHour, setMaxBookHour] = useState(0);
  const [maxBookQuantity, setMaxBookQuantity] = useState(0);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [durationInHour, setDurationInHour] = useState<number>(0);
  const { status } = UseNextAuthSession();
  const createTransaction = useCreateTransaction();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (schedules?.gym) {
      const slots = generateTimeSlots(schedules.gym, schedules.service);
      setTimeSlots(slots);
      setDurationInHour(schedules.service?.duration_in_minutes / 60);
    }
  }, [schedules?.gym, schedules?.service?.duration_in_minutes]);

  const goToPreviousWeek = () => setStartDate((prev) => addDays(prev, -4));
  const goToNextWeek = () => setStartDate((prev) => addDays(prev, 4));
  const dateRange = Array.from({ length: 4 }, (_, i) => addDays(startDate, i));

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedSlot(null);
  };

  const { data: availableSlotsData } = useAvailableSlots({
    serviceType: type,
    startDate: selectedDate || "",
    enabled: !!selectedDate,
  });

  useEffect(() => {
    if (availableSlotsData) {
      setMaxBookHour(availableSlotsData.count_available_slots || 0);
    }
  }, [availableSlotsData]);

  const handleSelectTimeSlot = (
    date: Date,
    time: string,
    availableSlots: number
  ) => {
    const [hours] = time.split(":").map(Number);

    // Create a date object in local time
    const selectedDate = new Date(date);
    selectedDate.setHours(hours, 0, 0, 0);

    // Store the local time ISO string
    setSelectedDate(selectedDate.toISOString());
    setSelectedSlot(selectedDate.toISOString());
    setMaxBookQuantity(availableSlots);
    setMaxBookHour(availableSlotsData?.count_available_slots || 0);
    setIsDialogOpen(true);
  };

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirmBooking = (request: TransactionRequest) => {
    if (!selectedSlot) return;

    createTransaction.mutate(request, {
      onSuccess: (data) => {
        setIsDialogOpen(false);
        setSelectedSlot(null);
        console.log(data);
        toast.success("Booking successful");

        // Open new tab with redirect_url if available
        if (data.data.redirect_url) {
          // window.open(data.data.redirect_url, "_blank");
          router.push(`/transaction/snap?snapToken=${data.data.snap_token}`);
        }

        queryClient.invalidateQueries({ queryKey: "schedule" });
        refetch();
      },
      onError: (error) => {
        toast.error(error.message);
        setIsDialogOpen(false);
        setSelectedSlot(null);
        refetch();
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
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-body-md md:text-h6 italic">
          {/* Display user's local timezone */}
          {new Intl.DateTimeFormat().resolvedOptions().timeZone}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-display-sm italic">
            {format(startDate, "MMMM, d")}-{format(addDays(startDate, 3), "d")}
          </div>
          <div className="flex gap-2">
            <button
              onClick={goToPreviousWeek}
              className="p-6 rounded-full border border-secondary-60 "
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNextWeek}
              className="p-6 rounded-full border border-secondary-60 "
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <Calendar
        service={schedules?.service || ({} as Service)}
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
        serviceEvents={schedules?.service_events || []}
      />
      <BookingModal
        open={isDialogOpen}
        selectedSlot={selectedSlot}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmBooking}
        user={!isLoading && status === "authenticated" ? data.user : null}
        serviceType={type}
        maxBookHour={maxBookHour}
        durationInHour={durationInHour}
        isClass={isClass}
        maxBookQuantity={maxBookQuantity}
      />
    </section>
  );
}
