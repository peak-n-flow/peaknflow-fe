"use client";
import { useSchedule } from "@/features/service/hooks/use-schedule";
import { generateTimeSlots } from "@/lib/time-slot";
import { addDays, format, startOfWeek } from "date-fns";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Calendar from "../../components/calendar";
import { Booking } from "@/features/service/types";

export default function ScheduleDashboardContainer() {
  const { data: schedules, refetch } = useSchedule({ serviceType: "gym" });

  const [startDate, setStartDate] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 3 })
  );
  const goToPreviousWeek = () => setStartDate((prev) => addDays(prev, -7));
  const goToNextWeek = () => setStartDate((prev) => addDays(prev, 7));
  const dateRange = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    if (schedules?.gym) {
      const slots = generateTimeSlots(schedules.gym);
      setTimeSlots(slots);
    }
  }, [schedules?.gym]);

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
          bookings={
            (schedules?.service_bookings as unknown as {
              [key: string]: Booking[];
            }) || {}
          }
          dateRange={dateRange}
          timeSlots={timeSlots}
          onSelectTimeSlot={() => {}}
        />
      </div>
    </main>
  );
}
