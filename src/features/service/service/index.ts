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
    if (data.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const getAvailableTimeSlots = async (
  serviceType: string,
  startAt: string,
  timeZone?: string
) => {
  const serviceId = getId(serviceType);
  const startAtDate = new Date(startAt);
  startAtDate.setHours(startAtDate.getHours() + 7);
  const adjustedStartAt = startAtDate.toISOString();
  try {
    const response = await fetch(
      `/api/services/${serviceId}/bookings/available-time-slots?start_at=${adjustedStartAt}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    return getErrorMessage(error);
  }
};

export { getSchedule, createTransaction, getAvailableTimeSlots };
