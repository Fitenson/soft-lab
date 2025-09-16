import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserViewModel from "@/pages/organization/user/presentation/view-models/UserViewModel.ts";
import type { SetFormError, SetFormErrorOptions } from "@/core/presentation/form/SetFormError";
import {AxiosError} from "axios";
import { userSchema, type UserFormModel } from "@/pages/organization/user/presentation/schema/userSchema.tsx";
import type { UserDTO } from "@/pages/organization/user/data/dto/UserDTO.ts";
import { useState } from "react";


const useUserForm = ({ userDTO }: { userDTO: UserDTO | null }) => {
    const [userViewModel, setUserViewModel] = useState<UserViewModel | undefined>(
        () => (userDTO ? new UserViewModel(userDTO) : undefined),
    );
    

    const form = useForm<UserFormModel>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: userViewModel?.username ?? "",
            fullName: userViewModel?.fullName ?? "",
            email: userViewModel?.email ?? "",
            role: userViewModel?.role ?? "",
            address: userViewModel?.address ?? undefined,
            description: userViewModel?.description ?? undefined,
            phoneNo: userViewModel?.phoneNo ?? undefined,
            title: userViewModel?.title ?? undefined,
            gender: userViewModel?.gender ?? undefined,
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
                const normalizedField = field.replace(/^user\./, "") as keyof UserFormModel;

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
        setFormError,
        userViewModel,
        setUserViewModel
    }
}


export default useUserForm;
