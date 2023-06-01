import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const serverAuth = async (req: Request) => {
  const session = await getServerSession(authOptions);

  console.log(
    "🚀 ~ file: serverAuth.ts:7 ~ serverAuth ~ session:",
    await req.json()
  );

  if (!session?.user?.email) {
    throw new Error("Not signed in try again.");
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
