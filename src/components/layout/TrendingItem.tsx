"use client";

import useUsers from "@/hooks/useUsers";
import Avatar from "../Avatar";
import Input from "../Input";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import useTrendingUsers from "@/hooks/useTrendingUsers";

function TrendingItem() {
  const { data: users = [], isLoading, error } = useTrendingUsers();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 mt-4">
        {Array.from(Array(5), (e, i) => {
          return (
            <div key={i} className="flex gap-4 ">
              <p className=" rounded-full bg-neutral-200 dark:bg-neutral-600 h-12 w-12 animate-pulse"></p>

              <div className="flex flex-col gap-1">
                <p className="h-6 w-16 bg-neutral-200 animate-pulse dark:bg-neutral-600 rounded"></p>
                <p className="h-3 w-20 bg-neutral-200 animate-pulse dark:bg-neutral-600 rounded"></p>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    if (users.length === 0)
      return <h1 className="mt-2">Sorry no one with that name is found.</h1>;
    return (
      <div className="flex flex-col gap-6 mt-4">
        {users.map((user: Record<string, any>) => (
          <div key={user.id} className="flex gap-4 ">
            <Avatar userId={user.id} />
            <div className="flex flex-col">
              <p className="text-white  font-semibold text-sm">{user.name}</p>
              <p className="text-neutral-300  text-sm">@{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default TrendingItem;
