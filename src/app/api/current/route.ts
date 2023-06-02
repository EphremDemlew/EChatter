import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const currentUser = await serverAuth(req);

    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    console.log("The Error is ", error);
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
}
