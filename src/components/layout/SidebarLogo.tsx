import { FaEarlybirds, FaTwitter } from "react-icons/fa";
import { MdEgg } from "react-icons/md";
import { useRouter } from "next/navigation";

function SidebarLogo() {
  const router = useRouter();

  return (
    <div
      className=" flex items-center justify-center rounded-full h-14 w-14 p-4  hover:bg-green-300 hover:bg-opacity-10 cursor-pointer transition "
      onClick={() => router.push("/")}
    >
      <FaEarlybirds size={36} className="text-teal-500" />
    </div>
  );
}

export default SidebarLogo;
