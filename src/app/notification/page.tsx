import Header from "@/components/Header";
import { NextPageContext } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function getData(context: NextPageContext) {
  const session = await getSession(context);

  console.log("🚀 ~ file: page.tsx:7 ~ getData ~ session:", session);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

const Notifications = async () => {
  const data = await getServerSession(authOptions);
  console.log("🚀 ~ file: page.tsx:25 ~ Notifications ~ data:", data);

  if (!data) {
    redirect("/");
  }

  return (
    <>
      <Header label="Notifications" showBackArrow />
    </>
  );
};

export default Notifications;
