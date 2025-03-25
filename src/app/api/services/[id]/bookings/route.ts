import { BookingListResponse } from "@/features/service/types";
import { api } from "@/lib/axios";
import { getErrorMessage } from "@/lib/error";
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
  const searchParams = Object.fromEntries(url.searchParams.entries());

  try {
    const response = await api.get(`/services/${id}/bookings`, {
      params: searchParams,
    });

    return NextResponse.json(response.data.payload as BookingListResponse);
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
    });
  }
}
