import { getErrorMessage } from "@/lib/error";
import { BookingListResponse } from "../types";

const getSchedule = async (id: string) => {
  try {
    const response = await fetch(
      `/api/services/01JP0JKHBFEBJD3QMYEDDWQB5Z/bookings`
    );
    return response.json();
  } catch (error) {
    return getErrorMessage(error);
  }
};

export { getSchedule };
