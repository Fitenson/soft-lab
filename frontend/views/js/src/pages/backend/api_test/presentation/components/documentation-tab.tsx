import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import useApiTestForm from "@/pages/backend/api_test/presentation/hooks/useApiTestForm.ts";
import ApiTestFormField from "@/pages/backend/api_test/presentation/form/ApiTestFormField.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useAppSelector} from "@/core/presentation/store/useAppSelector.ts";
import { selectSelectedApiTest } from "@/pages/backend/api_test/presentation/redux/apiTestSelectors.ts";


export default function DocumentationTab() {
    const isLoading = useAppSelector(state => state.loading.global);
    const selectedApiTestViewModel = useAppSelector(selectSelectedApiTest);
    const { form } = useApiTestForm({ apiTestViewModel: selectedApiTestViewModel });


    return (
        <div className="w-full">
            <FormField
                control={form.control}
                name={ApiTestFormField.description.name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{ApiTestFormField.description.label}</FormLabel>
                        <FormControl>
                            <Textarea
                                {...field}
                                value={field.value ?? ""}
                                disabled={isLoading}
                                rows={4}
                                style={{  resize: 'vertical', overflowY: 'auto', maxHeight: '8rem', minHeight: '8rem' }}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={ApiTestFormField.moreDescription.name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{ApiTestFormField.moreDescription.label}</FormLabel>
                        <FormControl>
                            <Textarea
                                {...field}
                                value={field.value ?? ""}
                                disabled={isLoading}
                                rows={4}
                                style={{  resize: 'vertical', overflowY: 'auto', maxHeight: '8rem', minHeight: '8rem' }}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>
    );
}
