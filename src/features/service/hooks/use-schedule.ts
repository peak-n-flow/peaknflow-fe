import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "../service";
import { BookingListResponse } from "../types";

const useSchedule = ({
  id,
  startDate,
  endDate,
}: {
  id: string;
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery<BookingListResponse>({
    queryKey: ["schedule"],
    queryFn: () => getSchedule(id),
    refetchInterval: 1000 * 60 * 5, // Refetch every 1 minutes
  });
};

export default useSchedule;
