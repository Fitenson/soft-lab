import { buildFormData } from "@/lib/utils.ts";


export interface ApiTestDTO {
    UUID: string;
    parentApiTest: string;
    clientDatabase: string;
    project: string;
    testName: string;
    transmission: string;
    description: string;
    moreDescription: string;
    data: string;
    output: string;
    scenario: string;
}


const apiTestDTOKeys: (keyof ApiTestDTO)[] = [
    "UUID",
    "parentApiTest",
    "clientDatabase",
    "project",
    "testName",
    "transmission",
    "description",
    "moreDescription",
    "data",
    "output",
    "scenario",
];


export function apiTestFormData(apiTestDTO: Partial<ApiTestDTO>, formData: FormData): FormData {
    return buildFormData(apiTestDTO, apiTestDTOKeys, formData, 'apiTest');
}
