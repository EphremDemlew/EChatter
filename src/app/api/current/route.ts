import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: Request) {
  console.log("🚀 ~ file: route.ts:8 ~ POST ~ GOT HERE");

  try {
    const currentUser = await serverAuth(req);

    new Response(JSON.stringify(currentUser), { status: 200 });
  } catch (error) {
    console.log(error);
    new Response("Invalid Request", { status: 500 });
  }
}
