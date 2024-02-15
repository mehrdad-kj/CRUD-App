import { useQuery } from "react-query";
import { request } from "../utils/axios-utils";

const fetchUser = ({ queryKey }: { queryKey: string[]}) => {
  const userId = queryKey[1];
  return request({ url: `users/${userId}` });
};

export const useGetUserData = (userId: string) => {
  return useQuery(["getUser", userId], fetchUser, {
    enabled: !!userId,
    select: (response) => response.data

  });
};
