import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NotificationsFeed from "@/components/NotificationsFeed";

const Notifications = async () => {
  const data = await getServerSession(authOptions);

  if (!data) {
    redirect("/");
  }

  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default Notifications;
export const dynamic = "force-dynamic";
