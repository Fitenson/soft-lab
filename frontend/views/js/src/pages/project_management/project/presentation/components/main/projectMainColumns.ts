import type { ColumnDef } from "@tanstack/react-table";
import { createColumn } from "@/core/presentation/table/ColumnConfig.tsx";
import { CommonDataTableField } from "@/core/presentation/table/CommonField.tsx";
import type ProjectViewModel from "@/pages/project_management/project/presentation/view_models/ProjectViewModel.ts";
import ProjectFormField from "@/pages/project_management/project/presentation/form/ProjectFormField.ts";


export const projectMainColumns: ColumnDef<ProjectViewModel>[] = [
    createColumn<ProjectViewModel>({ accessorKey: ProjectFormField.projectCode.name, header: ProjectFormField.projectCode.label }),
    createColumn<ProjectViewModel>({ accessorKey: ProjectFormField.projectName.name, header: ProjectFormField.projectName.label }),
    createColumn<ProjectViewModel>({ accessorKey: ProjectFormField.description.name, header: ProjectFormField.description.label }),
    createColumn<ProjectViewModel>({ accessorKey: ProjectFormField.secondDescription.name, header: ProjectFormField.secondDescription.label }),
    createColumn<ProjectViewModel>({ accessorKey: ProjectFormField.moreDescription.name, header: ProjectFormField.moreDescription.label }),
    createColumn<ProjectViewModel>({ accessorKey: CommonDataTableField.createdByName.name, header: CommonDataTableField.createdByName.label }),
    createColumn<ProjectViewModel>({ accessorKey: CommonDataTableField.createdAtFormat.name, header: CommonDataTableField.createdAtFormat.label }),
    createColumn<ProjectViewModel>({ accessorKey: CommonDataTableField.updatedByName.name, header: CommonDataTableField.updatedByName.label }),
    createColumn<ProjectViewModel>({ accessorKey: CommonDataTableField.updatedAtFormat.name, header: CommonDataTableField.updatedAtFormat.label }),
];
