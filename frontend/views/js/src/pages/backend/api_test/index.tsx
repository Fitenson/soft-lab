import AppLayout from "@/layouts/app-layout.tsx";
import {Head} from "@inertiajs/react";
import ApiTestLayout from "@/pages/backend/api_test/presentation/layouts/api-test-layout.tsx";


export default function ApiTestIndex() {
    return (
        <AppLayout>
            <Head title="API Test Case" />

            <ApiTestLayout>

            </ApiTestLayout>
        </AppLayout>
    );
}