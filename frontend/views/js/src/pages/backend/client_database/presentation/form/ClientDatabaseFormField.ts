import { createFormField } from "@/lib/utils.ts";


const ClientDatabaseFormField = {
    databaseName: createFormField({ name: "databaseName", label: "Database Name", max: 50 }),
    databaseSchema: createFormField({ name: "databaseSchema", label: "Database Schema", max: 50 }),
    host: createFormField({ name: "host", label: "Host", max: 50 }),
    port: createFormField({ name: "port", label: "Port", max: 50 }),
    username: createFormField({ name: "username", label: "Username", max: 50 }),
    password: createFormField({ name: "password", label: "Password", max: 50 }),
};


export default ClientDatabaseFormField;
