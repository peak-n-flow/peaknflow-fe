import { useQuery } from "@tanstack/react-query";
import { getAvailableTimeSlots } from "../service";
import { AvailableTimeSlots } from "../types";

const useAvailableSlots = ({
  startDate = "",
  serviceType,
  enabled = false,
}: {
  startDate?: string;
  serviceType: string;
  enabled?: boolean;
}) => {
  return useQuery<AvailableTimeSlots>({
    queryKey: ["available-slot",startDate],
    queryFn: () => getAvailableTimeSlots(serviceType, startDate),
    enabled: enabled,
  });
};

export { useAvailableSlots };
