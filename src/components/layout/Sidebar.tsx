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
import HomeIcon from "../../../public/Icons/HomeIcon.svg";
import Avatar from "../Avatar";
import halfMoon from "@/assets/images/half-moon.png";
import sun from "@/assets/images/sun.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
      auth: true,
      alert: currentUser?.currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];

  return (
    <div className="fixed flex flex-col justify-between  h-screen">
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
                auth={item.auth}
                alert={item.alert}
              />
            );
          })}
          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SidebarTweetBtn />
        </div>
      </div>
      <div>
        <p className="m-10">
          <Image
            src={halfMoon}
            alt="half-moon.jpg"
            className="w-8 cursor-pointer dark:hidden"
            onClick={() => setTheme("dark")}
          />
          <Image
            src={sun}
            alt="half-moon.jpg"
            className="w-8 cursor-pointer hidden dark:block"
            onClick={() => setTheme("light")}
          />
        </p>
        {currentUser && (
          <div className="flex gap-4 mb-5">
            <Avatar userId={currentUser?.currentUser?.id} />
            <div className="flex flex-col">
              <p className="text-black dark:text-white  font-semibold text-sm">
                {currentUser?.currentUser?.name}
              </p>
              <p className="text-neutral-400  text-sm">
                @{currentUser?.currentUser?.username}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
