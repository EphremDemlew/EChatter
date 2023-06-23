import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { comments: true },
      orderBy: { comments: { _count: "desc" } },
      take: 5,
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
