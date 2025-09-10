import type { ColumnDef } from "@tanstack/react-table";
import { createColumn } from "@/core/presentation/table/ColumnConfig";
import UserFormField from "@/pages/user/presentation/form/UserFormField.ts";
import type UserViewModel from "@/pages/user/presentation/view_models/UserViewModel.ts";


export const columns: ColumnDef<UserViewModel>[] = [
    createColumn<UserViewModel>({ accessorKey: UserFormField.fullName.name, header: UserFormField.fullName.label }),
    createColumn<UserViewModel>({ accessorKey: UserFormField.username.name, header: UserFormField.username.label }),
    createColumn<UserViewModel>({ accessorKey: UserFormField.email.name, header: UserFormField.email.label }),
    createColumn<UserViewModel>({ accessorKey: UserFormField.description.name, header: UserFormField.description.label }),
    createColumn<UserViewModel>({ accessorKey: UserFormField.address.name, header: UserFormField.address.label }),
    createColumn<UserViewModel>({ accessorKey: UserFormField.gender.name, header: UserFormField.gender.label }),
];
