import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const content = await prisma.contentItem.findMany({
    include: {
      client: true,
      owner: true,
    },
    orderBy: { date: "asc" },
  });
  return NextResponse.json({ content });
}
