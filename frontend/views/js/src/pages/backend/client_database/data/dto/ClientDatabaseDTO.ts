import { buildFormData } from "@/lib/utils";

export interface ClientDatabaseDTO {
    UUID: string;
    host: string;
    port: string;
    databaseName: string;
    databaseSchema: string;
    username: string;
    password: string;
    refreshToken: string;
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
    "refreshToken",
    "valid",
];


export function clientDatabaseFormData(clientDatabaseDTO: Partial<ClientDatabaseDTO>, formData: FormData): FormData {
    return buildFormData(clientDatabaseDTO, clientDatabaseDTOKeys, formData, 'clientDatabase');
}
