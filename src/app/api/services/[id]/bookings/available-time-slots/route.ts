import { AvailableTimeSlots } from "@/features/service/types";
import { api } from "@/lib/axios";
import { getErrorMessage, getErrorStatusCode } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({
      message: "ID parameter is missing",
    });
  }

  const url = new URL(request.url);
  const startAt = url.searchParams.get("start_at") || "2025-03-19T11:00:00Z";
  const timeZone = url.searchParams.get("time_zone") || "Asia/Jakarta";

  try {
    const response = await api.get(
      `services/${id}/bookings/available-time-slots`,
      {
        params: {
          start_at: startAt,
          time_zone: timeZone,
        },
      }
    );

    return NextResponse.json({
      data: response.data.payload as AvailableTimeSlots,
    });
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
      status: getErrorStatusCode(error),
    });
  }
}
