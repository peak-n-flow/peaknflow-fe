import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createTransaction, getSchedule } from "../service";
import { BookingListResponse } from "../types";
import { useMutation } from "@tanstack/react-query";
import { TransactionRequest } from "../types";

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


export { useSchedule };
