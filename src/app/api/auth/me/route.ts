import { api } from "@/lib/axios";
import { getErrorMessage } from "@/lib/error";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await api.get("/auth/session");
    return NextResponse.json(response.data.payload as User);
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
    });
  }
}
