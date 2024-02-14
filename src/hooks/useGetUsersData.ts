import { useQuery } from "react-query"
import { request } from "../utils/axios-utils"

const fetchUsers = () => {
    return request({ url: '/users'})
} 

export const useGetUsersData = () => {
    return useQuery("getUsers", fetchUsers, {
        select: (response: any) => response.data
    })
}