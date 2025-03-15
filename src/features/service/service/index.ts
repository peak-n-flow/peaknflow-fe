import { getErrorMessage } from "@/lib/error";
import { BookingListResponse, TransactionRequest } from "../types";
import { getId } from "@/lib/get-id";

const getSchedule = async (serviceType: string) => {
  const serviceId = getId(serviceType);
  try {
    const response = await fetch(`/api/services/${serviceId}/bookings`);
    return response.json();
  } catch (error) {
    return getErrorMessage(error);
  }
};

const createTransaction = async (request: TransactionRequest) => {
  try {
    const response = await fetch(`/api/services/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (data.status !== 200) {
      throw new Error(data?.message || "An error occurred");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export { getSchedule, createTransaction };
