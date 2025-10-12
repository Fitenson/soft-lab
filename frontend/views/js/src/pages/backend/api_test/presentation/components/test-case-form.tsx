import { Fragment, useEffect } from "react";

import { Input } from "@/components/ui/input.tsx";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { Tabs, TabsContent, TabsTrigger ,TabsList } from "@/components/ui/tabs.tsx";
import ApiTestFormField from "@/pages/backend/api_test/presentation/form/ApiTestFormField.ts";
import DocumentationTab from "@/pages/backend/api_test/presentation/components/documentation-tab.tsx";
import DataTab from "@/pages/backend/api_test/presentation/components/data-tab.tsx";
import ScenarioTab from "@/pages/backend/api_test/presentation/components/scenario-tab.tsx";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import { Button } from "@/components/ui/button";
import {
    selectSelectedApiTest,
} from "@/pages/backend/api_test/presentation/redux/apiTestSelectors.ts";
import type {ApiTestFormModel} from "@/pages/backend/api_test/presentation/schema/apiTestSchema.ts";
import { useFormContext } from "react-hook-form";
import { selectLoading } from "@/core/presentation/store/loadingSlice.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";


export default function TestCaseForm() {
    const isLoading = useAppSelector(selectLoading);
    const selectedApiTestDTO = useAppSelector(selectSelectedApiTest);
    const form = useFormContext<ApiTestFormModel>();


    useEffect(() => {
        form.setValue("testName", selectedApiTestDTO?.testName ?? "");
        form.setValue("transmission", selectedApiTestDTO?.transmission ?? "formData");
    }, [selectedApiTestDTO, form]);


    return (
        <div className="h-full w-full">
            {selectedApiTestDTO && (
                <Fragment>
                    <div className="flex items-end gap-2 m-2">
                        {isLoading ? (
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-24" /> {/* Label placeholder */}
                                <Skeleton className="h-9 w-full rounded-md" /> {/* Input placeholder */}
                            </div>
                        ) : (
                            <FormField
                                name={ApiTestFormField.testName.name}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>{ApiTestFormField.testName.label}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}
                        <Button
                            disabled={isLoading}
                            className="p-2 px-6"
                        >Save</Button>
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
                </Fragment>
            )}
        </div>
    );
}
