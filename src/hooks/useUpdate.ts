import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUpdate = (userId: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/edit${userId}`,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
