import { Card, CardDescription, CardHeader } from "@/components/ui/card.tsx";
import ClientDatabaseViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseViewModel.ts";
import type { ClientDatabaseDTO } from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO.ts";


export default function DatabaseCard({ clientDatabaseDTO }: { clientDatabaseDTO: ClientDatabaseDTO }) {
    const clientDatabaseViewModel = new ClientDatabaseViewModel(clientDatabaseDTO);

    return (
        <Card>
            <CardHeader>{clientDatabaseViewModel.databaseName}</CardHeader>
            <CardDescription>{clientDatabaseViewModel.databaseName}</CardDescription>
        </Card>
    );
}
