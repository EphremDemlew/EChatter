"use client";

import useUsers from "@/hooks/useUsers";
import { Suspense, useState } from "react";
import { BiSearch } from "react-icons/bi";
import FollowBar from "./layout/FollowBar";
import FollowLoading from "./loading/FollowLoading";

const RightSideBar = () => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className="hidden lg:block fixed">
      <div className="dark:bg-[#16181C] bg-stone-500 rounded-full w-72 flex mx-5 justify-center items-center my-4 px-3 py-1 focus:outline-sky-500">
        <BiSearch
          size={28}
          className="ml-3 text-orange-500 dark:text-gray-500 "
        />
        <input
          type="text"
          placeholder="Search EChatters"
          name=""
          id=""
          value={searchKey}
          onChange={(e: any) => setSearchKey(e.target.value)}
          className="px-4 py-2 outline-none overflow-hidden dark:bg-[#16181C] bg-stone-500  text-white  "
        />
      </div>

      <div className="flex flex-col">
        <div className="px-6 py-4 ">
          <div className="rounded-xl p-4 w-72 dark:bg-[#16181C] bg-stone-400">
            <h1 className=" text-white  text-xl font-semibold">
              Who to follow
            </h1>
            <Suspense fallback={<FollowLoading />}>
              <FollowBar searchKey={searchKey} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
