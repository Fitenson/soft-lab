import { useEffect } from "react";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";
import { useDispatch } from "react-redux";

import { Input } from "@/components/ui/input.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { Tabs, TabsContent, TabsTrigger ,TabsList } from "@/components/ui/tabs.tsx";

import useApiTestForm from "@/pages/backend/api_test/presentation/hooks/useApiTestForm.ts";
import ApiTestFormField from "@/pages/backend/api_test/presentation/form/ApiTestFormField.ts";
import DocumentationTab from "@/pages/backend/api_test/presentation/components/documentation-tab.tsx";
import DataTab from "@/pages/backend/api_test/presentation/components/data-tab.tsx";
import ScenarioTab from "@/pages/backend/api_test/presentation/components/scenario-tab.tsx";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import { Button } from "@/components/ui/button";
import {
    selectSelectedApiTest,
    // selectSelectedApiTestEntity, selectTestName
} from "@/pages/backend/api_test/presentation/redux/apiTestSelectors.ts";
import {
    setRenameSelectedApiTest, setSelectedApiTest,
    triggerMenuAction
} from "@/pages/backend/api_test/presentation/redux/apiTestUISlice.ts";
import type {ApiTestFormModel} from "@/pages/backend/api_test/presentation/schema/apiTestSchema.ts";
import useApiTestService from "@/pages/backend/api_test/domain/service/useApiTestService.ts";
import { selectClientDatabase } from "@/pages/backend/client_database/presentation/redux/clientDatabaseSelectors.ts";
import useShowToast from "@/hooks/use-show-toast.ts";
import {
    removeApiTests as removeApiTestAction, renameApiTest,
    updateApiTests
} from "@/pages/backend/api_test/presentation/redux/apiTestSlice.ts";
import type { ApiTestDTO } from "@/pages/backend/api_test/data/dto/ApiTestDTO.ts";


interface PageProps extends InertiaPageProps {
    id: string;
}


export default function TestCaseForm() {
    const { id: projectUUID } = usePage<PageProps>().props;
    const selectedApiTestDTO = useAppSelector(selectSelectedApiTest);
    const selectedClientDatabase = useAppSelector(selectClientDatabase);
    const { form } = useApiTestForm({ apiTestDTO: selectedApiTestDTO });
    const dispatch = useDispatch();
    const {
        createApiTest: createApiTestService
    } = useApiTestService();
    const showToast = useShowToast();


    useEffect(() => {
        form.setValue("testName", selectedApiTestDTO?.testName ?? "");
        form.setValue("transmission", selectedApiTestDTO?.transmission ?? "formData");
    }, [selectedApiTestDTO, form]);


    const submit = async (formValues: ApiTestFormModel) => {
        const clientDatabaseToken = selectedClientDatabase?.password;
        const clientDatabase = selectedClientDatabase?.UUID;

        const UUIDs = [selectedApiTestDTO?.UUID].filter(
            (UUID): UUID is string => UUID !== undefined
        );

        if(clientDatabase && clientDatabaseToken) {
            const apiTestDTO: Partial<ApiTestDTO> = {
                ...formValues,
                project: projectUUID,
                clientDatabase: clientDatabase,
            };

            await createApiTestService(apiTestDTO, clientDatabaseToken, {
                onSuccess: async (newApiTestViewModel) => {
                    dispatch(removeApiTestAction(UUIDs));
                    dispatch(updateApiTests(newApiTestViewModel));
                    dispatch(triggerMenuAction({ action: null }));
                    dispatch(renameApiTest({ UUID: "", newName: "" }));
                    dispatch(setSelectedApiTest(newApiTestViewModel));
                }
            });
        } else {
            dispatch(removeApiTestAction(UUIDs));
            showToast("Error", "Missing database token", "error");
        }
    }


    return (
        <div className="h-full w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <div className="flex items-end gap-2 m-2">
                            <FormField
                                name={ApiTestFormField.testName.name}
                                render={({ field}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>{ApiTestFormField.testName.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    dispatch(setRenameSelectedApiTest(e.target.value));
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button className="p-2 px-6">Save</Button>
                        </div>

                        <Tabs className="w-full m-2" defaultValue={"data"}>
                            <TabsList className="w-full flex justify-start">
                                <TabsTrigger className="cursor-pointer" value={"documentation"}>Documentation</TabsTrigger>
                                <TabsTrigger className="cursor-pointer" value={"data"}>Data</TabsTrigger>
                                <TabsTrigger className="cursor-pointer" value={"scenario"}>Scenario</TabsTrigger>
                            </TabsList>

                            <TabsContent value={"documentation"} className="m-2">
                                <DocumentationTab />
                            </TabsContent>
                            <TabsContent value={"data"} className="m-2">
                                <DataTab />
                            </TabsContent>
                        <TabsContent value={"scenario"} className="m-2">
                            <ScenarioTab/>
                        </TabsContent>
                    </Tabs>
                </form>
            </Form>
        </div>
    );
}
