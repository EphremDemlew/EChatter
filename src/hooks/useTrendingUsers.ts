import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useTrendingUsers = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/users/trending",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useTrendingUsers;
