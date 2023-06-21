import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUsers = (searchKey?: string) => {
  const url = searchKey?.trim()
    ? "/api/users"
    : `/api/users?searchKey=${searchKey}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
