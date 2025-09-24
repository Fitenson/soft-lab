import type { ColumnDef } from "@tanstack/react-table";
import { createColumn } from "@/core/presentation/table/ColumnConfig.tsx";
import { CommonDataTableField } from "@/core/presentation/table/CommonField.tsx";
import type DepartmentViewModel from "@/pages/department/presentation/view-models/DepartmentViewModel.ts";
import DepartmentFormField from "@/pages/department/presentation/form/DepartmentFormField.ts";
import type ProjectViewModel from "@/pages/project_management/project/presentation/view_models/ProjectViewModel.ts";
import ProjectFormField from "@/pages/project_management/project/presentation/form/ProjectFormField.ts";


export const departmentDropdownColumns: ColumnDef<DepartmentViewModel>[] = [
    createColumn<DepartmentViewModel>({ accessorKey: DepartmentFormField.departmentID.name, header: DepartmentFormField.departmentID.label }),
    createColumn<DepartmentViewModel>({ accessorKey: DepartmentFormField.departmentID.name, header: DepartmentFormField.departmentName.label }),
    createColumn<DepartmentViewModel>({ accessorKey: DepartmentFormField.headDepartmentName.name, header: DepartmentFormField.headDepartmentName.label }),

    createColumn<DepartmentViewModel>({ accessorKey: CommonDataTableField.createdAtFormat.name, header: CommonDataTableField.createdAtFormat.label }),
    createColumn<DepartmentViewModel>({ accessorKey: CommonDataTableField.createdByName.name, header: CommonDataTableField.createdByName.label }),
    createColumn<DepartmentViewModel>({ accessorKey: CommonDataTableField.updatedAtFormat.name, header: CommonDataTableField.updatedAtFormat.label }),
    createColumn<DepartmentViewModel>({ accessorKey: CommonDataTableField.updatedAtFormat.name, header: CommonDataTableField.updatedAtFormat.label }),
];


export const projectDropdownColumns: ColumnDef<ProjectViewModel>[] = [
    createColumn({ header: ProjectFormField.projectCode.label, accessorKey: ProjectFormField.projectCode.name }),
    createColumn({ header: ProjectFormField.projectName.label, accessorKey: ProjectFormField.projectName.name }),
]
