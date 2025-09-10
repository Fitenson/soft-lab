import { useForm } from "react-hook-form";
import { userSchema, type UserForm } from "../schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type UserViewModel from "@/pages/user/presentation/view_models/UserViewModel.ts";
import type {SetFormError, SetFormErrorOptions} from "@/core/presentation/form/SetFormError";
import {AxiosError} from "axios";
import type {RegisterModel} from "@/pages/auth/presentation/hooks/useRegisterForm.tsx";


const useUserForm = ({ userViewModel }: { userViewModel: UserViewModel }) => {
    const form = useForm<UserForm>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: userViewModel?.username,
            fullName: userViewModel?.fullName,
            email: userViewModel?.email,
            address: userViewModel?.address,
            description: userViewModel?.description,

        }
    });


    const setFormError: SetFormError = (
        error: unknown,
        options?: SetFormErrorOptions
    ) => {
        const { setToastError } = options || {};
        const axiosError = error as AxiosError<{ errors?: Record<string, string[]>}>;
        const errors = axiosError?.response?.data?.errors ?? {};

        if (typeof errors === "string") {
            setToastError?.(errors);
        } else if (errors && Object.keys(errors).length > 0) {
            Object.keys(errors).forEach((field) => {
                const normalizedField = field.replace(/^user\./, "") as keyof RegisterModel;

                if (normalizedField in form.getValues()) {
                    form.setError(normalizedField, {
                        type: "server",
                        message: errors[field][0] ?? "Invalid value",
                    });
                }
            });
        }
    }


    return {
        form,
        setFormError
    }
}


export default useUserForm;
