export interface DepartmentDTO {
    UUID: string;
    departmentID: string;
    departmentName: string;
    head: string | null;
    headDepartmentName: string;
    description: string | null;
    valid: boolean;
    createdAtFormat: string | null;
    createdByName: string | null;
    updatedAtFormat: string | null;
    updatedByName: string | null;
}
