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
  _: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({
      message: "ID parameter is missing",
    });
  }

  try {
    const response = await api.get(`/services/${id}/bookings`);

    return NextResponse.json(response.data.payload as BookingListResponse);
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
    });
  }
}
