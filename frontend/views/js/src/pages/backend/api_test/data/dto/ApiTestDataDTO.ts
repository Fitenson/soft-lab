import {buildFormData} from "@/lib/utils.ts";

export interface ApiTestDataDTO {
    UUID: string;
    apiTest: string;
    fieldType: string;
    key: string;
    value: string;
    enabled: number;
    description: string;
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
    return buildFormData(apiTestData, apiTestDataDTOKeys, formData, 'apiTestHasData');
}
