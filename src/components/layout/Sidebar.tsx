"use client";

import "@/styles/global.css";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser, FaFeatherAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
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
    <div
      className=" flex items-center justify-center rounded-full h-14 w-14 p-4  hover:bg-green-300 hover:bg-opacity-10 cursor-pointer transition "
      onClick={() => router.push("/")}
    >
      <FaFeatherAlt className="w-28 text-teal-500" />
      {item.map((item) => {
      return (
        <SidebarItem
        key={item.label}
        label={item.label}
        href={item.href}
        icon={item.icon}
        
        />
        )
    }}
      {/* {item.map((item) => {
        return (useRouter
          <div key={item.label} className="flex">
            <img
              src={item.icon}useRouter
              width={10}
              height={10}
              alt={`${item.label}.jpg`}
            />
          </div>
        );
      })} */}
    </div>
  );
};

export default Sidebar;
