"use server";

import { api } from "@/lib/axios";
import { getErrorMessage } from "@/lib/error";

const getTotalUser = async () => {
  try {
    const response = await api.get("/users");
    return response.data.payload.meta.total_data;
  } catch (error) {
    console.log(error)
    return getErrorMessage(error);
  }
};

const getTransactionsSummary = async () => {
  try {
    const response = await api.get(
      "/service-transactions/summary?metric=revenue"
    );
    return response.data.payload.revenue;
  } catch (error) {
    return getErrorMessage(error);
  }
};

const getTotalBookedHoursThisDay = async () => {
  try {
    const now = new Date();

    // Konversi ke UTC dan tambahkan 7 jam
    const startOfDayUTC = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0,
        0,
        0
      )
    );
    const endOfDayUTC = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        23,
        59,
        59
      )
    );

    // Tambahkan 7 jam agar sesuai dengan waktu Jakarta
    startOfDayUTC.setUTCHours(startOfDayUTC.getUTCHours() + 7);
    endOfDayUTC.setUTCHours(endOfDayUTC.getUTCHours() + 7);

    const response = await api.get("/service-bookings", {
      params: {
        type: "booked",
        aggregate: "count",
        time_zone: "Asia/Jakarta",
        after_at: startOfDayUTC.toISOString(),
        before_at: endOfDayUTC.toISOString(),
      },
    });

    return response.data.payload.meta.total_data;
  } catch (error) {
    return getErrorMessage(error);
  }
};

const getAllTransactions = async () => {
  try {
    const response = await api.get("/service-transactions");
    return response.data.payload.service_transactions;
  } catch (error) {
    return getErrorMessage(error);
  }
};

export {
  getTotalUser,
  getTransactionsSummary,
  getTotalBookedHoursThisDay,
  getAllTransactions,
};
