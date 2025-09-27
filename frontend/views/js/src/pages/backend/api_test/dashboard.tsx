import AppLayout from "@/layouts/app-layout.tsx";
import { Head } from "@inertiajs/react";
import ApiTestLayout from "@/pages/backend/api_test/presentation/layouts/api-test-layout.tsx";
import TestCaseSidebar from "@/pages/backend/api_test/presentation/components/test-case-sidebar.tsx";
import TestCaseForm from "@/pages/backend/api_test/presentation/components/test-case-form.tsx";
import TestCaseOutput from "@/pages/backend/api_test/presentation/components/test-case-output.tsx";
// import {useQuery} from "@tanstack/react-query";
// import useApiTestService from "@/pages/backend/api_test/domain/service/useApiTestService.ts";


export default function Dashboard() {
    // const { indexApiTest } = useApiTestService();

    // const { data, refetch }= useQuery({
    //     queryKey: ["/backend/api_test/index"],
    //     queryFn: async () => indexApiTest,
    //     enabled: true,
    // });


    return (
        <AppLayout>
            <Head title={"API Test"} />

            <ApiTestLayout>
                <div className="grid grid-cols-10">
                    <TestCaseSidebar/>

                    <div className="col-span-6 p-2">
                        <TestCaseForm/>
                        <TestCaseOutput/>
                    </div>
                </div>
            </ApiTestLayout>
        </AppLayout>
    );
}
