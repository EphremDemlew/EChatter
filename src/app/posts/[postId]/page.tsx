"use client";

import Form from "@/components/Form";
import Header from "@/components/Header";
import CommentFeed from "@/components/post/CommentFeed";
import PostItem from "@/components/post/PostItem";
import usePost from "@/hooks/usePost";
import { ClipLoader } from "react-spinners";

const PostView = ({ params }: { params: { postId: string } }) => {
  const postId = params.postId;
  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="orange" size={80} />
      </div>
    );
  }
  return (
    <>
      <Header label="Echatter" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Chatter your reply"
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
