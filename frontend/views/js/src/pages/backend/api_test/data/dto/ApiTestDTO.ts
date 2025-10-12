import { buildFormData } from "@/lib/utils.ts";
import type { ApiTestDataDTO } from "@/pages/backend/api_test/data/dto/ApiTestDataDTO.ts";


export interface ApiTestDTO {
    UUID: string;
    parentApiTest: string;
    clientDatabase: string;
    project: string;
    testName: string;
    isFolder: number;
    transmission: string;
    description: string;
    moreDescription: string;
    apiTestData?: ApiTestDataDTO[];
    apiTests?: ApiTestDTO[];
    isNew?: boolean;
}


const apiTestDTOKeys: (keyof ApiTestDTO)[] = [
    "UUID",
    "parentApiTest",
    "clientDatabase",
    "project",
    "testName",
    "transmission",
    "description",
    "isFolder",
    "moreDescription",
];


export function apiTestFormData(apiTestDTO: Partial<ApiTestDTO>, formData: FormData): FormData {
    return buildFormData(apiTestDTO, apiTestDTOKeys, formData, 'apiTest');
}
