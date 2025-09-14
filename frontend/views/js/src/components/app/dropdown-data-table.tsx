import DataTable from "@/components/app/data-table.tsx";
import {type ColumnDef, getCoreRowModel, type Row, useReactTable} from "@tanstack/react-table";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";

type DropdownDataTableProps<T> = {
    columns: ColumnDef<T, unknown>[],
    data: T[],
    // onRefresh: () => void,
    label?: string,
    onSelect: (row: Row<T>) => void,
    isLoading: boolean,
};


export  default function DropdownDataTable<T>({
    columns,
    data,
    // onRefresh,
    label = "Select",
    isLoading,
    onSelect,
}: DropdownDataTableProps<T>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="outline">{label}</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DataTable<T>
                    table={table}
                    isLoading={isLoading}
                    onSelectRow={onSelect}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
