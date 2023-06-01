import prisma from "@/libs/prismadb";
import { getSession } from "next-auth/react";

const serverAuth = async (req: Request) => {
  const session = await getSession();

  console.log("The session is ===> ", session);

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
  req;
  return { currentUser };
};

export default serverAuth;
