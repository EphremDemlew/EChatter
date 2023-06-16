import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    const { currentUser } = await serverAuth(req);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid Id");
    }
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new Error("Invalid Id");
    }

    let updatedLikedIds = [...(post.likedId || [])];
    updatedLikedIds = updatedLikedIds.filter((id) => id !== currentUser.id);

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { likedId: updatedLikedIds },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:7 ~ DELETE ~ error:", error);
    return NextResponse.json(error, { status: 200 });
  }
}
