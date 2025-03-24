import EventDashboardContainer from "@/features/admin/containers/events/event-dashboard-container";
import { getAllEvents } from "@/features/admin/services/server";
import React from "react";

export default async function EventAdminDashboardPage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ page: number; search: string }>;
}) {
  const { id } = await params;
  const limit = 10;
  const { page, search } = await searchParams;
  const events = await getAllEvents(id, limit, page, search);

  if (typeof events === "string") {
    return <div>Error: {events}</div>;
  }
  return <EventDashboardContainer events={events} />;
}
