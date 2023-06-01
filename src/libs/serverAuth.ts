import { cookies, headers } from "next/headers";
import prisma from "@/libs/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSession } from "next-auth/react";

const serverAuth = async (req: Request) => {
  const session = await getSession();

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
