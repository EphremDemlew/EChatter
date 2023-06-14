import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

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

    return NextResponse.json({ ...user, followersCount }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:26 ~ GET ~ error:", error);
    NextResponse.json(error, { status: 400 });
  }
}
