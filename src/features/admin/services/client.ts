import { getErrorMessage } from "@/lib/error";
import { EventRequest } from "../types";
import { api } from "@/lib/axios";

// const createEvent = async (event: EventRequest, id: string) => {
//   try {
//     const res = await fetch(`/api/services/${id}/events`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(event),
//     });
//     if (!res.ok) {
//       throw new Error("Failed to create event");
//     }
//     return await res.json();
//   } catch (error) {
//     return getErrorMessage(error);
//   }
// };

const createEvent = async (event: EventRequest, id: string) => {
  try {
    const response = await api.post(`/services/${id}/events`, event);
    return response.data.payload;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const updateEvent = async (
  event: EventRequest,
  id: string,
  eventId: string
) => {
  try {
    const response = await api.patch(
      `/services/${id}/events/${eventId}`,
      event
    );
    return response.data.payload;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const deleteEvent = async (id: string, eventId: string) => {
  try {
    const response = await api.delete(`/services/${id}/events/${eventId}`);
    return response.data.payload;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export { createEvent, updateEvent, deleteEvent };
