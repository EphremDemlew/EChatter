"use client";
import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { BsFillChatQuoteFill } from "react-icons/bs";

import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  hasIcon?: boolean;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onSubmit,
  onClose,
  title,
  body,
  disabled,
  actionLabel,
  footer,
  hasIcon,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) return;

    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) return null;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div className="relative w-full lg:w-2/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          {/* content */}
          <div className="h-full lg:h-auto border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none px-14">
            {/* Header */}
            {hasIcon && (
              <div className="w-full  flex justify-center -mb-5 mt-10">
                <BsFillChatQuoteFill size={36} className="text-orange-500" />
              </div>
            )}
            <button
              className="absolute left-1 top-1 p-1 ml-auto border-0 text-white  hover:opacity-70 transition"
              onClick={handleClose}
            >
              <IoIosClose size={34} />
            </button>
            <div className="flex items-center justify-center p-10 rounded-t ">
              <h3 className="text-3xl font-semibold text-white ">{title}</h3>
            </div>
            {/* Body */}
            <div className="relative px-10 py-5 flex-auto">{body}</div>
            {/* Footer */}
            <div className="flex flex-col gap-2 p-10 items-start ">
              <div className="w-full">
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  secondary
                  fullWidth
                  large
                  onClick={handleSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
