import { createColumn } from "@/core/presentation/table/ColumnConfig";
import type { ColumnDef } from "@tanstack/react-table";
import ApiTestDataFormField from "@/pages/backend/api_test/presentation/form/ApiTestDataFormField.ts";
import type ApiTestDataViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestDataViewModel.ts";


export const apiTestDataColumns: ColumnDef<ApiTestDataViewModel>[] = [
    createColumn<ApiTestDataViewModel>({ accessorKey: ApiTestDataFormField.enabled.name, header: ApiTestDataFormField.enabled.label }),
    createColumn<ApiTestDataViewModel>({ accessorKey: ApiTestDataFormField.key.name, header: ApiTestDataFormField.key.label }),
    createColumn<ApiTestDataViewModel>({ accessorKey: ApiTestDataFormField.value.name, header: ApiTestDataFormField.value.label }),
    createColumn<ApiTestDataViewModel>({ accessorKey: ApiTestDataFormField.description.name, header: ApiTestDataFormField.description.label }),
];
