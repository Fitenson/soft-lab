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
