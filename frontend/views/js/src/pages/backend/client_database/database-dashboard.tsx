import AppLayout from "@/layouts/app-layout.tsx";
import { Head } from "@inertiajs/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientDatabaseLayout from "@/pages/backend/client_database/presentation/layouts/client-database-layout.tsx";
import DatabaseSchemaTab from "@/pages/backend/client_database/presentation/components/tabs/database-schema-tab.tsx";
import ErdDiagramTab from "@/pages/backend/client_database/presentation/components/tabs/erd-diagram-tab.tsx";
import breadcrumbItems from "@/components/app/breadcrumb-items.tsx";
import { useAppSelector } from "@/core/presentation/store/useAppSelector.ts";


export default function DatabaseDashboard() {
    const clientDatabaseViewModel = useAppSelector(state => state.clientDatabase.clientDatabase);

    const breadcrumbs = [
        ...(breadcrumbItems ?? []),
        { title: "Database", href: "/backend/client-database/" },
        { title: clientDatabaseViewModel?.databaseName ?? "", href: "/backend/client-database/" },
    ];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Database" />

            <ClientDatabaseLayout>
                <Tabs className="w-full" defaultValue="database-schema">
                    <TabsList className="w-full flex justify-center">
                        <TabsTrigger className="cursor-pointer" value="database-schema">Database Schema</TabsTrigger>
                        <TabsTrigger className="cursor-pointer" value="erd-diagram">ERD Diagram</TabsTrigger>
                    </TabsList>

                    <TabsContent value="database-schema" className="m-2">
                        <DatabaseSchemaTab />
                    </TabsContent>
                    <TabsContent value="erd-diagram" className="m-2">
                        <ErdDiagramTab />
                    </TabsContent>
                </Tabs>
            </ClientDatabaseLayout>
        </AppLayout>
    );
}
