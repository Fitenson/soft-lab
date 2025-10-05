import {
    flexRender,
    getCoreRowModel,
    type Table as TableType,
    useReactTable
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import type ApiTestDataViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestDataViewModel.ts";
import { apiTestDataColumns } from "@/pages/backend/api_test/presentation/components/data_table/apiTestDataColumns.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useAppSelector } from "@/core/presentation/store/useAppSelector.ts";
import { selectLoading } from "@/core/presentation/store/loadingSlice.ts";
import { Input } from "@/components/ui/input.tsx";
import ApiTestDataFormField from "@/pages/backend/api_test/presentation/form/ApiTestDataFormField.ts";
import { Checkbox } from "@/components/ui/checkbox";
import {FormControl, FormField, FormItem} from "@/components/ui/form.tsx";
import useApiTestDataForm from "@/pages/backend/api_test/presentation/hooks/useApiTestDataForm.ts";
import {useFieldArray} from "react-hook-form";
import {useEffect, useRef} from "react";

const dataKeys = ["key", "value", "description"] as const;
type DataRowKey = typeof dataKeys[number];
const isDataRowKey = (k: string): k is DataRowKey =>
    (dataKeys as readonly string[]).includes(k);
type RowPath = `data.${number}.${DataRowKey}`;

interface ApiTestDataProps<TData extends ApiTestDataViewModel> {
    data: TData[];
}


export default function ApiTestDataTable<TData extends ApiTestDataViewModel>({
    data
}: ApiTestDataProps<TData>) {
    const { form, apiTestDataViewModels } = useApiTestDataForm({ apiTestDataDTOs: data });
    const { fields, append } = useFieldArray({
        control: form.control,
        name: "data",
    });


    const table: TableType<ApiTestDataViewModel> = useReactTable({
        data: apiTestDataViewModels,
        columns: apiTestDataColumns,
        enableRowSelection: true,
        enableSorting: false,
        enableFilters: false,
        enableSortingRemoval: false,
        getCoreRowModel: getCoreRowModel(),
    });

    const isLoading = useAppSelector(selectLoading);

    const lastAppendFromIndexRef = useRef<number | null>(null);
    const addEmptyRow = (fromIndex?: number) => {
        if (typeof fromIndex === "number") {
            if (lastAppendFromIndexRef.current === fromIndex) return; // already appended for this row
            lastAppendFromIndexRef.current = fromIndex;
        }
        append({ enabled: 0, key: "", value: "", description: "" }, { shouldFocus: false });
    };

    const handleEnabledToggle = (rowIndex: number, next: number) => {
        form.setValue(`data.${rowIndex}.enabled`, next);
        if (rowIndex === fields.length - 1 && next === 1) {
            addEmptyRow(rowIndex);
        }
    };

    const handleInputFocus = (rowIndex: number) => {
        if (rowIndex === fields.length - 1) {
            addEmptyRow(rowIndex);
        }
    };

    useEffect(() => {
        if (fields.length === 0) {
            append({ enabled: 0, key: "", value: "", description: "" }, { shouldFocus: false });
            lastAppendFromIndexRef.current = null;
        }
    }, [fields.length, append]);


    return (
        <Table className="card">
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
                ) : !isLoading ? (
                    fields.map((_row, rowIndex) => (
                        <TableRow key={`input-row-${rowIndex}`}>
                            {table.getAllLeafColumns().map((column) => (
                                <TableCell key={column.id} className="p-2">
                                    {column.id === ApiTestDataFormField.enabled.name ? (
                                        <FormField
                                            control={form.control}
                                            name={`data.${rowIndex}.enabled` as `data.${number}.enabled`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div onClick={(e) => e.stopPropagation()} className="flex items-center">
                                                            <Checkbox
                                                                checked={field.value === 1}
                                                                onCheckedChange={(v) => {
                                                                    const next = v === true ? 1 : 0;
                                                                    field.onChange(next);
                                                                    handleEnabledToggle(rowIndex, next);
                                                                }}
                                                                aria-label="Toggle"
                                                                className="cursor-pointer h-6 w-6 shrink-0 translate-y-[1px]"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    ) : (
                                        isDataRowKey(column.id) && (
                                            <FormField
                                                control={form.control}
                                                name={`data.${rowIndex}.${column.id}` as RowPath}
                                                render={({ field: { value, onChange, ...rest } }) => (
                                                    <FormControl>
                                                        <Input
                                                            {...rest}
                                                            value={value ?? ""}
                                                            onChange={(e) => onChange(e.target.value)}
                                                            onFocus={() => handleInputFocus(rowIndex)}
                                                            className="w-full h-8"
                                                        />
                                                    </FormControl>
                                                )}
                                            />
                                        )
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
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