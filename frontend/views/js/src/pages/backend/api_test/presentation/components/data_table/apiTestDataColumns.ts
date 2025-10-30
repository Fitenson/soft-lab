import { createColumn } from "@/core/presentation/table/ColumnConfig";
import type { ColumnDef } from "@tanstack/react-table";
import ApiTestDataFormField from "@/pages/backend/api_test/presentation/form/ApiTestDataFormField.ts";
import type ApiTestDataViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestDataViewModel.ts";
import {createBooleanCheckboxCell} from "@/components/ui/data-table-cell.tsx";


export const apiTestDataColumns: ColumnDef<ApiTestDataViewModel>[] = [
    createColumn<ApiTestDataViewModel>({
        accessorKey: ApiTestDataFormField.enabled.name,
        header: null,
        size: 44,
        minSize: 36,
        maxSize: 64,
        enableSorting: false,
        cell: createBooleanCheckboxCell<ApiTestDataViewModel>(
            ({ row, next }) => {
                console.log(row);
                console.log(next);
            },
            {
                // disabled: (r) => r.locked === true,
                // ariaLabel: (r) => `Toggle enabled for ${r.name ?? "row"}`
            }
        ),
    }),
    createColumn<ApiTestDataViewModel>({
        accessorKey: ApiTestDataFormField.key.name,
        header: ApiTestDataFormField.key.label,
        enableSorting: false,
    }),
    createColumn<ApiTestDataViewModel>({
        accessorKey: ApiTestDataFormField.value.name,
        header: ApiTestDataFormField.value.label,
        enableSorting: false,
    }),
    createColumn<ApiTestDataViewModel>({
        accessorKey: ApiTestDataFormField.description.name,
        header: ApiTestDataFormField.description.label,
        enableSorting: false,
    }),
];
