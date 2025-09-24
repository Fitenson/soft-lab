import AppLayout from "@/layouts/app-layout.tsx";
import {Head} from "@inertiajs/react";
import ApiTestLayout from "@/pages/backend/api_test/presentation/layouts/api-test-layout.tsx";
import TestCaseSidebar from "@/pages/backend/api_test/presentation/components/test-case-sidebar.tsx";
import TestCaseForm from "@/pages/backend/api_test/presentation/components/test-case-form.tsx";
import TestCaseOutput from "@/pages/backend/api_test/presentation/components/test-case-output.tsx";


export default function ApiTestDashboard() {
    return (
        <AppLayout>
            <Head title={"API Test"} />

            <ApiTestLayout>
                <div className="grid grid-cols-8">
                    <TestCaseSidebar/>

                    <div className="col-span-6">
                        <TestCaseForm/>
                        <TestCaseOutput/>
                    </div>
                </div>
            </ApiTestLayout>
        </AppLayout>
    );
}