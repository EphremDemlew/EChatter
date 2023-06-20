"use client";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { FC, useState, useCallback } from "react";
import Input from "../Input";
import Modal from "../Modal";
import { signIn } from "next-auth/react";
interface LoginModalProps {}

const LoginModal: FC<LoginModalProps> = ({}) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) return;

    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn("credentials", { email, password });

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, password, email]);

  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <Input
        placeHolder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
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
        Don&apos;t have an account?
        <span
          className="text-orange-500 cursor-pointer hover:underline font-bold"
          onClick={onToggle}
        >
          {" "}
          Sign up
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      hasIcon
      isOpen={loginModal.isOpen}
      title="Sign in to EChatter"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
