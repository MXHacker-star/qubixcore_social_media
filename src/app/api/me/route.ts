import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { safeVerifySessionToken } from "@/lib/auth";

export async function GET() {
  const token = cookies().get("qc_session")?.value;
  const session = await safeVerifySessionToken(token);
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({ user: session });
}
