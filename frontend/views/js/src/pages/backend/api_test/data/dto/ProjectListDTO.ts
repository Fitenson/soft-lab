import type { ClientDatabaseDTO } from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO.ts";

interface ProjectDTO {
    UUID: string;
    projectName: string;
    projectCode: string;
    clientDatabases: ClientDatabaseDTO[]
}

export interface ProjectListDTO {
    total: string;
    rows: ProjectDTO[]
}
