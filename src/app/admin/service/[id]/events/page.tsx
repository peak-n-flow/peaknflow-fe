import EventDashboardContainer from "@/features/admin/containers/events/event-dashboard-container";
import { getAllEvents } from "@/features/admin/services/server";
import React from "react";

export default async function EventAdminDashboardPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const events = await getAllEvents(id);

  if (typeof events === "string") {
    return <div>Error: {events}</div>;
  }
  return <EventDashboardContainer events={events} />;
}
