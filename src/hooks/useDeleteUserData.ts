import { useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const deleteUser = (id: any) => {
  return request({ url: `/users/${id}`, method: "delete" });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("getUsers");
    },
  });
};
