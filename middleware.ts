import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { safeVerifySessionToken } from "@/lib/auth";

const AUTH_PAGES = ["/login"];
const PUBLIC_API = ["/api/auth/login", "/api/auth/logout"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api") && PUBLIC_API.includes(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    const token = request.cookies.get("qc_session")?.value;
    const session = await safeVerifySessionToken(token);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  const token = request.cookies.get("qc_session")?.value;
  const session = await safeVerifySessionToken(token);

  if (AUTH_PAGES.includes(pathname)) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/api/:path*"],
};
