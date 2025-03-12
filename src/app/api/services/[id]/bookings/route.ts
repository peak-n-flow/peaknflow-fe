import { BookingListResponse } from "@/features/service/types";
import { api } from "@/lib/axios";
import { getErrorMessage } from "@/lib/error";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await api.get("/services/01JP0JKHBFEBJD3QMYEDDWQB5Z/bookings");
    return NextResponse.json(response.data.payload as BookingListResponse);
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
    });
  }
}
