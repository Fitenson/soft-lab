import AppLayout from "@/layouts/app-layout.tsx";
import { Head, usePage } from "@inertiajs/react";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import ApiTestLayout from "@/pages/backend/api_test/presentation/layouts/api-test-layout.tsx";
import TestCaseSidebar from "@/pages/backend/api_test/presentation/components/test-case-sidebar.tsx";
import TestCaseForm from "@/pages/backend/api_test/presentation/components/test-case-form.tsx";
import TestCaseOutput from "@/pages/backend/api_test/presentation/components/test-case-output.tsx";
import {useQuery} from "@tanstack/react-query";
import useApiTestService from "@/pages/backend/api_test/domain/service/useApiTestService.ts";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {loadApiTests} from "@/pages/backend/api_test/presentation/redux/apiTestSlice.ts";


interface PageProps extends InertiaPageProps {
    id?: string
}


export default function Dashboard() {
    const { id } = usePage<PageProps>().props;
    const dispatch = useDispatch();
    const { indexApiTest } = useApiTestService();

    const { data }= useQuery({
        queryKey: ["/backend/api_test/index"],
        queryFn: async () => await indexApiTest(),
        enabled: true,
    });


    useEffect(() => {
        if(data) {
            dispatch(loadApiTests(data));
        }

        console.log('ID: ', id);
    }, [dispatch, data, id]);


    return (
        <AppLayout>
            <Head title={"API Test"} />

            <ApiTestLayout>
                <div className="w-64 border-none flex-shrink-0 mx-2">
                    <TestCaseSidebar/>
                </div>

                <div className="flex-1 flex flex-coloverflow-auto w-full">
                    <div className="flex flex-1 space-x-2">
                        <div className="flex-1 border rounded">
                            <TestCaseForm/>
                        </div>
                        <div className="flex-1 border rounded">
                            <TestCaseOutput/>
                        </div>
                    </div>
                </div>
            </ApiTestLayout>
        </AppLayout>
    );
}
