import type { ColumnDef } from "@tanstack/react-table";
import { createColumn } from "@/core/presentation/table/ColumnConfig";
import DepartmentFormField from "@/pages/department/presentation/form/DepartmentFormField.ts";
import DepartmentViewModel from "@/pages/department/presentation/view-models/DepartmentViewModel.ts";


export const columns: ColumnDef<DepartmentViewModel>[] = [
    createColumn<DepartmentViewModel>({ accessorKey: DepartmentFormField.departmentID.name, header: DepartmentFormField.departmentID.label }),
    createColumn<DepartmentViewModel>({ accessorKey: DepartmentFormField.departmentName.name, header: DepartmentFormField.departmentName.label }),
    createColumn<DepartmentViewModel>({ accessorKey: DepartmentFormField.headDepartmentName.name, header: DepartmentFormField.headDepartmentName.label }),
    createColumn<DepartmentViewModel>({ accessorKey: DepartmentFormField.description.name, header: DepartmentFormField.description.label }),
];
