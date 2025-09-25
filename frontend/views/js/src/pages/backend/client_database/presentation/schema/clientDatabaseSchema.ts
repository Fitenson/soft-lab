import { z } from "zod";
import ClientDatabaseFormField from "@/pages/backend/client_database/presentation/form/ClientDatabaseFormField.ts";


export const clientDatabaseSchema = z.object({
    databaseName: z.string().max(ClientDatabaseFormField.databaseName.max, { error: ClientDatabaseFormField.databaseName.maxError }),
    databaseSchema: z.string().max(ClientDatabaseFormField.databaseSchema.max, { error: ClientDatabaseFormField.databaseSchema.maxError }),
    host: z.string().max(ClientDatabaseFormField.host.max, { error: ClientDatabaseFormField.host.maxError }),
    port: z.string().max(ClientDatabaseFormField.port.max, { error: ClientDatabaseFormField.port.maxError }),
    username: z.string().max(ClientDatabaseFormField.username.max, { error: ClientDatabaseFormField.username.maxError }),
    password: z.string().max(ClientDatabaseFormField.password.max, { error: ClientDatabaseFormField.password.maxError }),
    project: z.string(),
    projectName: z.string(),
});


export type ClientDatabaseFormModel = z.infer<typeof clientDatabaseSchema>;
