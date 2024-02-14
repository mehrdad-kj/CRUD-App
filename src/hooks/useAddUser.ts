import { useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const addUser = (user: any) => {
  return request({ url: "/users", method: "post", data: user });
};

export const useAddUser = () => {
  const queryClient = useQueryClient()
  return useMutation(addUser, {
      onSuccess: () => {
          queryClient.invalidateQueries("getUsers")
      }
  })

};
