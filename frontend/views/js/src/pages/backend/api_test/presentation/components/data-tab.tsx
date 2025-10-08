import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import ApiTestFormField from "@/pages/backend/api_test/presentation/form/ApiTestFormField";
import useApiTestForm from "@/pages/backend/api_test/presentation/hooks/useApiTestForm";
import { selectSelectedApiTest } from "../redux/apiTestSelectors";
import ApiTestDataTable from "@/pages/backend/api_test/presentation/components/data_table/api-test-data-table.tsx";


export default function DataTab() {
    const selectedApiTestDTO = useAppSelector(selectSelectedApiTest);
    const { form } = useApiTestForm({ apiTestDTO: selectedApiTestDTO });


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
                <ApiTestDataTable />
            </div>
        </div>
    );
}
