"use client";
import { useSchedule } from "@/features/service/hooks/use-schedule";
import { generateTimeSlots } from "@/lib/time-slot";
import { addDays, format, startOfWeek } from "date-fns";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Calendar from "../../components/calendar";
import { Booking, TransactionRequest } from "@/features/service/types";
import { useAvailableSlots } from "@/features/service/hooks/use-available-slots";
import BookingModal from "@/features/service/components/booking-modal";
import { createTransaction } from "@/features/service/service";
import { useSession as UseNextAuthSession } from "next-auth/react";
import useCreateTransaction from "@/features/service/hooks/use-create-transaction";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useSession from "@/features/auth/hooks/use-session";

export default function ScheduleDashboardContainer() {
  const router = useRouter();
  const { data: schedules, refetch } = useSchedule({ serviceType: "yoga" });

  const [startDate, setStartDate] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 3 })
  );
  const goToPreviousWeek = () => setStartDate((prev) => addDays(prev, -7));
  const goToNextWeek = () => setStartDate((prev) => addDays(prev, 7));
  const dateRange = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [maxBookHour, setMaxBookHour] = useState(0);
  const [maxBookQuantity, setMaxBookQuantity] = useState(0);
  const [durationInHour, setDurationInHour] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [type, setType] = useState("gym");
  const { status } = UseNextAuthSession();
  const createTransaction = useCreateTransaction();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (schedules?.gym) {
      const slots = generateTimeSlots(schedules.gym, schedules.service);
      setTimeSlots(slots);
    }
  }, [schedules?.gym]);

  const { data: availableSlotsData } = useAvailableSlots({
    serviceType: type,
    startDate: selectedDate || "",
    enabled: !!selectedDate,
  });
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
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedSlot(null);
  };
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
    <main className="flex flex-col gap-5 overflow-x-auto">
      <h2 className="text-h5">Schedule</h2>

      <div className="bg-white rounded-2xl flex flex-col gap-4 p-6 ">
        <div className="flex items-center gap-4">
          <div className="flex gap-2.5 items-center">
            <div className="flex gap-2">
              <ChevronLeftCircle
                className="text-light-80"
                size={24}
                onClick={goToPreviousWeek}
              />
              <ChevronRightCircle
                className="text-light-80"
                size={24}
                onClick={goToNextWeek}
              />
            </div>
            <div className="text-h5 ">
              {format(startDate, "MMMM, d")}-
              {format(addDays(startDate, 6), "d")}
            </div>
          </div>
        </div>
        <Calendar
          service={schedules?.service || ({} as Service)}
          bookings={
            (schedules?.service_bookings as unknown as {
              [key: string]: Booking[];
            }) || {}
          }
          dateRange={dateRange}
          timeSlots={timeSlots}
          onSelectTimeSlot={handleSelectTimeSlot}
          serviceEvents={schedules?.service_events || []}
        />
      </div>
      <BookingModal
        open={isDialogOpen}
        selectedSlot={selectedSlot}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmBooking}
        user={!isLoading && status === "authenticated" ? data.user : null}
        serviceType={type}
        maxBookHour={maxBookHour}
        durationInHour={durationInHour}
        isClass={true}
        maxBookQuantity={maxBookQuantity}
      />
    </main>
  );
}
