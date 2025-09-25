import AppLayout from "@/layouts/app-layout.tsx";
import { Head } from "@inertiajs/react";
import ApiTestLayout from "@/pages/backend/api_test/presentation/layouts/api-test-layout.tsx";
import type { BreadcrumbItem } from "@/types";


export default function ApiTestIndex() {
    const breadcrumbItems: BreadcrumbItem[] = [
        {
            title: "API Test Case",
            href: "/backend/api-test"
        }
    ];


    return (
        <AppLayout breadcrumbs={breadcrumbItems}>
            <Head title="API Test Case" />
            <ApiTestLayout>

            </ApiTestLayout>
        </AppLayout>
    );
}
