"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import ChatterModal from "../modals/ChatterModal";
import useChatterModal from "@/hooks/useChatterModal";
import useRegisterModal from "@/hooks/useRegisterModal";

function SidebarTweetBtn() {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const chatterModal = useChatterModal();

  const { data: currentUser } = useCurrentUser();

  const onClick = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    } else {
      chatterModal.onOpen();
      console.log(
        "🚀 ~ file:  SidebarTweetBtn.tsx:23 ~ onClick ~ chatterModal:"
      );

      // loginModal.onOpen();
    }
  }, [loginModal, chatterModal, currentUser]);

  return (
    <div onClick={onClick}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center orange_gradient hover:bg-opacity-80 transition cursor-pointer ">
        <FaFeather size={28} color="white" />
      </div>

      <div className="mt-6 lg:flex hidden rounded-full  px-4 py-2  orange_gradient h-14 w-full  transition cursor-pointer  justify-center items-center">
        <p className="hidden lg:block font-semibold text-center text-white  text-[20px]">
          EChat
        </p>
      </div>
    </div>
  );
}

export default SidebarTweetBtn;
