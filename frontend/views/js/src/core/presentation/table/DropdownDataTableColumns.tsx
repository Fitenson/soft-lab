import type { ColumnDef } from "@tanstack/react-table";
import { createColumn } from "@/core/presentation/table/ColumnConfig.tsx";
import { CommonDataTableField } from "@/core/presentation/table/CommonField.tsx";
import type DepartmentViewModel from "@/pages/department/presentation/view-models/DepartmentViewModel.ts";
import DepartmentFormField from "@/pages/department/presentation/form/DepartmentFormField.ts";


export const departmentDropdownColumns: ColumnDef<DepartmentViewModel>[] = [
    createColumn<DepartmentViewModel>({ accessorKey: DepartmentFormField.departmentID.name, header: DepartmentFormField.departmentID.label }),
    createColumn<DepartmentViewModel>({ accessorKey: DepartmentFormField.departmentID.name, header: DepartmentFormField.departmentName.label }),
    createColumn<DepartmentViewModel>({ accessorKey: DepartmentFormField.headDepartmentName.name, header: DepartmentFormField.headDepartmentName.label }),

    createColumn<DepartmentViewModel>({ accessorKey: CommonDataTableField.createdAtFormat.name, header: CommonDataTableField.createdAtFormat.label }),
    createColumn<DepartmentViewModel>({ accessorKey: CommonDataTableField.createdByName.name, header: CommonDataTableField.createdByName.label }),
    createColumn<DepartmentViewModel>({ accessorKey: CommonDataTableField.updatedAtFormat.name, header: CommonDataTableField.updatedAtFormat.label }),
    createColumn<DepartmentViewModel>({ accessorKey: CommonDataTableField.updatedAtFormat.name, header: CommonDataTableField.updatedAtFormat.label }),
];
