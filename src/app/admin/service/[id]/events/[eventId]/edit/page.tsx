import EventForm from "@/features/admin/containers/events/event-form";
import { getEventById } from "@/features/admin/services/server";
import React from "react";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{
    id: string;
    eventId: string;
  }>;
}) {
  const { id, eventId } = await params;
  const event = await getEventById(id, eventId);
  return (
    <>
      {typeof event === "object" ? (
        <EventForm id={id} event={event} />
      ) : (
        <div>Error loading transactions</div>
      )}
    </>
  );
}
