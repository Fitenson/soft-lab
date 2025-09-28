// import { Fragment } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { Tabs, TabsContent, TabsTrigger ,TabsList } from "@/components/ui/tabs.tsx";

import useApiTestForm from "@/pages/backend/api_test/presentation/hooks/useApiTestForm.ts";
import ApiTestFormField from "@/pages/backend/api_test/presentation/form/ApiTestFormField.ts";
import type { ApiTestDTO } from "@/pages/backend/api_test/data/dto/ApiTestDTO.ts";
import DocumentationTab from "@/pages/backend/api_test/presentation/components/documentation-tab.tsx";
import DataTab from "@/pages/backend/api_test/presentation/components/data-tab.tsx";
import ScenarioTab from "@/pages/backend/api_test/presentation/components/scenario-tab.tsx";


export default function TestCaseForm({ apiTestDTO }: { apiTestDTO?: ApiTestDTO}) {
    const { form } = useApiTestForm({ apiTestDTO: apiTestDTO });

    return (
        <div className="h-full w-full">
            <Form {...form}>
                <form>
                    <FormField
                        name={ApiTestFormField.testName.name}
                        render={({ field}) => (
                            <FormItem className="m-2">
                                <FormLabel>{ApiTestFormField.testName.label}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

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
