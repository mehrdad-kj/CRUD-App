import axios, { AxiosError, AxiosResponse } from "axios";

const client = axios.create({ baseURL: 'http://localhost:5000' })

export const request = async ({ ...options }) => {
    const onSuccess = (response: AxiosResponse) => response
    const onError = (error: AxiosError) => error

    try {
        const response = await client(options);
        return onSuccess(response);
    } catch (error: any) {
        return onError(error);
    }
}