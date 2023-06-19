"use client";

import useUsers from "@/hooks/useUsers";
import Avatar from "../Avatar";
import Input from "../Input";
import { BiSearch } from "react-icons/bi";

function FollowBar() {
  const { data: users = [], isLoading, error } = useUsers();

  if (users.length === 0) return null;
  return (
    <div className="px-6 py-4 hidden lg:block fixed">
      <div className="dark:bg-[#16181C] bg-stone-500 rounded-full w-72 flex justify-center items-center mb-4 px-3 py-1 focus:outline-sky-500">
        <BiSearch
          size={28}
          className="ml-3 text-orange-500 dark:text-gray-500 "
        />
        <input
          type="text"
          placeholder="Search EChatters"
          name=""
          id=""
          className="px-4 py-2 outline-none overflow-hidden dark:bg-[#16181C] bg-stone-500  text-white  "
        />
      </div>
      <div className="rounded-xl p-4 w-72 dark:bg-[#16181C] bg-stone-500">
        <h1 className=" text-white  text-xl font-semibold">Who to follow</h1>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex gap-4 ">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white  font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400  text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FollowBar;
