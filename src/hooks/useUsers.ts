import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUsers = (searchKey?: string) => {
  const url = searchKey?.trim()
    ? `/api/users?searchKey=${searchKey}`
    : "/api/users";

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
