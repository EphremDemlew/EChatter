import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import useLoginModal from "./useLoginModal";
import { toast } from "react-hot-toast";
import axios from "axios";
const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedId || [];

    return list.includes(currentUser?.currentUser?.id);
  }, [fetchedPost?.likedId, currentUser?.currentUser?.id]);

  const toggleLike = useCallback(async () => {
    if (!currentUser?.currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      if (hasLiked) {
        request = () => axios.delete(`/api/like/${postId}`);
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      await request();

      mutateFetchedPost();
      mutateFetchedPosts();

      // toast.success("Like Successfully Added");
      if (hasLiked) {
        toast("Like Removed!", {
          style: {
            borderRadius: "10px",
            background: "#ef4444",
            color: "#fff",
          },
        });
      } else {
        toast("Like Added!", {
          style: {
            borderRadius: "10px",
            background: "#22c55e",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser?.currentUser,
    loginModal,
    mutateFetchedPost,
    mutateFetchedPosts,
    postId,
    hasLiked,
  ]);

  return { hasLiked, toggleLike };
};

export default useLike;
