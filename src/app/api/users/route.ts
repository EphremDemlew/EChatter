import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET() {
  try {
    console.log("It got to the users section");

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:14 ~ GET ~ error:", error);
    NextResponse.json({ error: error }, { status: 400 });
  }
}
