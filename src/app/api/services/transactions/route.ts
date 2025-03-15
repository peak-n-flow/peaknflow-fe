import { api } from "@/lib/axios";
import { getErrorMessage, getErrorStatusCode } from "@/lib/error";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await api.post("service-transactions/charge", body);
    return NextResponse.json(response.data.payload.payment);
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
      status: getErrorStatusCode(error),
    });
  }
}
