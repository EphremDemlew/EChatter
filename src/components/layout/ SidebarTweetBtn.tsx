"use client";

import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

function SidebarTweetBtn() {
  const router = useRouter();
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div onClick={onClick}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center orange_gradient hover:bg-opacity-80 transition cursor-pointer ">
        <FaFeather size={28} color="white" />
      </div>

      <div className="mt-6 lg:flex hidden rounded-full  px-4 py-2  orange_gradient h-14 w-full opacity-90 transition cursor-pointer  justify-center items-center">
        <p className="hidden lg:block font-semibold text-center text-black dark:text-white  text-[20px]">
          EChat
        </p>
      </div>
    </div>
  );
}

export default SidebarTweetBtn;
