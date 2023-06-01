import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: Request) {
  console.log("🚀 ~ file: The server ~ GOT HERE");

  try {
    console.log("🚀 ~ file: its true ~ GOT HERE");

    const currentUser = await serverAuth(req);

    new Response(JSON.stringify(currentUser), { status: 200 });
  } catch (error) {
    // console.log("The Error is ", error);
    new Response("Invalid Request", { status: 400 });
  }
}
