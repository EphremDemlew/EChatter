import { BiSearch } from "react-icons/bi";

export default function FollowLoading() {
  return (
    <div className="px-6 py-4 hidden lg:block fixed ">
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
        <div className="flex gap-4 mt-4 justify-start items-center">
          <p className=" rounded-full bg-neutral-300 dark:bg-neutral-600 h-12 w-12"></p>
          <div className="flex flex-col gap-1">
            <p className="h-6 w-16 bg-neutral-300 animate-pulse dark:bg-neutral-600 rounded"></p>
            <p className="h-3 w-20 bg-neutral-300 animate-pulse dark:bg-neutral-600 rounded"></p>
          </div>
        </div>
      </div>
    </div>
  );
}
