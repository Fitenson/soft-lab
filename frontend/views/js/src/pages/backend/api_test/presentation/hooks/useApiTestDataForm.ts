import React from "react";
import ApiTestDataViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestDataViewModel.ts";
import type { ApiTestDataDTO } from "@/pages/backend/api_test/data/dto/ApiTestDataDTO.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type ApiTestDataFormModel,
    apiTestDataSchema
} from "@/pages/backend/api_test/presentation/schema/apiTestDataSchema.ts";


const useApiTestDataForm = ({ apiTestDataDTOs }: { apiTestDataDTOs?: ApiTestDataDTO[] }) => {
    const apiTestDataViewModels: ApiTestDataViewModel[] = React.useMemo(
        () => (apiTestDataDTOs ?? []).map(dto => new ApiTestDataViewModel(dto)),
        [apiTestDataDTOs]
    );

    const form = useForm<ApiTestDataFormModel>({
        resolver: zodResolver(apiTestDataSchema),
        defaultValues: {
            enabled: 1,
            key: "",
            value: "",
            description: "",
            data: apiTestDataViewModels.map(apiTestDataViewModel => ({
                enabled: apiTestDataViewModel.enabled,
                key: apiTestDataViewModel.key ?? "",
                value: apiTestDataViewModel.value ?? "",
                description: apiTestDataViewModel.description ?? "",
            })),
        },
    });

    return {
        form,
        apiTestDataViewModels,
    };
}


export default useApiTestDataForm;
