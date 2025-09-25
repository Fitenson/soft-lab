import { buildFormData } from "@/lib/utils";

export interface ClientDatabaseDTO {
    UUID: string;
    host: string;
    port: string;
    databaseName: string;
    databaseSchema: string;
    username: string;
    password: string;
    project: string;
    projectName: string;
    refreshToken?: string;
    valid: boolean;
}


const clientDatabaseDTOKeys: (keyof ClientDatabaseDTO)[] = [
    "UUID",
    "host",
    "port",
    "databaseName",
    "databaseSchema",
    "username",
    "password",
    "project",
    "valid",
];


export function clientDatabaseFormData(clientDatabaseDTO: Partial<ClientDatabaseDTO>, formData: FormData): FormData {
    return buildFormData(clientDatabaseDTO, clientDatabaseDTOKeys, formData, 'clientDatabase');
}
