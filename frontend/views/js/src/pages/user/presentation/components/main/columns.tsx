import type { ColumnDef } from "@tanstack/react-table";
import User from "@/pages/user/domain/entity/UserEntity";
import { createColumn } from "@/core/presentation/table/ColumnConfig";
import {} from "@/pages/presentation/form/UserFormField";


export const columns: ColumnDef<User>[] = [
    createColumn<User>({ accessorKey: UserForm.getName(), header: "Name" }),
    createColumn<User>({ accessorKey: UserForm.getFullName(), header: "Full Name" }),
    createColumn<User>({ accessorKey: UserForm.getEmail(), header: "Email" }),
    createColumn<User>({ accessorKey: UserForm.getDescription(), header: "Description" }),
    createColumn<User>({ accessorKey: UserForm.getAddress(), header: "Address" }),
    createColumn<User>({ accessorKey: UserForm.getGender(), header: "Gender" }),
];
