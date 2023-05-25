import { useRouter } from "next/navigation";
import { FaFeather } from "react-icons/fa";

function SidebarTweetBtn() {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/");
      }}
    >
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-300 hover:bg-opacity-80 transition cursor-pointer ">
        <FaFeather size={28} color="white" />
      </div>

      <div className="mt-6 lg:block hidden rounded-full  px-4 py-2 bg-sky-500 hover:bg-h-14 w-14opacity-90 transition cursor-pointer ">
        <p className="hidden lg:block font-semibold text-center text-white text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
}

export default SidebarTweetBtn;
