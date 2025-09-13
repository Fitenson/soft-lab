import { useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SetFormError, SetFormErrorOptions } from "@/core/presentation/form/SetFormError";
import type {DepartmentDTO} from "@/pages/department/data/dto/DepartmentDTO.ts";
import DepartmentViewModel from "@/pages/department/presentation/view-models/DepartmentViewModel.ts";
import {type DepartmentFormModel, departmentSchema} from "@/pages/department/presentation/schema/departmentSchema.tsx";


const useDepartmentForm = ({ departmentDTO }: { departmentDTO: DepartmentDTO | null }) => {
    const [departmentViewModel, setDepartmentViewModel] = useState<DepartmentViewModel>();

    if(departmentDTO) {
        setDepartmentViewModel(new DepartmentViewModel(departmentDTO));
    }
    

    const form = useForm<DepartmentFormModel>({
        resolver: zodResolver(departmentSchema),
        defaultValues: {
            departmentID: departmentViewModel?.departmentID ?? "",
            departmentName: departmentViewModel?.departmentName ?? "",
            description: departmentViewModel?.description ?? "",
            head: departmentViewModel?.head ?? null,
            headDepartmentName: departmentViewModel?.headDepartmentName ?? null
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
                const normalizedField = field.replace(/^department\./, "") as keyof DepartmentFormModel;

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
        departmentViewModel,
        setDepartmentViewModel
    }
}


export default useDepartmentForm;
