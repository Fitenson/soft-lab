import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, Method } from "axios";
import { useMemo, useState } from "react";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import { setIsLoading } from "@/core/presentation/store/loadingSlice";
import { store } from "@/core/presentation/store";


export type AxiosRequestResult = {
    isLoading: boolean;
    error: unknown;
    // data: T | null;
    axiosInstance: AxiosInstance
    request: <T>(options: Options) => Promise<T>;
}

export interface Options {
    url?: string;
    method?: Method;
    data?: AxiosRequestConfig["data"];
    config?: AxiosRequestConfig;
    withLoading?: boolean;
}


export const useRequest = (): AxiosRequestResult => {
    const axiosInstance = useMemo(() => {
        return axios.create({
            baseURL: 'http://softlab-backend.test/backend',
            withCredentials: true,
        });
    }, []);

    // const [data, setData] = useState<T | null>(null);
    const isLoading = useAppSelector(state => state.loading.global);
    const authViewModel = useAppSelector(state => state.auth.authViewModel);
    const [error, setError] = useState<unknown>(null);


    const request = async <T>(options?: Options): Promise<T> => {
        const shouldShowLoading = options?.withLoading !== false;
        let authHeader = {};

        if(shouldShowLoading) {
            store.dispatch(setIsLoading(true));
        }

        if(authViewModel) {
            const credentials = `${authViewModel.username}:${authViewModel.password}`;
            authHeader = {
                Authorization: `Basic ${btoa(credentials)}`,
            }
        }

        try {
            const response = await axiosInstance.request<T>({
                url: options?.url,
                method: options?.method,
                data: options?.data,
                ...options?.config,
                headers: {
                    "Content-Type": "multipart/form-data",
                    ...authHeader
                }
            });

            // setData(response.data as T);
            return response.data as T;
        } catch(error) {
            setError(error);
            throw error;
        }
        finally {
            if(shouldShowLoading) {
                store.dispatch(setIsLoading(false));
            }
        }
    }


    return { isLoading, error, request, axiosInstance };
}
