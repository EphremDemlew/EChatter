import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;
    console.log("🚀 ~ file: route.ts:8 ~ GET ~ postId:", postId);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid Id");
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        comments: { include: { user: true }, orderBy: { createdAt: "desc" } },
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:10 ~ GET ~ error:", error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
