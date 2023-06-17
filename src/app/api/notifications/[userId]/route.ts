import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }
    const notification = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { hasNotification: false },
    });

    return NextResponse.json(notification, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:10 ~ error:", error);
    return NextResponse.json(error, { status: 400 });
  }
}
