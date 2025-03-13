import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "../service";
import { BookingListResponse } from "../types";

const useSchedule = ({
  startDate,
  endDate,
  serviceType,
}: {
  startDate?: string;
  endDate?: string;
  serviceType: string;
}) => {
  return useQuery<BookingListResponse>({
    queryKey: ["schedule"],
    queryFn: () => getSchedule(serviceType),
    refetchInterval: 1000 * 60 * 5, // Refetch every 1 minutes
  });
};

export default useSchedule;
