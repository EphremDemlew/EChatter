import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { format } from "date-fns";
import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import Button from "../Button";

interface UserBioProps {
  userId: string;
}
const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId as string);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }
    return format(new Date(fetchedUser?.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={() => {}} />
        ) : (
          <Button secondary label="Follow" onClick={() => {}} />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white font-semibold text-2xl">
            {fetchedUser?.name}
          </p>
          <p className="text-neutral-500 text-md">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white ">{fetchedUser?.bio}</p>
          <div className="flex items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-1 ">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex items-center gap-1 ">
            <p className="text-white">{fetchedUser?.followerCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
