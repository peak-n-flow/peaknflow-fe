"use server";

import { api } from "@/lib/axios";
import { getErrorMessage } from "@/lib/error";

const getTotalUser = async () => {
  try {
    const response = await api.get("/users");
    return response.data.payload.meta.total_data;
  } catch (error) {
    console.log(error);
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

const getAllTransactions = async (page = 1, limit = 10, search = "") => {
  try {
    const response = await api.get("/service-transactions", {
      params: {
        sort_by: "created_at",
        sort_order: "asc",
        limit,
        page,
        search,
      },
    });
    return {
      transactions: response.data.payload.service_transactions as Transaction[],
      meta: response.data.payload.meta as Meta,
    };
  } catch (error) {
    return getErrorMessage(error);
  }
};

const getTransactionById = async (id: string) => {
  try {
    const response = await api.get(`/service-transactions/${id}`);
    
    return response.data.payload.service_transaction;
  } catch (error) {
    return getErrorMessage(error);
  }
};

const getAllUser = async (page = 1, limit = 10, search = "") => {
  try {
    const response = await api.get("/users", {
      params: {
        limit,
        page,
        search,
      },
    });

    return {
      users: response.data.payload.users as User[],
      meta: response.data.payload.meta as Meta,
    };
  } catch (error) {
    console.log(error);
    throw new Error(getErrorMessage(error));
  }
};

export {
  getAllUser,
  getTotalUser,
  getTransactionsSummary,
  getTotalBookedHoursThisDay,
  getAllTransactions,
  getTransactionById,
};
