import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
    type ColumnDef,
    getCoreRowModel,
    getFilteredRowModel, getSortedRowModel,
    type Row,
    useReactTable
} from "@tanstack/react-table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import DataTable from "@/components/app/data-table.tsx";


type DropdownTableProps<TData> = {
    columns: ColumnDef<TData>[];
    data: TData[];
    isLoading: boolean;
    onSelect: (row: TData) => void;
    label: string;
    value?: string;
    onChange?: (value: TData) => void;
    // onRefresh: () => void;
}


export function DropdownTable<TData>({
    columns,
    data,
    isLoading,
    onSelect,
    label,
    value,
    onChange
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


    const handleRowSelect = (row: Row<TData>) => {
        onChange?.(row?.original);
        onSelect?.(row.original);
        setOpen(false);
    }


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                >
                    {value ? value : label}
                    <FaMagnifyingGlass/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[600px] p-2">
                <DataTable
                    variant="dropdown"
                    table={table}
                    isLoading={isLoading}
                    onSelectRow={handleRowSelect}
                />
            </PopoverContent>
        </Popover>
    );
}
