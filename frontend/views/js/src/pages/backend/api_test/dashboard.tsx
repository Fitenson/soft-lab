import AppLayout from "@/layouts/app-layout.tsx";
import { Head } from "@inertiajs/react";
import ApiTestLayout from "@/pages/backend/api_test/presentation/layouts/api-test-layout.tsx";
import TestCaseSidebar from "@/pages/backend/api_test/presentation/components/test-case-sidebar.tsx";
import TestCaseForm from "@/pages/backend/api_test/presentation/components/test-case-form.tsx";
import TestCaseOutput from "@/pages/backend/api_test/presentation/components/test-case-output.tsx";
import { useQuery } from "@tanstack/react-query";
import useApiTestService from "@/pages/backend/api_test/domain/service/useApiTestService.ts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    loadApiTests,
    removeApiTests as removeApiTestAction, updateApiTests
} from "@/pages/backend/api_test/presentation/redux/apiTestSlice.ts";
import {FormProvider} from "react-hook-form";
import useApiTestForm from "@/pages/backend/api_test/presentation/hooks/useApiTestForm.ts";
import {useAppSelector} from "@/core/presentation/store/useAppSelector.ts";
import {selectSelectedApiTest} from "@/pages/backend/api_test/presentation/redux/apiTestSelectors.ts";
import {Form} from "@/components/ui/form.tsx";
import type {ApiTestDataDTO} from "@/pages/backend/api_test/data/dto/ApiTestDataDTO.ts";
import type {ApiTestDTO} from "@/pages/backend/api_test/data/dto/ApiTestDTO.ts";
import {
    clearSelectedNode,
    setSelectedApiTest,
    triggerMenuAction
} from "@/pages/backend/api_test/presentation/redux/apiTestUISlice.ts";
import { selectClientDatabase } from "@/pages/backend/client_database/presentation/redux/clientDatabaseSelectors.ts";
import useShowToast from "@/hooks/use-show-toast.ts";


export default function Dashboard() {
    const dispatch = useDispatch();
    const { indexApiTest, createApiTest, updateApiTest } = useApiTestService();
    const selectedApiTestDTO = useAppSelector(selectSelectedApiTest);
    const clientDatabase = useAppSelector(selectClientDatabase);
    const { form } = useApiTestForm({ apiTestDTO: selectedApiTestDTO });
    const showToast = useShowToast();

    const { data }= useQuery({
        queryKey: ["/backend/api_test/index"],
        queryFn: async () => await indexApiTest(),
        enabled: true,
    });


    useEffect(() => {
        if(data) {
            dispatch(loadApiTests(data));
        }
    }, [dispatch, data]);


    const submit = async () => {
        try {
            if(selectedApiTestDTO &&
                clientDatabase &&
                clientDatabase.password
            ) {
                const formValues = form.getValues("apiTestData") as Partial<ApiTestDataDTO>[];

                const apiTestDataDTO: Partial<ApiTestDataDTO>[] = formValues.map(data => ({
                    apiTest: selectedApiTestDTO.UUID,
                    enabled: data.enabled ?? 0,
                    key: data.key ?? "",
                    value: data.value ?? "",
                    description: data.description ?? "",
                    fieldType: data.fieldType ?? "",
                }));

                const newApiTestDTO: Partial<ApiTestDTO> = {
                    ...form.getValues(),
                    UUID: selectedApiTestDTO.UUID,
                    project: clientDatabase.project,
                    clientDatabase: clientDatabase.UUID,
                    apiTestData: apiTestDataDTO as ApiTestDataDTO[] ?? []
                }

                const UUIDs = [selectedApiTestDTO?.UUID].filter(
                    (UUID): UUID is string => UUID !== undefined
                );

                if(selectedApiTestDTO.isNew) {
                    await createApiTest({
                        apiTestDTO: newApiTestDTO,
                        clientDatabaseToken: clientDatabase.password
                    }, {
                        onSuccess: (newApiTestViewModel) => {
                            dispatch(removeApiTestAction(UUIDs));
                            dispatch(updateApiTests(newApiTestViewModel));
                            dispatch(triggerMenuAction({ action: null }));
                            dispatch(setSelectedApiTest(newApiTestViewModel.apiTestDTO));
                        },
                        onError: (error) => {
                            console.error(error);
                            showToast("Error", "Failed to create test case", "error");
                            dispatch(clearSelectedNode());
                            dispatch(triggerMenuAction({ action: null }));
                            dispatch(removeApiTestAction(UUIDs));
                        }
                    });
                } else {

                    await updateApiTest({
                        apiTestDTO: newApiTestDTO,
                        clientDatabaseToken: clientDatabase.password
                    }, {
                        onSuccess: (newApiTestViewModel) => {
                            dispatch(removeApiTestAction(UUIDs));
                            dispatch(updateApiTests(newApiTestViewModel));
                            dispatch(triggerMenuAction({ action: null }));
                            dispatch(setSelectedApiTest(newApiTestViewModel.apiTestDTO));
                        },
                        onError: (error) => {
                            console.error(error);
                            showToast("Error", "Failed to create test case", "error");
                            dispatch(clearSelectedNode());
                            dispatch(triggerMenuAction({ action: null }));
                            dispatch(removeApiTestAction(UUIDs));
                        }
                    });
                }
            } else {
                throw new Error("Missing Client Database Token");
            }
        } catch(error) {
            console.error(error);
            const message = error instanceof Error ?
                error.message : typeof error === "string" ?
                    error : "Unexpected error occurred";

            showToast("Error", message, "error");
        }
    }


    return (
        <AppLayout>
            <Head title={"API Test"} />

            <ApiTestLayout>
                <FormProvider {...form}>
                    <div className="w-60 border-none flex-shrink-0 mx-2">
                        <TestCaseSidebar/>
                    </div>

                    <div className="flex-1 flex flex-coloverflow-auto w-full">
                        <div className="flex flex-1 space-x-2">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(submit)}
                                    className="grid grid-cols-1 md:grid-cols-5 gap-2 w-full">
                                    <div className="border rounded-lg p-4 md:col-span-3">
                                        <TestCaseForm />
                                    </div>
                                    <div className="border rounded-lg p-4 md:col-span-2">
                                        <TestCaseOutput />
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </FormProvider>
            </ApiTestLayout>
        </AppLayout>
    );
}
