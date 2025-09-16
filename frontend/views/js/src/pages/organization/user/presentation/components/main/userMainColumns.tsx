import type { ColumnDef } from "@tanstack/react-table";
import { createColumn } from "@/core/presentation/table/ColumnConfig.tsx";
import UserFormField from "@/pages/organization/user/presentation/form/UserFormField.ts";
import type UserViewModel from "@/pages/organization/user/presentation/view-models/UserViewModel.ts";
import { CommonDataTableField } from "@/core/presentation/table/CommonField.tsx";


export const userMainColumns: ColumnDef<UserViewModel>[] = [
    createColumn<UserViewModel>({ accessorKey: UserFormField.fullName.name, header: UserFormField.fullName.label }),
    createColumn<UserViewModel>({ accessorKey: UserFormField.username.name, header: UserFormField.username.label }),
    createColumn<UserViewModel>({ accessorKey: UserFormField.email.name, header: UserFormField.email.label }),
    createColumn<UserViewModel>({ accessorKey: UserFormField.title.name, header: UserFormField.title.label }),
    createColumn<UserViewModel>({ accessorKey: UserFormField.phoneNo.name, header: UserFormField.phoneNo.label }),
    createColumn<UserViewModel>({ accessorKey: UserFormField.description.name, header: UserFormField.description.label }),
    createColumn<UserViewModel>({ accessorKey: UserFormField.address.name, header: UserFormField.address.label }),
    createColumn<UserViewModel>({ accessorKey: UserFormField.gender.name, header: UserFormField.gender.label }),
    createColumn<UserViewModel>({ accessorKey: UserFormField.role.name, header: UserFormField.role.label }),
    createColumn<UserViewModel>({ accessorKey: CommonDataTableField.createdByName.name, header: CommonDataTableField.createdByName.label }),
    createColumn<UserViewModel>({ accessorKey: CommonDataTableField.createdAtFormat.name, header: CommonDataTableField.createdAtFormat.label }),
    createColumn<UserViewModel>({ accessorKey: CommonDataTableField.updatedByName.name, header: CommonDataTableField.updatedByName.label }),
    createColumn<UserViewModel>({ accessorKey: CommonDataTableField.updatedAtFormat.name, header: CommonDataTableField.updatedAtFormat.label }),
];
