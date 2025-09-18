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