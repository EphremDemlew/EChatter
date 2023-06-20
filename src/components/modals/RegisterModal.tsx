"use client";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { FC, useState, useCallback } from "react";
import Input from "../Input";
import Modal from "../Modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { BiCheck, BiErrorCircle } from "react-icons/bi";

interface RegisterModalProps {}

const RegisterModal: FC<RegisterModalProps> = ({}) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) return;

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      //   Todo Add Register and Login

      await axios.post("/api/register", { email, password, username, name });

      toast.custom((t) => (
        <div className="flex bg-green-500 pr-8 pl-3 gap-2 py-3 rounded items-center justify-center">
          <BiCheck className="text-white h-8 w-8" />
          <p className="text-white text-base justify-center items-center">
            Account created
          </p>
        </div>
      ));

      signIn("credentials", { email, password });
      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.custom((t) => (
        <div className="flex bg-red-500 pr-8 pl-3 gap-2 py-3 rounded items-center justify-center">
          <BiErrorCircle className="text-white h-10 w-10" />
          <p className="text-white text-sm justify-center items-center">
            Please change your credentials and try again.
          </p>
        </div>
      ));
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, username, name]);

  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <Input
        placeHolder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeHolder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeHolder="Username"
        onChange={(e) => setUserName(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeHolder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-500 dark:text-neutral-400 text-center md-4">
      <p>
        Have an account already?
        <span
          className="text-orange-500 cursor-pointer hover:underline font-bold"
          onClick={onToggle}
        >
          {" "}
          Log in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      hasIcon
      isOpen={registerModal.isOpen}
      title="Join EChatter today"
      actionLabel="Create an account"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
