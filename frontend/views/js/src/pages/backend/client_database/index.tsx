import breadcrumbItems from "@/components/app/breadcrumb-items";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import ClientDatabaseLayout from "./presentation/layouts/client-database-layout";
import DatabaseCard from "./presentation/components/database-card.tsx";
import { useQuery } from "@tanstack/react-query";
import ClientDatabaseViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseViewModel";
import useClientDatabaseService from "@/pages/backend/client_database/domain/service/useClientDatabaseService";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {FaPlus} from "react-icons/fa";


export default function ClientDatabaseIndex() {
    const breadcrumbs: BreadcrumbItem[] = [
        ...(breadcrumbItems ?? []),
        { title: "Database", href: "/backend/client-database"}
    ];


    const { indexClientDatabase } = useClientDatabaseService();

    const { data } = useQuery({
        queryKey: ["/backend/client-database"],
        queryFn: async () => indexClientDatabase(),
        enabled: false
    });


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Database" />

            <ClientDatabaseLayout>
                <section>
                    <Card>
                        <CardContent><FaPlus size={24} /></CardContent>
                    </Card>
                    {data?.rows.map((clientDatabaseViewModel: ClientDatabaseViewModel) => (
                        <DatabaseCard clientDatabaseViewModel={clientDatabaseViewModel} />
                    ))}
                </section>
            </ClientDatabaseLayout>
        </AppLayout>
    );
}
