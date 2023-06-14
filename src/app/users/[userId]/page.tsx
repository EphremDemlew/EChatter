"use client";

import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import { ClipLoader } from "react-spinners";

const UserView = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;

  const { data: fetchUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchUser || !userId) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader size={80} color="lightblue" />
      </div>
    );
  }
  return (
    <>
      <Header label={fetchUser?.name} showBackArrow />
      <UserHero userId={userId} />
      <UserBio userId={userId} />
    </>
  );
};

export default UserView;
