import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const clients = await prisma.client.findMany({
    include: {
      socialAccounts: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ clients });
}
