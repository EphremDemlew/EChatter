import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const searchKey = searchParams.get("searchKey");

    let users;
    if (searchKey && typeof searchKey === "string") {
      users = await prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: searchKey } },
            { name: { contains: searchKey } },
            { email: { contains: searchKey } },
          ],
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:14 ~ GET ~ error:", error);
    NextResponse.json({ error: error }, { status: 400 });
  }
}
export const dynamic = "force-dynamic";
