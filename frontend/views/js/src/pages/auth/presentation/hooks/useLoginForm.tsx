import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, type LoginModel } from "@/pages/auth/presentation/schema/loginSchema";
import type { SetFormError, SetFormErrorOptions } from '@/core/presentation/form/SetFormError';
import type { ApiErrors } from "@/types";


const useLoginForm = () => {
    const form = useForm<LoginModel>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    });


    const setFormError: SetFormError = (
        error: unknown,
        options?: SetFormErrorOptions
    ) => {
        const { setToastError } = options || {};
        const axiosError = error as AxiosError<{ errors?: ApiErrors }>;
        const errors = axiosError?.response?.data?.errors ?? {};

        if (typeof errors === "string") {
            setToastError?.(errors);
        } else if (errors && Object.keys(errors).length > 0) {
            Object.keys(errors).forEach((field) => {
                const normalizedField = field.replace(/^user\./, "") as keyof LoginModel;
                const errorValue = errors[field];

                const message =
                    Array.isArray(errorValue) ? errorValue[0] : errorValue || "Invalid value";

                if (normalizedField in form.getValues()) {
                    form.setError(normalizedField, {
                        type: "server",
                        message,
                    });
                } else {
                    // fallback for unmapped fields → show toast
                    setToastError?.(message);
                }
            });
        }
    };
    

    return {
        form,
        setFormError,
    }
}


export default useLoginForm;
