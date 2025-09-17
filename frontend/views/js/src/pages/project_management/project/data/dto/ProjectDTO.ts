import { buildFormData } from "@/lib/utils";


export interface ProjectDTO {
    UUID: string;
    projectName: string;
    projectCode: string;
    description: string | null;
    secondDescription: string | null;
    moreDescription: string | null;
    valid: boolean;
    createdAtFormat: string | null;
    createdByName: string | null;
    updatedAtFormat: string | null;
    updatedByName: string | null;
}


const projectDTOKeys: (keyof ProjectDTO)[] = [
    "UUID",
    "projectName",
    "projectCode",
    "description",
    "secondDescription",
    "moreDescription",
    "valid",
];


export function projectFormData(projectDTO: Partial<ProjectDTO>, formData: FormData): FormData {
    return buildFormData(projectDTO, projectDTOKeys, formData, 'project');
}
