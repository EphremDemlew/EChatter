"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { useEffect, useMemo } from "react";
import { BsTwitter } from "react-icons/bs";
import { formatDistanceToNowStrict } from "date-fns";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(
    currentUser?.currentUser?.id
  );

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center text-xl p-6">
        No Notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex items-center p-5 gap-4 border-b-[1px] border-neutral-800"
        >
          <BsTwitter size={32} color="white" />
          <p className="text-black dark:text-white ">{notification.body}</p>
          <p className="text-neutral-500">
            {`${formatDistanceToNowStrict(
              new Date(notification.createdAt)
            )} ago ` || ""}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
