import breadcrumbItems from "@/components/app/breadcrumb-items";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types";
import {Head, usePage} from "@inertiajs/react";
import ClientDatabaseLayout from "./presentation/layouts/client-database-layout";
import DatabaseCard from "./presentation/components/database-card.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {FaPlus} from "react-icons/fa";
import type {ClientDatabaseDTO} from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO.ts";


type Props = {
    total: string;
    rows: ClientDatabaseDTO[]
};

export default function ClientDatabaseIndex() {
    const breadcrumbs: BreadcrumbItem[] = [
        ...(breadcrumbItems ?? []),
        { title: "Backend", href: "/backend"},
        { title: "Database", href: "/backend/client-database"},
    ];

    const { rows } = usePage<Props>().props;


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Database" />

            <ClientDatabaseLayout>
                <Card>
                    <CardContent><FaPlus size={24} /></CardContent>
                </Card>
                {rows.map((clientDatabaseDTO: ClientDatabaseDTO) => (
                    <DatabaseCard clientDatabaseDTO={clientDatabaseDTO} />
                ))}
            </ClientDatabaseLayout>
        </AppLayout>
    );
}
