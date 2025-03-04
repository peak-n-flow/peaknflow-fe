import withAuth from "@/middlewares";
import { NextRequest, NextResponse } from "next/server";

export function mainMiddleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("Cache-Control", "no-store, max-age=0");

  return response;
}

export default withAuth(mainMiddleware, ["/dashboard", "/dashboard/:path*"]);
