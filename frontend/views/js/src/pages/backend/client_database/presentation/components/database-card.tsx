import {Card, CardDescription, CardHeader} from "@/components/ui/card.tsx";
import type ClientDatabaseViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseViewModel.ts";


export default function DatabaseCard({ clientDatabaseViewModel }: { clientDatabaseViewModel: ClientDatabaseViewModel }) {
    return (
        <Card>
            <CardHeader>{clientDatabaseViewModel.databaseName}</CardHeader>
            <CardDescription>{clientDatabaseViewModel.databaseName}</CardDescription>
        </Card>
    );
}
