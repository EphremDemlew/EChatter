"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useUser from "@/hooks/useUser";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, hasBorder, isLarge }) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();
  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [userId, router]
  );
  return (
    <div
      className={`${hasBorder} ? 'border-4 border-black':'' ${isLarge}?'h-32 w-32':'h-12 w-12' rounded-full  hover:opacity-90 transition cursor-pointer relative`}
    >
      a
    </div>
  );
};

export default Avatar;
