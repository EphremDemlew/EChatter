import { BsTwitter, BsFillChatQuoteFill } from "react-icons/bs";
import { MdEgg } from "react-icons/md";
import { useRouter } from "next/navigation";

import { GrFreebsd } from "react-icons/gr";

function SidebarLogo() {
  const router = useRouter();

  return (
    <div
      className=" flex items-center justify-start rounded-full h-15 w-15 p-4  hover:bg-green-300 hover:bg-opacity-10 cursor-pointer transition "
      onClick={() => router.push("/")}
    >
      <BsFillChatQuoteFill size={36} className="text-orange-400" />
    </div>
  );
}

export default SidebarLogo;
