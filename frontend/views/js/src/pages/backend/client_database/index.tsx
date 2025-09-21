import breadcrumbItems from "@/components/app/breadcrumb-items";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import ClientDatabaseLayout from "./presentation/layouts/client-database-layout";
import DatabaseCard from "./presentation/components/database-card.tsx";
import { FaPlus } from "react-icons/fa";
import type {ClientDatabaseDTO} from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO.ts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import DatabaseDialog from "./presentation/components/database-dialog.tsx";


type Props = {
    total: string;
    rows: ClientDatabaseDTO[]
};

export default function ClientDatabaseIndex() {
    const [isOpenDialog, setIsOpenDialog] = useState<string | null>(null);

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
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant={"outline"}
                            className="flex items-center justify-center h-32 w-32 m-2"
                            onClick={() => setIsOpenDialog("create")}
                        >
                            <FaPlus size={32} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add new connection</p>
                    </TooltipContent>
                </Tooltip>

                <DatabaseDialog
                    clientDatabaseDTO={undefined}
                    open={isOpenDialog === "create"}
                    onOpenChange={(open) => !open && setIsOpenDialog(null)}
                />

                <div className="grid grid-cols-6 grid-rows-2 gap-4 w-full h-full border-2 border-accent dark:border-accent p-2 rounded-2xl">
                    {rows.map((clientDatabaseDTO: ClientDatabaseDTO) => (
                        <DatabaseCard clientDatabaseDTO={clientDatabaseDTO} />
                    ))}
                </div>
            </ClientDatabaseLayout>
        </AppLayout>
    );
}
