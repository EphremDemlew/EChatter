import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    const { body } = await req.json();

    const { currentUser } = await serverAuth(req);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid comment");
    }

    const comment = await prisma.comment.create({
      data: { userId: currentUser.id, postId, body },
    });

    try {
      const post = await prisma.post.findUnique({
        where: { id: postId },
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone replied to your tweet!",
            userId: post.userId,
          },
        });
      }

      await prisma.user.update({
        where: { id: post?.userId },
        data: { hasNotification: true },
      });
    } catch (error) {
      console.log("🚀 ~ file: route.ts:41 ~ POST ~ error:", error);
    }

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:10 ~ POST ~ error:", error);
    return NextResponse.json(error, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
