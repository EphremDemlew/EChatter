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
import { Switch } from "@headlessui/react";

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
      <div className="flex flex-col justify-center items-center">
        <div className="m-10  h-5">
          <Switch
            checked={theme == "dark" ? true : false}
            onChange={() => setTheme(theme == "dark" ? "light" : "dark")}
          >
            {({ checked }) => (
              <button
                className={`${
                  checked ? "  lg:bg-orange-500 " : "bg-sky-900 "
                }   items-center rounded-full flex justify-between w-auto lg:w-32 h-8`}
              >
                <Image
                  src={sun}
                  alt="sun.jpg"
                  className={`${
                    theme == "dark"
                      ? "h-12 w-12 lg:-ml-2"
                      : "h-5 w-5 ml-2 hidden lg:block"
                  }  cursor-pointer transition duration-200 `}
                />
                <Image
                  src={halfMoon}
                  alt="halfMoon.jpg"
                  className={`${
                    theme == "light"
                      ? "h-12 w-12"
                      : "h-5 w-5 mx-2 hidden lg:block"
                  }  cursor-pointer transition duration-200 `}
                />
              </button>
            )}
          </Switch>
        </div>
        {currentUser && (
          <div className="flex justify-center  gap-4 mb-5">
            <Avatar userId={currentUser?.currentUser?.id} />
            <div className=" flex-col hidden lg:flex">
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
