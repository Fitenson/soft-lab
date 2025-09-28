import { useState } from "react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { SetFormError, SetFormErrorOptions } from "@/core/presentation/form/SetFormError";
import ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel.ts";
import type { ApiTestDTO } from "@/pages/backend/api_test/data/dto/ApiTestDTO.ts";
import { type ApiTestFormModel, apiTestSchema } from "@/pages/backend/api_test/presentation/schema/apiTestSchema.ts";


const useApiTestForm = ({ apiTestDTO}: { apiTestDTO?: ApiTestDTO }) => {
    const [apiTestViewModel, setApiTestViewModel] = useState<ApiTestViewModel | undefined>(
        () => (apiTestDTO ? new ApiTestViewModel(apiTestDTO) : undefined)
    );


    const form = useForm<ApiTestFormModel>({
        resolver: zodResolver(apiTestSchema),
        defaultValues: {
            parentApiTest: apiTestViewModel?.parentApiTest ?? "",
            clientDatabase: apiTestViewModel?.clientDatabase ?? "",
            project: apiTestViewModel?.project ?? "",
            testName: apiTestViewModel?.testName ?? "",
            isFolder: apiTestViewModel?.isFolder ?? false,
            transmission: apiTestViewModel?.transmission ?? "",
            description: apiTestViewModel?.description ?? "",
            moreDescription: apiTestViewModel?.moreDescription ?? "",
            data: apiTestViewModel?.data ?? "",
            output: apiTestViewModel?.output ?? "",
            scenario: apiTestViewModel?.scenario ?? ""
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
                const normalizedField = field.replace(/^apiTest\./, "") as keyof ApiTestFormModel;

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
        apiTestViewModel,
        setApiTestViewModel,
    };
}


export default useApiTestForm;
