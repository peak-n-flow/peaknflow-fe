import { getErrorMessage } from "@/lib/error";
import { BookingListResponse, Payment, TransactionRequest } from "../types";
import { getId } from "@/lib/get-id";
import { api } from "@/lib/axios";

const getSchedule = async (serviceType: string) => {
  const serviceId = getId(serviceType);
  const timeZone = "Asia/Jakarta";
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 60);
  const startDateRFC = startDate.toISOString();
  const endDateRFC = endDate.toISOString();

  try {
    const response = await fetch(
      `/api/services/${serviceId}/bookings?time_zone=${timeZone}&after_at=${startDateRFC}&before_at=${endDateRFC}`
    );
    return response.json();
  } catch (error) {
    throw new Error(getErrorMessage(error));
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
    throw new Error(getErrorMessage(error));
  }
};

const getTransactionByCode = async (code: string) => {
  try {
    const response = await api.get(
      `/service-transactions/charge/${code}/status`
    );
    console.log(response.data);
    return response.data.payload;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export {
  getSchedule,
  createTransaction,
  getAvailableTimeSlots,
  getTransactionByCode,
};
