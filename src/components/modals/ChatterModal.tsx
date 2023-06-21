"use client";
import { FC, useState, useCallback } from "react";
import Input from "../Input";
import Modal from "../Modal";
import { signIn } from "next-auth/react";
import { BiErrorCircle } from "react-icons/bi";
import { toast } from "react-hot-toast";
import useChatter from "@/hooks/useChatterModal";
import Form from "../Form";

interface ChatterProps {}

const ChatterModal: FC<ChatterProps> = ({}) => {
  const chatterModal = useChatter();

  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const isSigned = await signIn("credentials", {
        redirect: false,
        post,
      });
      console.log(
        "🚀 ~ file: LoginModal.tsx:38 ~ onSubmit ~ isSigned:",
        isSigned
      );
      if (isSigned?.error === "Invalid credentials") {
        setIsError(true);
        toast.custom((t) => (
          <div className="flex bg-red-500 pr-8 pl-3 gap-2 py-3 rounded items-center justify-center">
            <BiErrorCircle className="text-white h-10 w-10" />
            <p className="text-white text-sm justify-center items-center">
              The email address or the password you entered is incorrect.
            </p>
          </div>
        ));
      } else {
        setIsError(false);
      }
    } catch (error) {
      console.log("🚀 ~ file: LoginModal.tsx:33 ~ onSubmit ~ error:", error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [post]);

  const bodyContent = (
    <div className="mb-10">
      <Form placeholder="What's happening?" />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      hasIcon
      isOpen={chatterModal.isOpen}
      title="Whats on your mind?"
      actionLabel=""
      onClose={chatterModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default ChatterModal;
