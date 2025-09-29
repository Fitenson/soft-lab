import axios, {type AxiosError} from "axios";
import type { AxiosInstance, AxiosRequestConfig, Method } from "axios";
import { useMemo, useState } from "react";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import { setIsLoading } from "@/core/presentation/store/loadingSlice";
import { store } from "@/core/presentation/store";
import { useDispatch } from "react-redux";
import { removeAuth } from "@/pages/auth/presentation/redux/authSlice.ts";
import { router } from "@inertiajs/react";
import useAuthState from "@/pages/auth/presentation/hooks/useAuthState";


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
    headers?: Record<string, string>
}


export const useRequest = (): AxiosRequestResult => {
    const { authViewModel } = useAuthState();

    const axiosInstance = useMemo(() => {
        return axios.create({
            baseURL: 'http://softlab-backend.test/backend',
            withCredentials: true,
        });
    }, []);

    // const [data, setData] = useState<T | null>(null);
    const isLoading = useAppSelector(state => state.loading.global);
    const dispatch = useDispatch();
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
                    ...authHeader,
                    ...options?.headers,
                }
            });

            return response.data as T;
        } catch(error) {
            const axiosError = error as AxiosError;

            if(axiosError.response && axiosError.response.status === 401) {
                dispatch(removeAuth());
                router.visit("/login");
            }

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
