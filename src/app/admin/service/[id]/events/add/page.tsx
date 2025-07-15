import EventForm from "@/features/admin/containers/events/event-form";
import { getServiceById } from "@/features/admin/services/server";
import React from "react";

export default async function AddEventPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  return <EventForm id={id} />;
}
