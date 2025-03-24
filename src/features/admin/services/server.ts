"use server";

import { api } from "@/lib/axios";
import { API_KEY, BASE_URL } from "@/lib/env";
import { getErrorMessage } from "@/lib/error";

async function fetchProfileWithRetry(accessToken: string, retries = 3) {
  try {
    const response = await fetch(`${BASE_URL}auth/session`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "x-api-key": `Key ${API_KEY}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (retries > 0) {
      console.log(
        `Error fetching profile, retrying in 2 seconds... (${retries} attempts left)`
      );
      // Wait for 2 seconds before retrying
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return fetchProfileWithRetry(accessToken, retries - 1);
    } else {
      throw error; // If no more retries, throw the error
    }
  }
}
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

const getGymServices = async () => {
  try {
    const response = await api.get("/services");

    return response.data.payload.services as Service[];
  } catch (error) {
    return getErrorMessage(error);
  }
};

const getAllEvents = async (
  id: string,
  limit: number,
  page: number,
  search = ""
) => {
  try {
    const response = await api.get(`/services/${id}/events`, {
      params: {
        limit,
        page,
        search,
      },
    });
    return {
      events: response.data.payload.service_events as Event[],
      meta: response.data.payload.meta as Meta,
    };
  } catch (error) {
    return getErrorMessage(error);
  }
};

const getEventById = async (id: string, eventId: string) => {
  try {
    const response = await api.get(`/services/${id}/events/${eventId}`);
    console.log(response.data.payload.service_event);
    return response.data.payload.service_event as Event;
  } catch (error) {
    return getErrorMessage(error);
  }
};

const getServiceById = async (id: string) => {
  try {
    const response = await api.get(`/services/${id}`);
    console.log(response.data.payload);
    return response.data.payload.service;
  } catch (error) {
    return getErrorMessage(error);
  }
};
export {
  fetchProfileWithRetry,
  getAllUser,
  getTotalUser,
  getTransactionsSummary,
  getTotalBookedHoursThisDay,
  getAllTransactions,
  getTransactionById,
  getGymServices,
  getAllEvents,
  getServiceById,
  getEventById,
};
