"use server";

import { api } from "@/lib/axios";
import { getErrorMessage } from "@/lib/error";

const getTotalUser = async () => {
  try {
    const response = await api.get("/users");
    return response.data.payload.meta.total_data;
  } catch (error) {
    return getErrorMessage(error);
  }
};

export { getTotalUser };
