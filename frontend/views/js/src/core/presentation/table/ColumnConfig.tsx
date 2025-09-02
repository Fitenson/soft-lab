import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";


type ColumnConfig<TData> = {
    accessorKey: keyof TData,
    header?: string;
}


const createColumn = <TData,> ({
    accessorKey,
    header,
}: ColumnConfig<TData>): ColumnDef<TData> => ({
    accessorKey: accessorKey as string,
    filterFn: "includesString",
    enableResizing: true,
    meta: { label: header },
    header: ({ column }) => {
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
    }
});


export { createColumn };
