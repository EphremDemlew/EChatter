import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export default async function PATCH(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth(req);
    NextResponse;

    const { name, username, bio, profileImage, coverImage } = await req.json();
    if (!name || !username) {
      throw new Error("Missing fields");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: { bio, name, username, profileImage, coverImage },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    error;
    console.log("🚀 ~ file: route.ts:9 ~ PATCH ~ error:", error);
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}
NextResponse;
