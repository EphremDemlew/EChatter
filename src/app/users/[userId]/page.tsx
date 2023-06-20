"use client";

import Header from "@/components/Header";
import PostFeed from "@/components/post/PostFeed";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import { BsFillChatQuoteFill } from "react-icons/bs";

const UserView = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;

  const { data: fetchUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchUser || !userId) {
    return (
      <div className="flex justify-center items-center h-full">
        <BsFillChatQuoteFill
          size={50}
          className="text-orange-400 animate-pulse"
        />
      </div>
    );
  }
  return (
    <>
      <Header label={fetchUser?.name} showBackArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;
