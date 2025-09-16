import type { DepartmentDTO } from "@/pages/department/data/dto/DepartmentDTO.ts";
import { useAppSelector } from "@/core/presentation/store/useAppSelector.ts";
import useDepartmentForm from "@/pages/department/presentation/hooks/useDepartmentForm.tsx";
import { Head } from "@inertiajs/react";
// import useDepartmentService from "@/pages/department/domain/service/useDepartmentService.tsx";
import breadcrumbItems from "@/components/app/breadcrumb-items.tsx";
import AppLayout from "@/layouts/app-layout.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import DepartmentLayout from "@/pages/department/presentation/layouts/department-layout.tsx";
import TopActionBar from "@/components/app/top-action-bar.tsx";
import DepartmentFormField from "@/pages/department/presentation/form/DepartmentFormField.ts";
import { Input } from "@/components/ui/input.tsx";
// import DropdownDataTable from "@/components/app/dropdown-data-table.tsx";


type Props = {
    department: DepartmentDTO
}


export default function DepartmentFormView({ department }: Props) {
    const isLoading = useAppSelector(state => state.loading.global);
    const { form, departmentViewModel } = useDepartmentForm({ departmentDTO: department });
    // const { create, update } = useDepartmentService();

    const breadcrumbs = [
        ...breadcrumbItems,
        { title: departmentViewModel?.departmentID || "Create", href: "/" },
    ];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Department" />
            <Head title={departmentViewModel?.departmentID || "Create"} />

            <DepartmentLayout>
                <Form {...form}>
                    <div className="col-span-4">
                        <TopActionBar
                            isLoading={isLoading}
                            saveAction
                            browseAction={{ to: "/department/index" }}
                            deleteAction={{ action: () => "deleteDepartment" }}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name={DepartmentFormField.departmentID.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{DepartmentFormField.departmentID.label}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={DepartmentFormField.departmentName.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{DepartmentFormField.departmentName.label}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/*<FormField*/}
                    {/*    control={form.control}*/}
                    {/*    name={DepartmentFormField.head.name}*/}
                    {/*    render={({ field }) => (*/}
                    {/*        <FormItem>*/}
                    {/*            <FormLabel>{DepartmentFormField.head.label}</FormLabel>*/}
                    {/*            <FormControl>*/}
                    {/*                <DropdownDataTable columns={} data={} onSelect={} isLoading={}*/}
                    {/*            </FormControl>*/}
                    {/*            <FormMessage/>*/}
                    {/*        </FormItem>*/}
                    {/*    )}*/}
                    {/*/>*/}
                </Form>
            </DepartmentLayout>
        </AppLayout>
    );
}
