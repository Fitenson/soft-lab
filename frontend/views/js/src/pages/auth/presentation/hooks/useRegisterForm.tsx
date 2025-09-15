import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';

import { registerSchema, type RegisterModel } from '@/pages/auth/presentation/schema/registerSchema';
import type { SetFormError, SetFormErrorOptions } from '@/core/presentation/form/SetFormError';
import type { ApiErrorResponse } from "@/types";
import type {LoginModel} from "@/pages/auth/presentation/schema/loginSchema.tsx";


const useRegisterForm = () => {    
    const form = useForm<RegisterModel>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: '',
            email: '',
            username: '',
            password: '',
        }
    });


    const setFormError: SetFormError = (
        error: unknown,
        options?: SetFormErrorOptions
    ) => {
        const { setToastError } = options || {};
        const axiosError = error as AxiosError<{ errors?: ApiErrorResponse }>;
        const errors = axiosError.response?.data?.errors as ApiErrorResponse;

        if (typeof errors === "string") {
            setToastError?.(errors);
        } else if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([field, errorValue]) => {
                const normalizedField = field.replace(/^user\./, "") as keyof LoginModel;

                let message: string;
                if (Array.isArray(errorValue)) {
                    message = errorValue[0] ?? "Invalid value";
                } else if (typeof errorValue === "string") {
                    message = errorValue;
                } else {
                    message = "Invalid value";
                }

                if (normalizedField in form.getValues()) {
                    form.setError(normalizedField, {
                        type: "server",
                        message,
                    });
                } else {
                    setToastError?.(message);
                }
            });
        } else {
            setToastError?.("Something went wrong. Please try again.");
        }
    }


    return {
        form,
        setFormError,
    }
}


export default useRegisterForm;
