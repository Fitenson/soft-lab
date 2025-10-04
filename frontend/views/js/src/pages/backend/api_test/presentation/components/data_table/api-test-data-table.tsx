import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel, getSortedRowModel,
    type Table as TableType,
    useReactTable
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

import type ApiTestDataViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestDataViewModel.ts";
import { apiTestDataColumns } from "@/pages/backend/api_test/presentation/components/data_table/apiTestDataColumns.ts";
import {Input} from "@/components/ui/input.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useAppSelector} from "@/core/presentation/store/useAppSelector.ts";
import {selectLoading} from "@/core/presentation/store/loadingSlice.ts";


interface ApiTestDataProps<TData extends ApiTestDataViewModel> {
    data: TData[];

}

export default function ApiTestDataTable<TData extends ApiTestDataViewModel>({
    data
}: ApiTestDataProps<TData>) {
    const table: TableType<ApiTestDataViewModel> = useReactTable({
        data,
        columns: apiTestDataColumns,
        enableRowSelection: true,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const isLoading = useAppSelector(selectLoading);


    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="border-b border-accent dark:border-accent">
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead
                                    className="m-0 p-0 border-r border-accent dark:border-accent last:border-r-0"
                                    key={header.id}
                                    style={{  width: header.getSize() }}
                                >
                                    {header.isPlaceholder ? null :
                                        flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    {header.column.getCanFilter() && (
                                        <Input
                                            // placeholder={header?.column?.columnDef?.meta?.label}
                                            value={(header.column.getFilterValue() ?? "") as string}
                                            onChange={(e) => header.column.setFilterValue(e.target.value)}
                                            className="w-full mt-1 h-8 "
                                        />
                                    )}

                                    {header.column.getCanResize() && (
                                        <div
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                            className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none
                                            ${header.column.getIsResizing() ? "bg-blue-500" : "bg-transparent hover:bg-gray-400"}`}
                                        />
                                    )}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) =>  (
                        <TableRow
                            key={row.id}
                            className={`cursor-pointer p-2 border border-accent dark:border-accent ${
                                row.getIsSelected()
                                    ? "text-foreground dark:text-foreground"
                                    : "text-foreground dark:text-foreground"
                            }`}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    key={cell.id}
                                    className="p-2.5 border-2 border-accent dark:border-accent"
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : !isLoading ? ((
                    <TableRow>
                        <TableCell colSpan={table.getAllLeafColumns().length} className="h-24 text-center">
                            <h3>No results</h3>
                        </TableCell>
                    </TableRow>
                )) : (
                    Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={`skeleton-${i}`}>
                            {table.getAllLeafColumns().map((column) => (
                                <td key={column.id} className="px-2 py-2">
                                    <Skeleton className="h-4 w-full rounded-2xl p-4 m-1 gap-2" />
                                </td>
                            ))}
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
