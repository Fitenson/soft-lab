import DataTable from "@/components/app/data-table.tsx";
import {
    type ColumnDef,
    getCoreRowModel,
    getFilteredRowModel, getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import React from "react";


type DropdownTableProps<TData> = {
    columns: ColumnDef<TData>[];
    data: TData[];
    isLoading: boolean;
    onSelect: () => void;
    // onRefresh: () => void;
}


export function DropdownTable<TData>({
    columns,
    data,
    isLoading,
    onSelect,
    // onRefresh,
}: DropdownTableProps<TData>) {
    const [open, setOpen] = React.useState(false);

    const table = useReactTable({
        data,
        columns,
        columnResizeMode: "onChange",
        enableRowSelection: true,
        enableColumnFilters: true,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                >
                    Dropdown
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[600px] p-2">
                <DataTable
                    table={table}
                    isLoading={isLoading}
                    onSelectRow={onSelect}
                />
            </PopoverContent>
        </Popover>
    );
}
