import breadcrumbItems from "@/components/app/breadcrumb-items";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem, DataTableType } from "@/types";
import { Head } from "@inertiajs/react";
import ClientDatabaseLayout from "./presentation/layouts/client-database-layout";
import DatabaseCard from "./presentation/components/main/database-card";
// import type ClientDatabaseViewModel from "@/pages/backend/client_database/view_models/ClientDatabaseViewModel";
import type { ClientDatabaseDTO } from "./data/dto/ClientDatabaseDTO";
// import useClientDatabaseService from "@/pages/backend/client_database/domain/service/useClientDatabaseService";
// import { useQuery } from "@tanstack/react-query";


export default function ClientDatabaseIndex() {
    const breadcrumbs: BreadcrumbItem[] = [
        ...(breadcrumbItems ?? []),
        { title: "Database", href: "/backend/client-database"}
    ];

    const data: DataTableType<ClientDatabaseDTO> = {
        total: "3",
        rows: [
            {
                UUID: "12618726172",
                databaseName: "Shin Yang",
                databaseSchema: "1ofis2",
                host: "192",
                port: "3306",
                username: "root",
                password: "12345678",
                refreshToken: "12178635123",
                valid: true
            }
        ]
    };

    // const { indexClientDatabase } = useClientDatabaseService();

    // const { data } = useQuery({
    //     queryKey: ["/backend/client-database"],
    //     queryFn: async () => indexClientDatabase(),
    //     enabled: false
    // });


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Database" />

            <ClientDatabaseLayout>
                <section>
                    {data.rows.map((clientDatabase) => {
                        return <DatabaseCard/>
                    })}
                    
                </section>
            </ClientDatabaseLayout>
        </AppLayout>
    );
}
