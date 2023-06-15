"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(currentUser?.currentUser?.profileImage);
    setName(currentUser?.currentUser?.name);
    setUsername(currentUser?.currentUser?.username);
    setCoverImage(currentUser?.currentUser?.coverImage);
    setBio(currentUser?.currentUser?.bio);
  }, [currentUser?.currentUser]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/edit", {
        bio,
        coverImage,
        name,
        profileImage,
        username,
      });
      mutateFetchedUser();

      toast.success("Profile updated successfully");

      editModal.onClose();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    coverImage,
    editModal,
    name,
    profileImage,
    username,
    mutateFetchedUser,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />

      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
      <Input
        placeHolder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name || ""}
        disabled={isLoading}
      />
      <Input
        placeHolder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username || ""}
        disabled={isLoading}
      />

      <Input
        placeHolder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio || ""}
        disabled={isLoading}
      />
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your Profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
