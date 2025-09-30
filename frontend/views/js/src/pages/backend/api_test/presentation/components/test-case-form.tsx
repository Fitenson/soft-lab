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
import {setRenameSelectedApiTest} from "@/pages/backend/api_test/presentation/redux/apiTestUISlice.ts";
import {useDispatch} from "react-redux";
import {useEffect} from "react";


export default function TestCaseForm() {
    const selectedApiTestDTO = useAppSelector(selectSelectedApiTest);
    const { form } = useApiTestForm({ apiTestDTO: selectedApiTestDTO });
    const dispatch = useDispatch();


    useEffect(() => {
        form.setValue("testName", selectedApiTestDTO?.testName ?? "");
    }, [selectedApiTestDTO, form])


    return (
        <div className="h-full w-full">
            <Form {...form}>
                <form>
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

                    <Tabs className="w-full m-2" defaultValue={"documentation"}>
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
