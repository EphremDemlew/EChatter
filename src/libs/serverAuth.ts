import { cookies, headers } from "next/headers";
import { getServerSession as originalGetServerSession } from "next-auth";
import prisma from "@/libs/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const serverAuth = async (req: Request) => {
  // const getServerSession = async () => {
  //   const req = {
  //     headers: Object.fromEntries(headers() as Headers),
  //     cookies: Object.fromEntries(
  //       cookies()
  //         .getAll()
  //         .map((c) => [c.name, c.value])
  //     ),
  //   };
  // };

  // const res = { getHeader() {}, setCookie() {}, setHeader() {} };

  // @ts-ignore - The type used in next-auth for the req object doesn't match, but it still works
  const session = await originalGetServerSession(req, authOptions);

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
