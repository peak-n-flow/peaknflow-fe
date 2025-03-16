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
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useAvailableSlots } from "../hooks/use-available-slots";
import { useRouter } from "next/navigation";

export default function ScheduleContainer({ type }: { type: string }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const router = useRouter();
  const { data: schedules, refetch } = useSchedule({ serviceType: type });
  const [startDate, setStartDate] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 3 })
  );
  const [maxBookHour, setMaxBookHour] = useState(0);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const { status } = UseNextAuthSession();
  const createTransaction = useCreateTransaction();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (schedules?.gym) {
      const slots = generateTimeSlots(schedules.gym);
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
  const handleSelectTimeSlot = (date: Date, time: string) => {
    const [hours] = time.split(":").map(Number);
    const selectedDate = new Date(date);
    selectedDate.setHours(hours, 0, 0, 0);

    setSelectedDate(selectedDate.toISOString());
    setSelectedSlot(selectedDate.toISOString());
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

        // Membuka tab baru dengan redirect_url jika tersedia
        if (data.data.redirect_url) {
          window.open(data.data.redirect_url, "_blank");
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
        {/* {schedules?.gym && (
          <p className="text-sm text-muted-foreground">
            Gym Hours: {formatJakartaTime(schedules.gym.open_at, "HH:mm")} -{" "}
            {formatJakartaTime(schedules.gym.close_at, "HH:mm")}
          </p>
        )} */}
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-display-sm italic">WIB GMT+7</div>{" "}
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
        user={!isLoading && status === "authenticated" ? data.user : null}
        serviceType={type}
        maxBookHour={maxBookHour}
      />
    </section>
  );
}
