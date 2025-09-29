import { createColumn } from "@/core/presentation/table/ColumnConfig";
import type { ColumnDef } from "@tanstack/react-table";
import DataFormField from "@/pages/backend/api_test/presentation/form/DataFormField";


export const dataColumns: ColumnDef<{ 
    enabled: number, 
    key?: string, 
    value?: string 
}>[] = [
    createColumn({ accessorKey: DataFormField.enabled.name, header: DataFormField.enabled.label }),
    createColumn({ accessorKey: DataFormField.key.name, header: DataFormField.key.label }),
    createColumn({ accessorKey: DataFormField.value.name, header: DataFormField.value.label }),
];
