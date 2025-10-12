import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ApiTestFormField from "@/pages/backend/api_test/presentation/form/ApiTestFormField";
import ApiTestDataTable from "@/pages/backend/api_test/presentation/components/data_table/api-test-data-table.tsx";
import { useFormContext } from "react-hook-form";
import type {ApiTestFormModel} from "@/pages/backend/api_test/presentation/schema/apiTestSchema.ts";


export default function DataTab() {
    const form = useFormContext<ApiTestFormModel>();


    return (
        <div className="grid grid-cols-2 w-full space-y-2">
            <div className="col-span-2">
                <FormField
                    name={ApiTestFormField.transmission.name}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Content Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="formData">Form Data</SelectItem>
                                        <SelectItem value="json">JSON</SelectItem>
                                        <SelectItem value="jsonString">JSON String</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>

            {/* <FormField
                name={ApiTestFormField.data.name}
                control={form.control}
                render={({ field}) => (
                    <FormItem>
                        <FormControl>
                        </FormControl>
                    </FormItem>
                )}
            /> */}

            <div className="col-span-2">
                <ApiTestDataTable form={form} />
            </div>
        </div>
    );
}
