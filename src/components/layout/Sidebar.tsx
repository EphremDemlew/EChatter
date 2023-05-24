"use client";

import "@/styles/global.css";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser, FaFeatherAlt } from "react-icons/fa";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";

const Sidebar = () => {
  const item = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notification",
      href: "/notification",
      icon: BsBellFill,
    },
    {
      label: "Profile",
      href: "/user/123",
      icon: FaUser,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {item.map((item) => {
            return (
              <SidebarItem
                key={item.label}
                label={item.label}
                href={item.href}
                icon={item.icon}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
