import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET() {
  try {
    // const users = await prisma.user.findMany({
    //     include:{posts: }},
    // })

    const posts = await prisma.post.findMany({
      select: { likedId: true },
    });

    console.log(posts);

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
