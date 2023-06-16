import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json();
    const { currentUser } = await serverAuth(req);
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid id");
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new Error("Invalid id");
    }

    let updatedLikedIds = [...(post.likedId || [])];

    updatedLikedIds.push(currentUser.id);

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { likedId: updatedLikedIds },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:10 ~ POST ~ error:", error);

    return NextResponse.json({ error }, { status: 400 });
  }
}
