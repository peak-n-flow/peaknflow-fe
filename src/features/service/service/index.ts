import { getErrorMessage } from "@/lib/error";
import { BookingListResponse, Payment, TransactionRequest } from "../types";
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
    if (response.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export { getSchedule, createTransaction };
