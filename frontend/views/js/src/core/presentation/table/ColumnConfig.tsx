import React from 'react';
import { Button } from "@/components/ui/button";
import type { ColumnDef, CellContext } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

type ColumnConfig<TData> = {
    accessorKey: keyof TData,
    header?: string | null;
    enableSorting?: boolean;
    size?: number;
    minSize?: number;
    maxSize?: number;
    cell?: (props: CellContext<TData, unknown>) => React.ReactNode;
    isHidden?: boolean;
}


const createColumn = <TData,> ({
    accessorKey,
    header,
    size,
    minSize,
    maxSize,
    enableSorting = true,
    cell,
    isHidden = false
}: ColumnConfig<TData>): ColumnDef<TData> => {
    const columnDef: ColumnDef<TData> = {
        accessorKey: accessorKey as string,
        filterFn: "includesString",
        enableResizing: true,
        enableSorting: enableSorting,
        meta: { label: header },
        size,
        minSize,
        maxSize,
        enableHiding: true,
        header: header === null ? () => null
            : ({ column }) => {
                const isSorted = column.getIsSorted();
                return (
                    <Button
                        className="w-full text-left rounded-none justify-between"
                        variant={"ghost"}
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {header ?? String(accessorKey)}
                        {isSorted === "asc" && <ArrowUp className="h-4 w-4 bg-secondary dark:bg-secondary" />}
                        {isSorted === "desc" && <ArrowDown className="h-4 w-4 bg-secondary dark:bg-secondary" />}
                    </Button>
                );
            },
    };

    if (cell) columnDef.cell = cell;
    if (isHidden) (columnDef as any).meta = { ...columnDef.meta, hidden: true };


    return columnDef;
};

export { createColumn };
