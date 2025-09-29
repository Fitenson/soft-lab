import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import ApiTestFormField from "@/pages/backend/api_test/presentation/form/ApiTestFormField";
import useApiTestForm from "@/pages/backend/api_test/presentation/hooks/useApiTestForm";
import { selectSelectedApiTest } from "../redux/apiTestSelectors";
// import { useReactTable } from "@tanstack/react-table";


export default function DataTab() {
    const selectedApiTestViewModel = useAppSelector(selectSelectedApiTest);
    const { form } = useApiTestForm({ apiTestViewModel: selectedApiTestViewModel });
    // const table = useReactTable({
        
    // });


    return (
        <div className="grid grid-cols-2 w-full">
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
        </div>
    );
}
