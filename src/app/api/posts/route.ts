import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { currentUser } = await serverAuth(req);
    const { body } = await req.json();

    const post = await prisma.post.create({
      data: {
        body,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:7 ~ POST ~ error:", error);
    return NextResponse.json({ error: error }, { status: 200 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let posts;
    if (userId && typeof userId === "string") {
      posts = await prisma.post.findMany({
        where: { userId },
        include: { user: true, comments: true },
        orderBy: { createdAt: "desc" },
      });
    } else {
      posts = await prisma.post.findMany({
        include: { user: true, comments: true },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:48 ~ error:", error);
    return NextResponse.json({ error: error }, { status: 200 });
  }
}
