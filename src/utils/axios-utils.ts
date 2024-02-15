import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
  }
  

const client = axios.create({ baseURL: 'http://localhost:5000' });

export const request = async (options: AxiosRequestConfig): Promise<AxiosResponse<User[]>> => {
    const onSuccess = (response: AxiosResponse) => response;
    const onError = (error: AxiosError) => Promise.reject(error);

    try {
        const response = await client(options);
        return onSuccess(response);
    } catch (error: any) {
        return onError(error);
    }
};
