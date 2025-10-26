import {buildFormData} from "@/lib/utils.ts";

export interface ApiTestDataDTO {
    UUID: string;
    apiTest: string;
    fieldType: string;
    key: string;
    value: string;
    enabled: number;
    description: string;
    isNew: boolean;
}


const apiTestDataDTOKeys: (keyof ApiTestDataDTO)[] = [
    "UUID",
    "apiTest",
    "fieldType",
    "key",
    "value",
    "enabled",
    "description",
];


export function apiTestDataFormData(
    apiTestData: Partial<ApiTestDataDTO>[],
    formData: FormData
) {
    const normalizedData = apiTestData.map((data) => ({
        ...data,
        UUID: data.isNew ? "" : data.UUID ?? "",
    }));

    return buildFormData(normalizedData, apiTestDataDTOKeys, formData, 'apiTestHasData');
}
