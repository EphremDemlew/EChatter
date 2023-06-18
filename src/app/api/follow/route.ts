import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { userId } = await req.json();
    const { currentUser } = await serverAuth(req);

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error("Invalid Id");
    }

    let updatedFollowingIds = [...(user.followingIds || [])];
    updatedFollowingIds.push(userId);

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    try {
      await prisma.notification.create({
        data: {
          body: "Someone followed you!",
          userId,
        },
      });

      await prisma.user.update({
        where: { id: userId },
        data: { hasNotification: true },
      });
    } catch (error) {
      console.log("🚀 ~ file: route.ts:56 ~ POST ~ error:", error);
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:7 ~ POST ~ error:", error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
