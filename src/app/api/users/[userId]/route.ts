import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: { has: userId },
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    NextResponse.json(error, { status: 400 });
  }
}
