"use client";

import "@/styles/global.css";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUser, FaFeatherAlt } from "react-icons/fa";
import useCurrentUser from "@/hooks/useCurrentUser";
import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";
import SidebarTweetBtn from "./ SidebarTweetBtn";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

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
          {currentUser ? (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
            />
          ) : (
            ""
          )}
          <SidebarTweetBtn />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
