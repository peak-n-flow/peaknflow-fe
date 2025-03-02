import withAuth from "@/middlewares";
import { NextRequest, NextResponse } from "next/server";

export function mainMiddleware(request: NextRequest) {
  return NextResponse.next();
}

export default withAuth(mainMiddleware, ["/dashboard", "/dashboard/:path*"]);
