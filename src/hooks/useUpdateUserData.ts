import { useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const updateUser = ({ id, body }: any) => {
  return request({
    url: `/users/${id}`,
    method: "put",
    data: body,
  });
};

export const useUpdateUserData = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("getUsers");
    },
  });
};
