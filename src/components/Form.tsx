"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePost";
import { BiCheck, BiErrorCircle } from "react-icons/bi";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

      await axios.post(url, { body });

      toast.custom((t) => (
        <div className="flex bg-green-500 pr-8 pl-3 gap-2 py-3 rounded items-center justify-center">
          <BiCheck className="text-white h-8 w-8" />
          <p className="text-white text-base justify-center items-center">
            Chatter Created
          </p>
        </div>
      ));
      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.custom((t) => (
        <div className="flex bg-red-500 pr-8 pl-3 gap-2 py-3 rounded items-center justify-center">
          <BiErrorCircle className="text-white h-10 w-10" />
          <p className="text-white text-sm justify-center items-center">
            Something went wrong
          </p>
        </div>
      ));
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, mutatePost, isComment, postId]);

  return (
    <div className="border-b-[1px] border-neural-400  dark:border-neutral-800 px-5 py-2 ">
      {currentUser ? (
        <div className="flex gap-4">
          <div>
            <Avatar userId={currentUser?.currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="disabled:opacity-80 peer resize-none mt-4 ring-0 w-full bg-white dark:bg-black 
              outline-none text-[20px] placeholder-neutral-500 text-black dark:text-white "
              placeholder={placeholder}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neural-400  dark:border-neutral-800 transition" />
            <div className="mt-4 flex justify-end">
              <Button
                label="Chatter"
                disabled={isLoading || !body}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 ">
          <h1 className="text-black dark:text-white  text-2xl text-center mb-4 font-bold">
            Welcome to EChatter
          </h1>
          <div className="flex items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
