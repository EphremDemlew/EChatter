import "@/styles/global.css";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser, FaFeatherAlt } from "react-icons/fa";
import Image from "next/image";

const Sidebar = () => {
  const item = [
    {
      label: "Home",
      href: "/",
      icon: "BsHouseBsHouseFill",
    },
    {
      label: "Notification",
      href: "/notification",
      icon: "BsBellFill",
    },
    {
      label: "Profile",
      href: "/user/123",
      icon: "FaUser",
    },
  ];
  return (
    <div className="bg-red-500 w-40 p-10  ">
      <FaFeatherAlt className="w-10 h-10 text-teal-500" />
      {item.map((val) => {
        return (
          <div key={val.label} className="flex">
            <Image
              src={val.icon}
              width={10}
              height={10}
              alt={`${val.label}.jpg`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
